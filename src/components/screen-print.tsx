"use client";

import {
  PhoneIcon,
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  GlobeIcon,
  MapPinIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { WorkHistory } from "@/components/widgets/stats/work-history";
import { Roadmap } from "@/components/widgets/stats/studies";
import { useData } from "@/components/provider/data";

export function ScreenPrint() {
  const { data } = useData();

  return (
    <div className="grid grid-cols-12 overflow-y-scroll">
      <div className="col-span-4 border-r-2 border-slate-200">
        <div className="w-full px-4 pb-2 pt-4">
          <Avatar className="border-muted mx-auto mb-4 size-32 border-4">
            <AvatarImage src={data.picture} alt={data.name} />
          </Avatar>
          <h1 className="flex w-full items-center justify-center gap-4 text-xl">
            <span>{data.name}</span>
          </h1>
          {data.headline.map((h) => (
            <p key={h} className="text-muted-foreground text-center">
              {h}
            </p>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="w-full p-4">
          <div>
            <p className="mb-2 flex w-full items-center gap-2">
              <MapPinIcon size={14} /> {data.location}
            </p>
            <a
              className="mb-2 flex w-full items-center gap-2"
              href={data.social.website}
            >
              <GlobeIcon size={14} /> {data.social.website}
            </a>
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
        <div className="px-4 pb-8 pt-6">
          <p className="mb-[1.85rem]">{data.description}</p>
          <div className="flex flex-wrap gap-2">
            {Object.values(data.skills.tech)
              .filter((t) => t.featured)
              .map((t) => (
                <Badge
                  key={t.name}
                  className="flex gap-2"
                  variant={"secondary"}
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
        </div>
        <Separator className="my-4" />
        <div className="border-b-2 pt-4">
          <Roadmap mode="print" />
        </div>
      </div>
      <div className="col-span-8 pt-4">
        <h2 className="font-title font-effect-anaglyph mb-4 border-b-2 border-slate-200 px-4 pb-4 text-xl">
          work history
        </h2>
        <div className="px-4">
          <WorkHistory mode="print" />
        </div>
      </div>
    </div>
  );
}
