import { compareDesc, parse } from 'date-fns'
import { CalendarIcon, ExternalLinkIcon } from "lucide-react"
import { useMemo, useState } from 'react'
import Markdown from "react-markdown"
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { freelanceSchema } from "@/lib/data"

type ClientDescriptionProps = {
  work: z.infer<typeof freelanceSchema>
}

export const ClientDescription = ({ work }: ClientDescriptionProps) => {
  const [tab, setTab] = useState<string | undefined>(undefined)
  const activeClient = Object.values(work.clients).find(c => c.id === tab)
  const clientList = useMemo(() => {
    return Object.values(work.clients).sort((c1, c2) => {
      return compareDesc(parse(c1.start, 'MM/yyyy', new Date()), parse(c2.start, 'MM/yyyy', new Date()))
    })
  }, [work])

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1">
        {clientList.map((c, i) => (
          <Badge
            variant={c.id === activeClient?.id ? 'default' : "secondary"}
            className="cursor-pointer"
            onClick={() => setTab(c.id === activeClient?.id ? undefined : c.id)}
          >
            <div className="flex items-center whitespace-nowrap">
              <Avatar className="-ml-2 mr-2 size-6">
                <AvatarImage src={c.icon || ""} alt={c.name} />
                <AvatarFallback>{c.name[0]}</AvatarFallback>
              </Avatar>
              {c.name}
            </div>
          </Badge>
        ))}
      </div>
      {activeClient && (
        <div className="mt-6 pt-4">
          {activeClient.url && (
            <a href={activeClient.url} className="mb-4 flex items-center gap-2" target="_blank">
              <span className="underline">{activeClient.name}</span>
              <ExternalLinkIcon size={16} />
            </a>
          )}
          {!activeClient.url && (
            <p className="mb-4">{activeClient.name}</p>
          )}
          <p className="mb-6 flex gap-2">
            <CalendarIcon size={16} />
            <span>{activeClient.start}-{activeClient.end || "Present"}</span>
          </p>
          <div
            className="prose prose-slate dark:prose-invert mb-4 mt-2 w-full"
          >
            <Markdown>{activeClient.description}</Markdown>
          </div>
        </div>
      )}
    </div>
  )
}
