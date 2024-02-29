import { HammerIcon } from "lucide-react";
import { useData } from "@/components/provider/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const TagCloud = () => {
  const { normalisedTags } = useData();

  return (
    <div className="px-4 pb-4">
      <h3 className="mb-4 flex gap-2">
        <HammerIcon />
        <span className="text-slate-400">Toolbox</span>
      </h3>
      <div className="-m-1">
        {normalisedTags.map(({ tag, size }) => {
          return (
            <Badge
              className={cn(
                "m-1 bg-slate-800 text-white hover:bg-slate-800",
                size,
              )}
              key={tag}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
