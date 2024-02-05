import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

  // console.log(name, animationName);

  return (
    <div
      className={cn(
        "mt-48",
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
        "rounded-full",
      )}
      style={{
        width: `${250 + (total - count) * 36}px`,
        height: `${250 + (total - count) * 36}px`,
      }}
    >
      <div
        className={cn(
          "absolute -left-5 -top-5 z-20 rounded-full",
          "h-[calc(100%_+_2.5rem)] w-[calc(100%_+_2.5rem)]",
        )}
        style={{
          animationName,
          animationDuration: `${animationDurationOrbit}ms`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: "forwards",
        }}
      >
        <div
          className="flex justify-center"
          style={{
            animationName: "spin-0",
            animationDuration: `${animationDurationItem}ms`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: "reverse",
          }}
        >
          <Avatar className="border border-white bg-white">
            {icon && <AvatarImage src={icon} alt={name} />}
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
