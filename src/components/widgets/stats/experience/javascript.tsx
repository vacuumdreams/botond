import { useMemo } from "react";
import { formatDuration } from "date-fns";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { useData } from "@/components/provider/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const JavascriptChart = () => {
  const { data } = useData();

  const chartData = useMemo(() => {
    const tech = Object.values(data.skills.tech);
    return {
      name: "Javascript",
      children: [
        {
          name: "Frontend",
          children: tech
            .filter(
              (t) =>
                t.tags.includes("javascript") && t.tags.includes("frontend"),
            )
            .map((t) => ({
              ...t,
              id: `frontend-${t.name}`,
            })),
        },
        {
          name: "Backend",
          children: tech
            .filter(
              (t) =>
                t.tags.includes("javascript") && t.tags.includes("backend"),
            )
            .map((t) => ({
              ...t,
              id: `backend-${t.name}`,
            })),
        },
        {
          name: "Tooling",
          children: tech
            .filter(
              (t) =>
                t.tags.includes("javascript") && t.tags.includes("tooling"),
            )
            .map((t) => ({
              ...t,
              id: `tooling${t.name}`,
            })),
        },
        {
          name: "Testing",
          children: tech
            .filter(
              (t) =>
                t.tags.includes("javascript") && t.tags.includes("testing"),
            )
            .map((t) => ({
              ...t,
              id: `testing-${t.name}`,
            })),
        },
      ],
    };
  }, [data]);

  return (
    <ResponsiveCirclePacking
      data={chartData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="id"
      value="xp"
      colors={{ scheme: "accent" }}
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.4]],
      }}
      padding={2}
      enableLabels={false}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.5]],
      }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "none",
          color: "inherit",
          rotation: -45,
          lineWidth: 5,
          spacing: 8,
        },
      ]}
      fill={[
        {
          match: {
            depth: 1,
          },
          id: "lines",
        },
      ]}
      tooltip={(e) => {
        if (e.data.children) {
          return (
            <div className="bg-slate-500 p-2 text-sm text-white">
              {e.data.name}
            </div>
          );
        }
        if ("xp" in e.data) {
          const {
            icon,
            name,
            xp = 0,
          } = e.data as {
            icon?: string;
            name?: string;
            xp: number;
          };
          return (
            <div className="flex items-center gap-2 bg-slate-500 p-2 text-sm text-white">
              <Avatar className="h-8 w-8">
                <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black text-2xl uppercase text-white">
                  {icon && <i className={`devicon-${icon}-plain`} />}
                  {!icon && <AvatarFallback>{e.data.name[0]}</AvatarFallback>}
                </div>
              </Avatar>
              <div>
                <h6 className="">
                  <span>{name}</span>
                </h6>
                <p className="text-slate-300">
                  xp:{" "}
                  {formatDuration({
                    years: Math.floor(xp / 12),
                    months: Math.round(xp % 12),
                  })}
                </p>
              </div>
            </div>
          );
        }
        return <span />;
      }}
    />
  );
};
