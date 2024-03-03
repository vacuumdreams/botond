import { Dispatch, SetStateAction, useMemo } from "react";
import { differenceInMonths } from "date-fns";
import { capitalCase } from "change-case";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useData } from "@/components/provider/data";
import { WorkItem, FreelanceItem } from "@/lib/data";
import { getDate } from "@/lib/utils";

export type FilterType = {
  employment: "all" | "freelance" | "permanent";
  minDuration: "all" | "6m" | "1y";
  stack: string[];
};

const getStack = (w: WorkItem) => {
  if (w.employment === "permanent") {
    return w.stack;
  }
  return Object.values(w.clients).reduce<string[]>((acc, c) => {
    return acc.concat(c.stack);
  }, []);
};

export const filterFunctions: Record<
  keyof FilterType,
  (f: FilterType, w: WorkItem) => WorkItem | null
> = {
  employment: (filters, w) => {
    if (filters.employment !== "all" && w.employment !== filters.employment) {
      return null;
    }
    return w;
  },
  minDuration: (filters, w) => {
    if (filters.minDuration === "all") {
      return w;
    }
    if (filters.employment === "freelance" && w.employment === "freelance") {
      const clients = Object.keys(w.clients).reduce<
        Record<string, FreelanceItem["clients"][keyof FreelanceItem["clients"]]>
      >((acc, key) => {
        const c = w.clients[key];
        const diff = differenceInMonths(getDate(c.end), getDate(c.start));
        if (
          filters.minDuration === "all" ||
          (filters.minDuration === "6m" && diff >= 6) ||
          (filters.minDuration === "1y" && diff >= 12)
        ) {
          acc[key] = c;
        }
        return acc;
      }, {});

      return { ...w, clients };
    }

    if (
      filters.minDuration === "6m" &&
      differenceInMonths(getDate(w.end), getDate(w.start)) >= 6
    ) {
      return w;
    }
    if (
      filters.minDuration === "1y" &&
      differenceInMonths(getDate(w.end), getDate(w.start)) >= 12
    ) {
      return w;
    }
    return null;
  },
  stack: (filters, w) => {
    if (filters.stack.length === 0) {
      return w;
    }
    if (w.employment === "freelance") {
      const clients = Object.keys(w.clients).reduce<
        Record<string, FreelanceItem["clients"][keyof FreelanceItem["clients"]]>
      >((acc, key) => {
        const c = w.clients[key];
        const qualifies = filters.stack.reduce((a, s) => {
          return a && c.stack.includes(s);
        }, true);
        if (qualifies) {
          acc[key] = c;
        }
        return acc;
      }, {});
      return { ...w, clients };
    }
    const stack = getStack(w);
    const qualifies = filters.stack.reduce((a, s) => {
      return a && stack.includes(s);
    }, true);
    if (qualifies) {
      return w;
    }
    return null;
  },
};

type FiltersProps = {
  filters: FilterType;
  setFilters: Dispatch<SetStateAction<FilterType>>;
};

export const Filters = ({ filters, setFilters }: FiltersProps) => {
  const { data } = useData();
  const stackOptions = useMemo(() => {
    return Object.values(data.skills.tech).reduce<
      {
        value: string;
        label: string;
      }[]
    >((acc, t) => {
      if (t.featured) {
        acc.push({
          value: t.name,
          label: t.name,
        });
      }
      return acc;
    }, []);
  }, [data]);

  return (
    <div className="flex flex-wrap gap-2 border-b px-4 py-4 print:hidden">
      <div className="w-40">
        <p className="text-muted-foreground mb-1 text-xs">Employment</p>
        <Select
          value={filters.employment}
          onValueChange={(value) =>
            setFilters((f) => ({
              ...f,
              employment: value as typeof filters.employment,
            }))
          }
        >
          <SelectTrigger value={filters.employment || undefined}>
            <SelectValue
              placeholder={
                filters.employment
                  ? capitalCase(filters.employment)
                  : "Employment type"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="block" value={"all"}>
              All
            </SelectItem>
            <SelectItem className="block" value="freelance">
              Freelance
            </SelectItem>
            <SelectItem className="block" value="permanent">
              Permanent
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Duration</p>
        <Select
          value={filters.minDuration}
          onValueChange={(value) =>
            setFilters((f) => ({
              ...f,
              minDuration: value as typeof filters.minDuration,
            }))
          }
        >
          <SelectTrigger value={filters.minDuration || undefined}>
            <SelectValue
              placeholder={
                filters.minDuration
                  ? capitalCase(filters.minDuration)
                  : "Minimum duration"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="block" value={"all"}>
              All
            </SelectItem>
            <SelectItem className="block" value="6m">
              {">"} 6 months
            </SelectItem>
            <SelectItem value="1y" className="block">
              {">"} 1 year
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-auto md:min-w-36">
        <p className="text-muted-foreground mb-1 text-xs">Stack</p>
        <MultiSelect
          placeholder="All"
          selected={filters.stack}
          options={stackOptions}
          onChange={(v) => {
            // @ts-ignore
            setFilters((f) => ({
              ...f,
              stack: v,
            }));
          }}
        />
      </div>
    </div>
  );
};
