import { ContactIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useData } from "@/components/provider/data";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TagCloud } from "./tag-cloud";
import { WorkHistory } from "./work-history";
import { Experience } from "./experience";
import { Roadmap } from "./studies";
import { FunFacts } from "./fun-facts";

type StatsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const Stats = ({ open, setOpen }: StatsProps) => {
  const { data } = useData();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto h-[calc(100vh_-_2rem)] max-w-[calc(100vw_-_2rem)] p-0 font-mono">
        <div className="grid grid-cols-12 overflow-y-scroll">
          <div className="col-span-12 border-r border-slate-800 md:col-span-4">
            <div className="w-full p-4">
              <Avatar className="mx-auto mb-4 h-52 w-52 border-4 border-slate-500">
                <AvatarImage src={data.picture} alt={data.name} />
              </Avatar>
              <h1 className="md:text:2xl flex w-full items-center justify-center gap-4 text-xl lg:text-3xl">
                <ContactIcon />
                <span>{data.name}</span>
              </h1>
              <p className="text-center text-slate-400">{data.headline}</p>
              <p className="text-center text-slate-400">{data.description}</p>
            </div>

            <Separator className="my-4" />
            <TagCloud />
          </div>
          <div className="col-span-12 py-4 md:col-span-8">
            <Tabs defaultValue="work">
              <TabsList className="mt-8 grid w-full grid-cols-4 rounded-none px-4">
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
      </DialogContent>
    </Dialog>
  );
};