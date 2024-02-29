import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TagChart } from "@/components/charts/tag-chart";
import { LanguageChart } from "./languages";
import { JavascriptChart } from "./javascript";
import { IndustryChart } from "./industry";
import { LocationChart } from "./location";

export const Experience = () => {
  return (
    <div className="mt-12 px-14">
      <div className="grid grid-cols-12">
        <div className="col-span-12 mb-12 aspect-video xl:col-span-8 xl:aspect-square">
          <LanguageChart />
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-4 xl:col-span-3 xl:grid-cols-1 xl:grid-rows-2">
          <div className="aspect-square">
            <h6 className="text-center">Industry</h6>
            <IndustryChart />
          </div>
          <div className="aspect-square">
            <h6 className="text-center">Location</h6>
            <LocationChart />
          </div>
        </div>
      </div>
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="aspect-square">
              <p className="text-center text-sm text-slate-300">JavaScript</p>
              <JavascriptChart />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="aspect-square">
              <p className="text-center text-sm text-slate-300">Frontend</p>
              <TagChart tag="frontend" />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="aspect-square">
              <p className="text-center text-sm text-slate-300">Backend</p>
              <TagChart tag="backend" />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="aspect-square">
              <p className="text-center text-sm text-slate-300">Databases</p>
              <TagChart tag="database" />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="aspect-square">
              <p className="text-center text-sm text-slate-300">Cloud</p>
              <TagChart tag="cloud" />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="aspect-square">
              <p className="text-center text-sm text-slate-300">CI/CD</p>
              <TagChart tag="ci" />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="aspect-square">
              <p className="text-center text-sm text-slate-300">Testing</p>
              <TagChart tag="testing" />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
