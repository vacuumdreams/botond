import { z } from "zod";
import { ReactNode, useMemo } from "react";
import { uniq } from "ramda";
import Markdown from "react-markdown";
import { Layers3Icon, BriefcaseIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ProcessedData,
  TechItem,
  freelanceSchema,
  permanentSchema,
} from "@/lib/data";
import { Attributes } from "./attributes";
import { Stack } from "./stack";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type BaseWorkItemProps = {
  mode?: "normal" | "print";
  id: string;
  url?: string | null;
  name: string;
  icon?: string;
  start: string;
  end: string | null;
  stack: TechItem[];
  children: ReactNode;
};

function BaseWorkItem({
  mode,
  id,
  url,
  name,
  icon,
  start,
  end,
  stack,
  children,
}: BaseWorkItemProps) {
  if (mode === "print") {
    return (
      <div>
        <div className="flex w-full items-center justify-between pr-4">
          <h4>
            <a className="flex items-center gap-2" href={url || undefined}>
              <Avatar className="flex items-center justify-center border-2">
                {!icon && <BriefcaseIcon />}
                {icon && (
                  <>
                    <AvatarImage src={icon || ""} alt={name} />
                    <AvatarFallback>
                      {name
                        .split(" ")
                        .map((name) => name[0].toUpperCase())
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <span className="text-base">{name}</span>
            </a>
          </h4>
          <div
            className={cn("text-muted-foreground", {
              "hidden md:block": mode !== "print",
            })}
          >
            {start}-{end || "Present"}
          </div>
        </div>
        {children}
        <Separator className="my-8 -ml-4 w-[calc(100%+2rem)]" />
      </div>
    );
  }

  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="p-4">
        <div className="flex w-full items-center justify-between pr-4">
          <h4 className="flex items-center gap-2">
            <Avatar className="flex items-center justify-center border-2">
              {!icon && (
                <div className="flex h-full w-full items-center justify-center border-2">
                  <BriefcaseIcon />
                </div>
              )}
              {icon && (
                <>
                  <AvatarImage src={icon || ""} alt={name} />
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((name) => name[0].toUpperCase())
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <span>{name}</span>
          </h4>
          <div className="text-muted-foreground hidden md:block">
            {start}-{end || "Present"}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        {children}
        <div className="flex items-center gap-2">
          <Layers3Icon />
          <p>Stack: </p>
          <Stack stack={stack} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export const FreelanceItem = ({
  work,
  tech,
  flattenClients,
  mode,
}: {
  work: z.infer<typeof freelanceSchema>;
  tech: ProcessedData["data"]["skills"]["tech"];
  flattenClients: boolean;
  mode?: "normal" | "print";
}) => {
  const allClientStack = useMemo(() => {
    return uniq(
      Object.values(work.clients)
        .map((c) => c.stack)
        .flat(),
    );
  }, [work]);
  const allClientLevels = useMemo(() => {
    return uniq(
      Object.values(work.clients)
        .map((c) => c.level)
        .flat(),
    );
  }, [work]);
  const allClientIndustries = useMemo(() => {
    return uniq(
      Object.values(work.clients)
        .map((c) => c.industry)
        .flat(),
    );
  }, [work]);
  const allClientPhases = useMemo(() => {
    return uniq(
      Object.values(work.clients)
        .map((c) => c.phase)
        .flat(),
    );
  }, [work]);

  if (flattenClients && mode !== "print") {
    return (
      <>
        {Object.values(work.clients).map((c) => (
          <BaseWorkItem
            key={c.id}
            id={c.id}
            name={c.name}
            icon={c.icon}
            start={c.start}
            end={c.end}
            stack={c.stack.filter((t) => !!tech[t]).map((t) => tech[t])}
          >
            <Attributes
              url={c.url}
              level={c.level}
              time={c.time}
              location={c.location}
              industry={c.industry}
              phase={c.phase}
              start={c.start}
              end={c.end}
              mode={mode}
            />
            <div className="prose prose-slate dark:prose-invert my-6 w-full">
              <Markdown>{c.description}</Markdown>
            </div>
          </BaseWorkItem>
        ))}
      </>
    );
  }

  return (
    <BaseWorkItem
      mode={mode}
      id={work.id}
      name={work.name}
      start={work.start}
      end={work.end}
      stack={allClientStack.filter((t) => !!tech[t]).map((t) => tech[t])}
    >
      <Attributes
        level={allClientLevels.join(", ")}
        industry={allClientIndustries.join(", ")}
        phase={allClientPhases.join(", ")}
        start={work.start}
        end={work.end}
        mode={mode}
      />
      <div
        className={cn("prose prose-slate my-6 w-full", {
          "text-xs print:text-black": mode === "print",
          "dark:prose-invert": mode !== "print",
        })}
      >
        <Markdown>{work.description}</Markdown>
      </div>
      <div
        className={cn("my-2 mb-8", {
          "flex items-center gap-4": mode !== "print",
        })}
      >
        <p className={cn({ "mb-4": mode === "print" })}>Clients: </p>
        <div className="flex flex-wrap gap-2">
          {Object.values(work.clients).map((c, i) => (
            <Badge
              key={c.id}
              className={cn(" print:bg-slate-200", {
                "text-foreground dark:text-background bg-slate-200 hover:bg-slate-200 dark:bg-white hover:dark:bg-white":
                  mode !== "print",
                "bg-slate-200 text-xs text-black": mode === "print",
              })}
            >
              <a
                href={c.url || ""}
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center whitespace-nowrap"
              >
                <Avatar className="-ml-2 mr-2 h-6 w-6">
                  <AvatarImage src={c.icon || ""} alt={c.name} />
                  <AvatarFallback>{c.name[0]}</AvatarFallback>
                </Avatar>
                {c.name}
              </a>
            </Badge>
          ))}
        </div>
      </div>
    </BaseWorkItem>
  );
};

export const PermanentItem = ({
  work,
  tech,
  mode,
}: {
  work: z.infer<typeof permanentSchema>;
  tech: ProcessedData["data"]["skills"]["tech"];
  mode?: "normal" | "print";
}) => {
  return (
    <BaseWorkItem
      mode={mode}
      id={work.id}
      url={work.url}
      name={work.name}
      icon={work.icon}
      start={work.start}
      end={work.end}
      stack={work.stack.filter((t) => !!tech[t]).map((t) => tech[t])}
    >
      <Attributes
        url={mode === "print" ? null : work.url}
        level={work.level}
        time={work.time}
        location={work.location}
        industry={work.industry}
        phase={work.phase}
        start={work.start}
        end={work.end}
        mode={mode}
      />
      <div
        className={cn("prose prose-slate my-6 w-full", {
          "text-xs print:text-black": mode === "print",
          "dark:prose-invert": mode !== "print",
        })}
      >
        <Markdown>{work.description}</Markdown>
      </div>
    </BaseWorkItem>
  );
};
