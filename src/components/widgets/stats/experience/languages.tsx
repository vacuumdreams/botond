import { useMemo } from "react";
import { formatDuration } from "date-fns";
import { ResponsiveBar } from "@nivo/bar";
import { useData } from "@/components/provider/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const LanguageChart = () => {
  const { data } = useData();

  const chartData = useMemo(() => {
    return Object.values(data.skills.tech)
      .filter((skill) => skill.tags?.includes("language"))
      .map((skill) => {
        return {
          language: skill.name,
          icon: skill.icon || "",
          years: (skill.xp || 0) / 12,
        };
      })
      .sort((a, b) => b["years"] - a["years"]);
  }, [data]);

  return (
    <ResponsiveBar
      data={chartData}
      keys={["years"]}
      indexBy="language"
      animate={false}
      margin={{ top: 16, right: 60, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: false }}
      colors={{ scheme: "accent" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: (
          <tspan className="fill-white font-mono text-sm">language</tspan>
        ),
        legendPosition: "middle",
        legendOffset: 42,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: <tspan className="fill-white font-mono text-sm">years</tspan>,
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      enableLabel={false}
      role="application"
      ariaLabel="Languages"
      barAriaLabel={(e) => e.data.language}
      tooltip={(e) => (
        <div className="bg-muted text-foreground flex items-center gap-2 p-2 text-sm">
          <Avatar className="h-8 w-8">
            <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black text-2xl uppercase text-white">
              {e.data.icon && <i className={`devicon-${e.data.icon}-plain`} />}
              {!e.data.icon && (
                <AvatarFallback>{e.data.language[0]}</AvatarFallback>
              )}
            </div>
          </Avatar>
          <div>
            <h6 className="">
              <span>{e.data.language}</span>
            </h6>
            <p className="text-muted-foreground">
              xp:{" "}
              {formatDuration({
                years: Math.floor(e.data.years),
                months: Math.round(((e.data.years % 1) * 100) / 12),
              })}
            </p>
          </div>
        </div>
      )}
    />
  );
};
