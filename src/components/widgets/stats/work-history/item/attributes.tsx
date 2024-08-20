import { formatDistance } from "date-fns"
import {
  ActivityIcon,
  AwardIcon,
  ClockIcon,
  ExternalLinkIcon,
  FactoryIcon,
  MapPinIcon,
  TimerIcon,
} from "lucide-react"

import { cn, getDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type AttributesProps = {
  url?: string | null
  level?: string
  time?: string
  location?: string
  industry?: string
  phase?: string
  start: string
  end: string | null
  mode?: "print" | "normal"
}

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
  const badgeClass = cn("whitespace-nowrap")

  return (
    <div>
      <div className="mb-6 flex w-full items-center justify-between gap-2">
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
          <Badge variant={"secondary"} className={badgeClass}>
            <MapPinIcon className="mr-2 size-6" />
            {location}
          </Badge>
        )}
        {level && (
          <Badge variant={"secondary"} className={badgeClass}>
            <AwardIcon className="mr-2 size-6" />
            {level}
          </Badge>
        )}
        {time && (
          <Badge variant={"secondary"} className={badgeClass}>
            <TimerIcon className="mr-2 size-6" />
            {time}
          </Badge>
        )}
        {mode !== "print" && phase && (
          <Badge variant={"secondary"} className={badgeClass}>
            <ActivityIcon className="mr-2 size-6" />
            {phase}
          </Badge>
        )}
        {mode !== "print" && industry && (
          <Badge variant={"secondary"} className={badgeClass}>
            <FactoryIcon className="mr-2 size-6" />
            {industry}
          </Badge>
        )}
      </div>
    </div>
  )
}
