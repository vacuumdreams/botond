import { ExternalLinkIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/components/provider/data";
import { getDate } from "@/lib/utils";

export const Roadmap = () => {
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
          certifications I{"'"}ve completed or I{"'"}m currently working on.
        </p>
      </div>
      <ul className="ml-8 border-l-2 border-slate-800 pl-6">
        <li className="relative my-8 items-center justify-between gap-4 pr-4 md:flex">
          <div>
            <p className="text-slate-500">Started recently</p>
            <p>Threejs Journey</p>
          </div>
          <div className="my-4 flex items-center gap-2 md:my-0">
            <Badge className="whitespace-nowrap break-keep bg-slate-800 text-white hover:bg-slate-800">
              ui
            </Badge>
            <a
              href={"https://threejs-journey.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon />
            </a>
          </div>
          <Avatar className="absolute -left-11 top-0 border-2 border-black">
            <AvatarImage
              src={"/images/education/courses/threejs-journey.jpg"}
              alt={"Threejs Journey"}
            />
          </Avatar>
        </li>
        <li className="relative my-8 items-center justify-between gap-4 pr-4 md:flex">
          <div>
            <p className="text-slate-500">Ongoing</p>
            <p>Try Hack Me</p>
          </div>
          <div className="my-4 flex items-center gap-2 md:my-0">
            <Badge className="whitespace-nowrap break-keep bg-slate-800 text-white hover:bg-slate-800">
              cybersecurity
            </Badge>
            <a
              href={"https://tryhackme.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon />
            </a>
          </div>
          <Avatar className="absolute -left-11 top-0 border-2 border-black">
            <AvatarImage
              src={"/images/education/courses/tryhackme.jpeg"}
              alt={"Try Hack Me"}
            />
          </Avatar>
        </li>
        {certs.map((c, i) => (
          <li
            key={i}
            className="relative my-8 items-center justify-between gap-4 pr-4 md:flex"
          >
            <div>
              <p className="text-slate-500">{c.date}</p>
              <p>{c.name}</p>
            </div>
            <div className="my-4 flex items-center gap-2 md:my-0">
              {c.tags?.map((tag) => (
                <Badge
                  className="whitespace-nowrap break-keep bg-slate-800 text-white hover:bg-slate-800"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
              <a href={c.link} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon />
              </a>
            </div>
            {c.issuer && (
              <Avatar className="absolute -left-11 top-0 border-2 border-black">
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
