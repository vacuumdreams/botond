import { useLayoutEffect, useRef, useState, useMemo } from 'react'
import { splitAt } from "ramda"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TechItem, ProcessedData } from "@/lib/data"
import { shuffle } from "@/lib/utils"
import { useData } from '@/components/provider/data'

type StackProps = {
  mode?: 'normal' | 'print'
  stack: TechItem[];
};

function getPrintStack(data: ProcessedData['data'], stack: TechItem[]) {
  const featuredTech = Object.values(data.skills.tech).filter(t => t.featured)
  const list = stack.filter(t => featuredTech.includes(t))
  return {
    list,
    rest: stack.length - list.length
  }
}

const PrintStack = ({ stack }: Pick<StackProps, 'stack'>) => {
  const { data } = useData()
  const { list, rest } = getPrintStack(data, stack)

  return (
    <ul className="block">
      {list.map((t, i) => (
        <li key={t.name} className="inline">
          <span>{t.name}</span>
          {', '}
        </li>
      ))}
      <li className="inline">
        <a href={`${data.social.website}/profile`}>
          <Badge
            variant="secondary"
          >
            +{rest}
          </Badge>
        </a>
      </li>
    </ul>
  )
}

export const Stack = ({ mode, stack }: StackProps) => {
  const [splitIndex, setSplitIndex] = useState(6)
  const ref = useRef<HTMLDivElement>(null)
  const [display, rest] = splitAt(
    splitIndex,
    stack.sort((s1, s2) => {
      if (!s1.featured && s2.featured) {
        return 1
      }
      if (s1.featured && !s2.featured) {
        return -1
      }
      return 0
    }),
  )

  useLayoutEffect(() => {
    if (ref.current?.offsetWidth) {
      setSplitIndex((ref.current.offsetWidth - 52) / 40)
    }
  }, [setSplitIndex])

  if (mode === 'print') {
    return <PrintStack stack={stack} />
  }

  return (
    <div ref={ref} className="flex flex-auto items-center gap-2">
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
    </div>
  )
}
