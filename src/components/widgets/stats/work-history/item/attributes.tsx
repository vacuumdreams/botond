import { formatDistance } from "date-fns";
import {
  ClockIcon,
  ExternalLinkIcon,
  TimerIcon,
  MapPinIcon,
  ActivityIcon,
  FactoryIcon,
  AwardIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { cn, getDate } from "@/lib/utils";

type AttributesProps = {
  url?: string | null;
  level?: string;
  time?: string;
  location?: string;
  industry?: string;
  phase?: string;
  start: string;
  end: string | null;
  mode?: "print" | "normal";
};

export const Attributes = ({
  url,
  level,
  time,
  location,
  industry,
  phase,
  start,
  end,
  mode,
}: AttributesProps) => {
  const badgeClass = cn("whitespace-nowrap", {
    "text-foreground dark:text-background bg-slate-200 hover:bg-slate-200 dark:bg-white hover:dark:bg-white":
      mode !== "print",
    "bg-slate-200 text-black": mode === "print",
  });

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
          <Badge className={badgeClass}>
            <MapPinIcon className="mr-2 h-6 w-6" />
            {location}
          </Badge>
        )}
        {level && (
          <Badge className={badgeClass}>
            <AwardIcon className="mr-2 h-6 w-6" />
            {level}
          </Badge>
        )}
        {time && (
          <Badge className={badgeClass}>
            <TimerIcon className="mr-2 h-6 w-6" />
            {time}
          </Badge>
        )}
        {phase && (
          <Badge className={badgeClass}>
            <ActivityIcon className="mr-2 h-6 w-6" />
            {phase}
          </Badge>
        )}
        {industry && (
          <Badge className={badgeClass}>
            <FactoryIcon className="mr-2 h-6 w-6" />
            {industry}
          </Badge>
        )}
      </div>
    </div>
  );
};
