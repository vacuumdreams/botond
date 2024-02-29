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
import { WorkItem, TechItem } from "@/lib/data";
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
  (f: FilterType, w: WorkItem) => boolean
> = {
  employment: (filters, w) => {
    if (filters.employment !== "all" && w.employment !== filters.employment) {
      return false;
    }
    return true;
  },
  minDuration: (filters, w) => {
    if (
      filters.minDuration === "6m" &&
      differenceInMonths(getDate(w.start), getDate(w.end)) < 6
    ) {
      return false;
    }
    if (
      filters.minDuration === "1y" &&
      differenceInMonths(getDate(w.start), getDate(w.end)) < 12
    ) {
      return false;
    }
    return true;
  },
  stack: (filters, w) => {
    const stack = getStack(w);
    return filters.stack.reduce((acc, s) => {
      return acc && stack.includes(s);
    }, true);
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
    <div className="flex gap-2 border-b border-slate-800 px-4 py-4">
      <div className="w-40">
        <p className="mb-1 text-xs text-slate-400">Employment</p>
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
        <p className="mb-1 text-xs text-slate-400">Duration</p>
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
      <div className="min-w-36">
        <p className="mb-1 text-xs text-slate-400">Stack</p>
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
