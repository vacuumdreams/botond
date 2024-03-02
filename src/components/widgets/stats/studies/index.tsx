import { ExternalLinkIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/components/provider/data";
import { cn, getDate } from "@/lib/utils";

type RoadmapProps = {
  mode?: "normal" | "print";
};

export const Roadmap = ({ mode }: RoadmapProps) => {
  const { data } = useData();

  const certs = Object.values(data.education.courses).sort((i1, i2) => {
    const d1 = getDate(i1.date);
    const d2 = getDate(i2.date);
    if (d1 > d2) return -1;
    if (d1 < d2) return 1;
    return 0;
  });

  return (
    <div>
      <div className="p-4">
        <p>
          I{"'"}ve been doing software for a while, but I{"'"}m always trying to
          keep a pace at learning new things. Here are some of the courses and
          certifications I{"'"}ve completed or I{"'"}m currently working on:
        </p>
      </div>
      <ul className="ml-8 border-l-2 pl-6">
        {certs.map((c, i) => (
          <li
            key={i}
            className={cn(
              "relative my-8 items-center justify-between gap-4 pr-4",
              {
                "md:flex": mode !== "print",
              },
            )}
          >
            <div>
              <p className="text-muted-foreground">{c.date}</p>
              <p>{c.name}</p>
            </div>
            <div className="my-4 flex flex-wrap items-center gap-2 md:my-0">
              {c.tags?.map((tag) => (
                <Badge
                  className="bg-muted hover:bg-muted text-foreground whitespace-nowrap break-keep print:bg-slate-200 print:text-black"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
              {mode !== "print" && (
                <a href={c.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
            {c.issuer && (
              <Avatar className="absolute -left-11 top-0 border-2">
                <AvatarImage src={c.icon} alt={c.issuer} />
                <AvatarFallback>{c.issuer[0]}</AvatarFallback>
              </Avatar>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
