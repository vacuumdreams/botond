import { HammerIcon } from "lucide-react"
import { useData } from "@/components/provider/data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const TagCloud = () => {
  const { normalisedTags } = useData()

  return (
    <div className="pb-4">
      <h3 className="bg-muted mb-4 flex items-center gap-2 p-4">
        <HammerIcon />
        <span className="text-muted-foreground font-title text-xs">toolbox</span>
      </h3>
      <div className="-m-1">
        {normalisedTags.map(({ tag, size }) => {
          return (
            <Badge
              className={cn(
                "bg-muted text-foreground hover:bg-muted m-1",
                size,
              )}
              key={tag}
            >
              {tag}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}
