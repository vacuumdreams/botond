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

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn, getDate } from "@/lib/utils"

type CropIndustryProps = {
  text: string
}

function CropIndustries({ text }: CropIndustryProps) {
  const list = text.split(', ')
  return (
    <div>
      {list.slice(0, 2).join(', ')}
      {list.length > 2 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="ml-2 size-8">
                <div className="flex size-full items-center justify-center overflow-hidden bg-black uppercase text-white">
                  {list.length - 3}+
                </div>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{list.slice(2).join(', ')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

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
            <CropIndustries text={industry} />
          </Badge>
        )}
      </div>
    </div>
  )
}
