import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, randomIntFromInterval } from "@/lib/utils";

type OrbitProps = {
  name: string;
  icon?: string;
  count: number;
  total: number;
};

export const Orbit = ({ name, icon, count, total }: OrbitProps) => {
  const animationName = `spin-${randomIntFromInterval(count, 0, 9)}`;
  const animationDurationOrbit =
    7500 * (total - count + 1) + (total - count) * 500;
  const animationDurationItem = randomIntFromInterval(count, 750, 10000);

  return (
    <div
      className={cn(
        "mt-48",
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
        "h-full w-full rounded-full",
      )}
    >
      <div
        className={cn(
          "absolute -left-5 -top-5 z-20 rounded-full",
          "h-[calc(100%_+_2.5rem)] w-[calc(100%_+_2.5rem)]",
          "will-change-transform",
        )}
        style={{
          animationName,
          animationDuration: `${animationDurationOrbit}ms`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: "normal",
          animationFillMode: "both",
        }}
      >
        <div
          className="absolute flex w-full justify-center will-change-transform"
          style={{
            animationName: "spin-0",
            animationDuration: `${animationDurationItem}ms`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: "reverse",
            animationFillMode: "both",
          }}
        >
          <Avatar className="border-foreground border bg-black text-white">
            <div className="flex h-full w-full items-center justify-center overflow-hidden text-3xl">
              {icon && <i className={`devicon-${icon}-plain`} />}
              {!icon && <AvatarFallback>{name[0]}</AvatarFallback>}
            </div>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
