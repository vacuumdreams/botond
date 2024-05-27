import { useState, useMemo } from "react"

import { useData } from "@/components/provider/data"
import { Accordion } from "@/components/ui/accordion"
import { WorkItem } from "@/lib/data"
import { PermanentItem, FreelanceItem } from "./item"
import { Filters, FilterType, filterFunctions } from "./filters"

const doFilter = (filters: FilterType) => (items: WorkItem[], w: WorkItem) => {
  const workItem = Object.values(filterFunctions).reduce<WorkItem | null>(
    (acc, fn) => {
      return acc && fn(filters, acc)
    },
    w,
  )

  if (workItem !== null) {
    items.push(workItem)
  }
  return items
}

type WorkHistoryProps = {
  mode?: "normal" | "print";
};

export const WorkHistory = ({ mode }: WorkHistoryProps) => {
  const { data } = useData()
  const [filters, setFilters] = useState<FilterType>({
    employment: "all",
    minDuration: "all",
    stack: [],
  })

  const list = useMemo(() => {
    if (mode === "print") {
      return Object.values(data.work.history)
    }
    return Object.values(data.work.history).reduce<WorkItem[]>(
      doFilter(filters),
      [],
    )
  }, [mode, data, filters])

  if (mode === "print") {
    return (
      <div className="w-full">
        {list.map((w) => {
          if (w.employment === "freelance") {
            return (
              <FreelanceItem
                key={w.id}
                work={w}
                tech={data.skills.tech}
                flattenClients={filters.employment === "freelance"}
                mode={mode}
              />
            )
          }
          return (
            <PermanentItem
              key={w.name}
              work={w}
              tech={data.skills.tech}
              mode={mode}
            />
          )
        })}
      </div>
    )
  }

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
            )
          }
          return (
            <PermanentItem key={w.name} work={w} tech={data.skills.tech} />
          )
        })}
      </Accordion>
    </div>
  )
}
