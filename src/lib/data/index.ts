import { produce } from "immer";
import { differenceInMonths } from "date-fns";
import data from "@/data.json";
import { schema, Data } from "./schema";

export type ProcessedData = Data & {
  skills: {
    tech: Record<
      keyof Data["skills"]["tech"],
      Data["skills"]["tech"][keyof Data["skills"]["tech"]] & {
        xp: number;
      }
    >;
  };
};

const countMonths = (start: string, maybeEnd: string | null) => {
  const startDate = new Date(`01/${start}`);
  const endDate = maybeEnd ? new Date(`01/${maybeEnd}`) : new Date();

  return differenceInMonths(endDate, startDate);
};

const transformData = (raw: Data): ProcessedData => {
  const processedData: ProcessedData = JSON.parse(JSON.stringify(raw));

  Object.values(raw.work.history).forEach((entry) => {
    if (entry.employment === "permanent") {
      entry.stack.forEach((stack) => {
        if (processedData.skills.tech[stack]) {
          processedData.skills.tech[stack].xp =
            (processedData.skills.tech[stack].xp || 0) +
            countMonths(entry.start, entry.end);
        }
      });
    }
    if (entry.employment === "freelance") {
      Object.values(entry.clients).forEach((client) => {
        client.stack.forEach((stack) => {
          if (processedData.skills.tech[stack]) {
            processedData.skills.tech[stack].xp =
              (processedData.skills.tech[stack].xp || 0) +
              countMonths(client.start, client.end);
          }
        });
      });
    }
  });

  return processedData;
};

export const getData = (async () => {
  const raw = schema.parse(data);
  return transformData(raw);
}) satisfies () => Promise<ProcessedData>;
