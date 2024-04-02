import { ContactIcon } from "lucide-react"
import { useData } from "@/components/provider/data"
import { XIcon } from 'lucide-react'

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TagCloud } from "./tag-cloud"
import { WorkHistory } from "./work-history"
import { Experience } from "./experience"
import { Roadmap } from "./studies"
import { FunFacts } from "./fun-facts"

type StatsProps = {
  onBack: () => void;
};

export const Stats = ({ onBack }: StatsProps) => {
  const { data } = useData()
  return (
    <div className="min-h-screen">
      <button className="absolute top-2 right-2" onClick={onBack}>
        <XIcon size={32} />
      </button>
      <div className="grid grid-cols-12 overflow-y-scroll">
        <div className="col-span-12 md:col-span-4 md:border-r">
          <div className="w-full p-4">
            <Avatar className="border-muted mx-auto mb-4 size-52 border-8">
              <AvatarImage src={data.picture} alt={data.name} />
            </Avatar>
            <h1 className="md:text:2xl flex w-full items-center justify-center gap-4 text-xl lg:text-3xl">
              <ContactIcon />
              <span>{data.name}</span>
            </h1>
            {data.headline.map((h) => (
              <p key={h} className="text-muted-foreground text-center">
                {h}
              </p>
            ))}
          </div>

          <Separator className="my-4 hidden md:block" />
          <div className="hidden md:block">
            <TagCloud />
          </div>
        </div>
        <div className="col-span-12 py-4 md:col-span-8">
          <Tabs defaultValue="work">
            <TabsList className="bg-muted grid h-20 w-full grid-cols-2 rounded-none px-4 md:mb-0 md:mt-8 md:h-10 md:grid-cols-4">
              <TabsTrigger value="work">Work history</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="cert">Self-ed</TabsTrigger>
              <TabsTrigger value="fun">Fun facts</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <WorkHistory />
            </TabsContent>
            <TabsContent value="experience">
              <Experience />
            </TabsContent>
            <TabsContent value="cert">
              <Roadmap />
            </TabsContent>
            <TabsContent value="fun">
              <FunFacts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
