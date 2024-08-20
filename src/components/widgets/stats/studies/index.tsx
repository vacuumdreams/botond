import { ExternalLinkIcon } from "lucide-react"

import { cn, getDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useData } from "@/components/provider/data"

const PRINT_LIST_SIZE = 5

type RoadmapProps = {
  mode?: "normal" | "print"
}

export const Roadmap = ({ mode }: RoadmapProps) => {
  const { data } = useData()

  const courseList = Object.values(data.education.courses)
  const certs = courseList
    .sort((i1, i2) => {
      const d1 = getDate(i1.date)
      const d2 = getDate(i2.date)
      if (d1 > d2) return -1
      if (d1 < d2) return 1
      return 0
    })
    .slice(0, mode === "print" ? PRINT_LIST_SIZE : undefined)

  return (
    <div>
      <div className="p-4">
        <p>
          I{"'"}ve been doing software for a while, but I{"'"}m always trying to
          keep a pace at learning new things. Here are some of the courses and
          certifications I{"'"}ve completed or I{"'"}m currently working on:
        </p>
      </div>
      <ul className="ml-8 border-l-2 pb-8 pl-6">
        {certs.map((c, i) => (
          <li
            key={i}
            className={cn(
              "relative my-8 items-center justify-between gap-4 pr-4 first:mt-0 last:mb-0",
              {
                "md:flex": mode !== "print",
              }
            )}
          >
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <div>
                <p className="text-muted-foreground">{c.date}</p>
                <p className="flex justify-between gap-2">
                  {c.name}
                  {mode !== "print" && <ExternalLinkIcon />}
                </p>
              </div>
              <div className="my-4 flex flex-wrap items-center gap-2 md:my-0">
                {c.tags?.map((tag) => (
                  <Badge
                    className="whitespace-nowrap break-keep"
                    variant="secondary"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {c.issuer && (
                <Avatar className="absolute -left-11 top-0 border-2">
                  <AvatarImage src={c.icon} alt={c.issuer} />
                  <AvatarFallback>{c.issuer[0]}</AvatarFallback>
                </Avatar>
              )}
            </a>
          </li>
        ))}
        {mode === "print" && courseList.length > PRINT_LIST_SIZE && (
          <li className="relative my-8 items-center justify-between gap-4 pr-4">
            <a
              href={`${data.social.website}/profile`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Avatar className="absolute -left-11 top-0 border-2">
                <AvatarFallback>
                  +{courseList.length - PRINT_LIST_SIZE}
                </AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground pt-3">(...)</p>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
