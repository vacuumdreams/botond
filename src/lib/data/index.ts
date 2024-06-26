import { z } from "zod"
import { uniq } from "ramda"
import data from "@/data.json"
import {
  schema,
  Data,
  freelanceSchema,
  permanentSchema,
  projectSchema,
} from "./schema"
import {
  getStartDate,
  getEndDate,
  mergeOverlappingRanges,
  shuffle,
} from "@/lib/utils"

export { freelanceSchema, permanentSchema, schema } from "./schema"

const SIZES = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
]

function normaliseTags(data: Data) {
  return shuffle(
    uniq(
      Object.values(data.work.history).reduce<string[]>((acc, work) => {
        if (work.employment === "permanent") {
          return [...acc, ...(work.tags || [])]
        }

        const wTags = Object.values(work.clients).reduce<string[]>(
          (acc, client) => {
            return [...acc, ...(client.tags || [])]
          },
          [],
        )
        return [...acc, ...wTags]
      }, []),
    ),
  ).map((tag) => {
    const size =
      tag.length >= 20
        ? ["text-xs", "text-sm"][Math.floor(Math.random() * 2)]
        : SIZES[Math.floor(Math.random() * SIZES.length)]
    return { tag, size }
  })
}

export type ProcessedData = {
  data: Data & {
    skills: {
      tech: Record<
        keyof Data["skills"]["tech"],
        Data["skills"]["tech"][keyof Data["skills"]["tech"]] & {
          xp: number;
          lastUsed: Date;
        }
      >;
    };
  };
  normalisedTags: { tag: string; size: string }[];
  featuredProjects: Data["projects"];
  intro: Data["skills"]["tech"][keyof Data["skills"]["tech"]][];
};

export type TechItem = Data["skills"]["tech"][keyof Data["skills"]["tech"]] & {
  xp: number;
  lastUsed: Date;
};

export type WorkItem =
  ProcessedData["data"]["work"]["history"][keyof ProcessedData["data"]["work"]["history"]];

export type PermanentItem = z.infer<typeof permanentSchema>;
export type FreelanceItem = z.infer<typeof freelanceSchema>;
export type ProjectItem = z.infer<typeof projectSchema>;

function monthDiff(dateFrom: Date, dateTo: Date): number {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  )
}

function getXp(ranges: [Date, Date][]): number {
  const mergedRanges = mergeOverlappingRanges(ranges)
  let totalMonths = 0
  for (let range of mergedRanges) {
    totalMonths += monthDiff(range[0], range[1])
  }
  return totalMonths
}

const transformData = (raw: Data): ProcessedData => {
  const processedData: ProcessedData["data"] = JSON.parse(JSON.stringify(raw))
  const xp: Record<string, Array<[Date, Date]>> = {}

  Object.values(raw.work.history).forEach((entry) => {
    if (entry.employment === "permanent") {
      entry.stack.forEach((stack) => {
        if (processedData.skills.tech[stack]) {
          const rangeItem: [Date, Date] = [
            getStartDate(entry.start),
            getEndDate(entry.end),
          ]
          if (!xp[stack]) {
            xp[stack] = []
          }
          xp[stack].push(rangeItem)
        }
      })
    }
    if (entry.employment === "freelance") {
      Object.values(entry.clients).forEach((client) => {
        client.stack.forEach((stack) => {
          if (processedData.skills.tech[stack]) {
            const rangeItem: [Date, Date] = [
              getStartDate(client.start),
              getEndDate(client.end),
            ]
            if (!xp[stack]) {
              xp[stack] = []
            }
            xp[stack].push(rangeItem)
          }
        })
      })
    }
  })

  Object.values(raw.projects).forEach((project) => {
    project.stack?.forEach((stack) => {
      if (processedData.skills.tech[stack]) {
        const rangeItem: [Date, Date] = [
          getStartDate(project.start),
          getEndDate(project.end),
        ]
        if (!xp[stack]) {
          xp[stack] = []
        }
        xp[stack].push(rangeItem)
      }
    })
  })

  Object.keys(processedData.skills.tech).forEach((stack) => {
    if (xp[stack]) {
      processedData.skills.tech[stack].xp = getXp(xp[stack])
    }
  })

  const workHistory = Object.values(processedData.work.history).reduce((acc, entry) => {
    if (entry.employment === "permanent" && entry.hidden !== true) {
      return { ...acc, [entry.id]: entry }
    }
    if (entry.employment === "freelance" && entry.hidden !== true) {
      return {
        ...acc,
        [entry.id]: {
          ...entry,
          clients: Object.values(entry.clients).reduce((acc, client) => {
            if (client.hidden !== true) {
              return { ...acc, [client.id]: client }
            }
            return acc
          }, {}),
        },
      }
    }
    return acc
  }, {})

  processedData.work.history = workHistory

  const projects = Object.keys(processedData.projects).reduce<Data['projects']>((acc, id) => {
    const project = processedData.projects[id]
    if (project.featured) {
      return { ...acc, [id]: project }
    }
    return acc
  }, {})

  const workProjects = Object.values(processedData.work.history).reduce<Data['projects']>((acc, entry) => {
    if (entry.employment === "permanent" && entry.projects) {
      Object.keys(entry.projects).forEach((id) => {
        const project = entry.projects?.[id]
        if (project?.featured) {
          acc[id] = project
          if (!project.stack) {
            acc[id].stack = entry.stack
          }
        }
      })
    }

    if (entry.employment === "freelance") {
      Object.values(entry.clients).forEach((client) => {
        if (client.projects) {
          Object.keys(client.projects).forEach((id) => {
            const project = client.projects?.[id]
            if (project?.featured) {
              acc[id] = project
              if (!project.stack) {
                acc[id].stack = client.stack
              }
            }
          })
        }
      }, acc)
    }

    return acc
  }, {})

  return {
    data: processedData,
    normalisedTags: normaliseTags(raw),
    featuredProjects: {
      ...projects,
      ...workProjects,
    },
    // @ts-ignore
    intro: shuffle(Object.values(data.skills.tech).filter((t) => t.featured)),
  }
}

export const getData = (async () => {
  const raw = schema.parse(data)
  return transformData(raw)
}) satisfies () => Promise<ProcessedData>
