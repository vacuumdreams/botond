import { useState, useMemo } from "react";

import { useData } from "@/components/provider/data";
import { Accordion } from "@/components/ui/accordion";
import { WorkItem } from "@/lib/data";
import { PermanentItem, FreelanceItem } from "./item";
import { Filters, FilterType, filterFunctions } from "./filters";

const doFilter = (filters: FilterType) => (w: WorkItem) => {
  return Object.values(filterFunctions).reduce((acc, fn) => {
    return acc && fn(filters, w);
  }, true);
};

export const WorkHistory = () => {
  const { data } = useData();
  const [filters, setFilters] = useState<FilterType>({
    employment: "freelance",
    minDuration: "all",
    stack: [],
  });

  const list = useMemo(() => {
    return Object.values(data.work.history).filter(doFilter(filters));
  }, [data, filters]);

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <Accordion type="single" collapsible className="w-full">
        {list.map((w) => {
          if (w.employment === "freelance") {
            return (
              <FreelanceItem
                key={w.id}
                work={w}
                tech={data.skills.tech}
                flattenClients={filters.employment === "freelance"}
              />
            );
          }
          return (
            <PermanentItem key={w.name} work={w} tech={data.skills.tech} />
          );
        })}
      </Accordion>
    </div>
  );
};