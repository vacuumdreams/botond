import { splitAt } from "ramda"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TechItem } from "@/lib/data"
import { shuffle } from "@/lib/utils"

type StackProps = {
  stack: TechItem[];
};

export const Stack = ({ stack }: StackProps) => {
  const [display, rest] = splitAt(
    6,
    shuffle(stack).sort((s1, s2) => {
      if (!s1.featured && s2.featured) {
        return 1
      }
      if (s1.featured && !s2.featured) {
        return -1
      }
      return 0
    }),
  )

  return (
    <>
      {display.map((t) => (
        <TooltipProvider key={t.name}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="size-8">
                <div className="flex size-full items-center justify-center overflow-hidden bg-black text-2xl uppercase text-white">
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
                    variant="secondary"
                    className="flex gap-2"
                  >
                    <Avatar className="-ml-2 size-8">
                      <div className="flex size-full items-center justify-center overflow-hidden bg-black text-2xl uppercase text-white">
                        {t.icon && <i className={`devicon-${t.icon}-plain`} />}
                        {!t.icon && (
                          <AvatarFallback className="text-foreground">
                            {t.name[0]}
                          </AvatarFallback>
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
  )
}
