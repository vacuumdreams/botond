import { z } from 'zod'
import { useState } from 'react'
import Markdown from "react-markdown"
import { ExternalLinkIcon } from "lucide-react"

import { freelanceSchema } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ClientDescriptionProps = {
  work: z.infer<typeof freelanceSchema>
}

export const ClientDescription = ({ work }: ClientDescriptionProps) => {
  const [tab, setTab] = useState<string | undefined>(undefined)
  const activeClient = Object.values(work.clients).find(c => c.id === tab)

  return (
    <div className="w-full">
      <div className="flex gap-1">
        {Object.values(work.clients).map((c, i) => (
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
        <div className="pt-4">
          {activeClient.url && (
            <a href={activeClient.url} className="flex items-center gap-2">
              <ExternalLinkIcon />
              <span>Website</span>
            </a>
          )}
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
