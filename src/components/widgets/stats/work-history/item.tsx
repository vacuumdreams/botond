import { z } from "zod";
import { useMemo } from "react";
import { splitAt, uniq } from "ramda";
import { formatDistance } from "date-fns";
import Markdown from "react-markdown";
import {
  ClockIcon,
  Layers3Icon,
  ExternalLinkIcon,
  BriefcaseIcon,
  TimerIcon,
  MapPinIcon,
  ActivityIcon,
  FactoryIcon,
  AwardIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProcessedData, freelanceSchema, permanentSchema } from "@/lib/data";
import { getDate, shuffle } from "@/lib/utils";

type AttributesProps = {
  url?: string | null;
  level?: string;
  time?: string;
  location?: string;
  industry?: string;
  phase?: string;
  start: string;
  end: string | null;
};

const Attributes = ({
  url,
  level,
  time,
  location,
  industry,
  phase,
  start,
  end,
}: AttributesProps) => {
  return (
    <div>
      <div className="mb-6 mt-2 flex w-full items-center justify-between gap-2">
        {url && (
          <a href={url} className="flex items-center gap-2">
            <ExternalLinkIcon />
            <span>Website</span>
          </a>
        )}
        {!url && <span />}
        <p className="flex items-center gap-2">
          <ClockIcon />
          <span>Duration: {formatDistance(getDate(start), getDate(end))}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {location && (
          <Badge className="whitespace-nowrap bg-white hover:bg-white">
            <MapPinIcon className="mr-2 h-6 w-6" />
            {location}
          </Badge>
        )}
        {level && (
          <Badge className="whitespace-nowrap bg-white hover:bg-white">
            <AwardIcon className="mr-2 h-6 w-6" />
            {level}
          </Badge>
        )}
        {time && (
          <Badge className="whitespace-nowrap bg-white hover:bg-white">
            <TimerIcon className="mr-2 h-6 w-6" />
            {time}
          </Badge>
        )}
        {phase && (
          <Badge className="whitespace-nowrap bg-white hover:bg-white">
            <ActivityIcon className="mr-2 h-6 w-6" />
            {phase}
          </Badge>
        )}
        {industry && (
          <Badge className="whitespace-nowrap bg-white hover:bg-white">
            <FactoryIcon className="mr-2 h-6 w-6" />
            {industry}
          </Badge>
        )}
      </div>
    </div>
  );
};

type StackProps = {
  stack: ProcessedData["data"]["skills"]["tech"][keyof ProcessedData["data"]["skills"]["tech"]][];
};

const Stack = ({ stack }: StackProps) => {
  const [display, rest] = splitAt(5, shuffle(stack));
  return (
    <>
      {display.map((t) => (
        <TooltipProvider key={t.name}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="h-8 w-8">
                <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black text-2xl uppercase text-white">
                  {t.icon && <i className={`devicon-${t.icon}-plain`} />}
                  {!t.icon && <AvatarFallback>{t.name[0]}</AvatarFallback>}
                </div>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      {rest.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarFallback>+{rest.length}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <div className="grid grid-cols-3 gap-2">
                {rest.map((t) => (
                  <Badge
                    key={t.name}
                    className="flex gap-2 bg-slate-800 text-white hover:bg-slate-800"
                  >
                    <Avatar className="-ml-2 h-8 w-8">
                      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black text-2xl uppercase text-white">
                        {t.icon && <i className={`devicon-${t.icon}-plain`} />}
                        {!t.icon && (
                          <AvatarFallback>{t.name[0]}</AvatarFallback>
                        )}
                      </div>
                    </Avatar>
                    <span>{t.name}</span>
                  </Badge>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export const FreelanceItem = ({
  work,
  tech,
  flattenClients,
}: {
  work: z.infer<typeof freelanceSchema>;
  tech: ProcessedData["data"]["skills"]["tech"];
  flattenClients: boolean;
}) => {
  const allClientStack = useMemo(() => {
    return uniq(
      Object.values(work.clients)
        .map((c) => c.stack)
        .flat(),
    );
  }, [work]);

  if (flattenClients) {
    return (
      <>
        {Object.values(work.clients).map((c) => (
          <AccordionItem key={c.id} value={c.name}>
            <AccordionTrigger className="p-4">
              <div className="flex w-full items-center justify-between pr-4">
                <h4 className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={c.icon || ""} alt={c.name} />
                    <AvatarFallback>
                      {work.name
                        .split(" ")
                        .map((name) => name[0].toUpperCase())
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{c.name}</span>
                </h4>
                <div className="text-slate-500">
                  {c.start}-{c.end || "Present"}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <Attributes
                url={c.url}
                level={c.level}
                time={c.time}
                location={c.location}
                industry={c.industry}
                phase={c.phase}
                start={c.start}
                end={c.end}
              />
              <div className="prose my-6 text-white">
                <Markdown>{c.description}</Markdown>
              </div>
              <div className="flex items-center gap-2">
                <Layers3Icon />
                <p>Stack: </p>
                <Stack
                  stack={c.stack.filter((t) => !!tech[t]).map((t) => tech[t])}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </>
    );
  }

  return (
    <AccordionItem key={work.id} value={work.id}>
      <AccordionTrigger className="p-4">
        <div className="flex w-full items-center justify-between pr-4">
          <h4 className="flex items-center gap-2">
            <Avatar className="flex items-center justify-center border-2 border-slate-400">
              <BriefcaseIcon />
            </Avatar>
            <span>{work.name}</span>
          </h4>
          <div className="text-slate-500">
            {work.start}-{work.end || "Present"}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="prose my-6 text-white">
          <Markdown>{work.description}</Markdown>
        </div>
        <div className="my-2 mb-8 flex items-center gap-4">
          <span>Clients: </span>
          <div className="flex gap-2">
            {Object.values(work.clients).map((c, i) => (
              <Badge key={c.id}>
                <a
                  href={c.url || ""}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center"
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
        <div className="flex items-center gap-2">
          <Layers3Icon />
          <p>Stack: </p>
          <Stack
            stack={allClientStack.filter((t) => !!tech[t]).map((t) => tech[t])}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export const PermanentItem = ({
  work,
  tech,
}: {
  work: z.infer<typeof permanentSchema>;
  tech: ProcessedData["data"]["skills"]["tech"];
}) => {
  return (
    <AccordionItem key={work.id} value={work.id}>
      <AccordionTrigger className="p-4">
        <div className="flex w-full items-center justify-between pr-4">
          <h4 className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={work.icon} alt={work.name} />
              <AvatarFallback>
                {work.name
                  .split(" ")
                  .map((name) => name[0].toUpperCase())
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span>{work.name}</span>
          </h4>
          <div className="text-slate-500">
            {work.start}-{work.end || "Present"}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <Attributes
          url={work.url}
          level={work.level}
          time={work.time}
          location={work.location}
          industry={work.industry}
          phase={work.phase}
          start={work.start}
          end={work.end}
        />
        <div className="prose my-6 text-white">
          <Markdown>{work.description}</Markdown>
        </div>
        <div className="flex items-center gap-2">
          <Layers3Icon />
          <p>Stack: </p>
          <Stack
            stack={work.stack.filter((t) => !!tech[t]).map((t) => tech[t])}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
