import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useData } from "@/components/provider/data";

export type BubbleProps = {
  onEvents: {
    setStatsOpen: (open: boolean) => void;
  };
  dialogue: {
    delay?: number;
    pos: "left" | "right";
    decor?: boolean;
    Component: (props: {
      setStatsOpen: (open: boolean) => void;
      data: ReturnType<typeof useData>["data"];
      onFinish: () => void;
    }) => JSX.Element;
  };
  onFinish: () => void;
};

export const Bubble = ({ dialogue, onEvents, onFinish }: BubbleProps) => {
  const { data } = useData();
  const [show, setShow] = useState(false);
  const decor = dialogue.decor !== false;

  useEffect(() => setShow(true), [setShow]);

  return (
    <div
      className={cn("w-3/4", {
        "mr-auto": dialogue.pos === "left",
        "ml-auto": dialogue.pos === "right",
      })}
    >
      <div
        className={cn(
          "mb-4 w-full rounded-md p-2",
          "transition-all duration-500",
          {
            "border border-dashed border-white text-slate-100": decor,
            "bg-slate-800": decor && dialogue.pos === "left",
            "bg-slate-600": decor && dialogue.pos === "right",
          },
        )}
      >
        {
          <dialogue.Component
            data={data}
            setStatsOpen={onEvents.setStatsOpen}
            onFinish={onFinish}
          />
        }
      </div>
    </div>
  );
};
