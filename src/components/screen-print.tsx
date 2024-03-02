"use client";

import { PhoneIcon, MailIcon, GithubIcon, LinkedinIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { WorkHistory } from "@/components/widgets/stats/work-history";
import { Roadmap } from "@/components/widgets/stats/studies";
import { useData } from "@/components/provider/data";

export function ScreenPrint() {
  const { data } = useData();

  return (
    <div className="grid grid-cols-12 overflow-y-scroll print:text-black">
      <div className="col-span-4 border-r-2">
        <div className="w-full px-4 pt-4">
          <Avatar className="border-muted-foreground mx-auto mb-4 h-32 w-32 border-4">
            <AvatarImage src={data.picture} alt={data.name} />
          </Avatar>
          <h1 className="flex w-full items-center justify-center gap-4 text-xl">
            <span>{data.name}</span>
          </h1>
          <p className="text-muted-foreground text-center">{data.headline}</p>
          <p className="text-muted-foreground text-center">
            {data.description}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="w-full px-4 py-4">
          <div>
            <a
              className="mb-2 flex w-full items-center gap-2"
              href={`mailto:${data.social.email}?subject=${encodeURIComponent("Hey Botond!")}`}
            >
              <MailIcon size={14} /> {data.social.email}
            </a>
            <a
              className="mb-2 flex w-full items-center gap-2"
              href={`tel:${data.social.phone}`}
            >
              <PhoneIcon size={14} /> {data.social.phone}
            </a>
            <a
              className="mb-2 flex w-full items-center gap-2"
              href={data.social.links["linkedin"].url}
              target="_blank"
            >
              <GithubIcon size={14} />{" "}
              {data.social.links["github"].url.replace(
                "https://github.com",
                "",
              )}
            </a>
            <a
              className="mb-2 flex w-full items-center gap-2"
              href={data.social.links["linkedin"].url}
              target="_blank"
            >
              <LinkedinIcon size={14} />{" "}
              {data.social.links["linkedin"].url.replace(
                "https://linkedin.com",
                "",
              )}
            </a>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <Roadmap mode="print" />
        </div>
        <Separator className="my-4" />
      </div>
      <div className="col-span-8 pt-4">
        <h2 className="font-title mb-4 border-b-2 px-4 pb-4 text-xl">
          Work history
        </h2>
        <div className="px-4">
          <WorkHistory mode="print" />
        </div>
      </div>
    </div>
  );
}