import { useMemo } from "react"
import { formatDuration } from "date-fns"
import { ResponsivePie } from "@nivo/pie"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useData } from "@/components/provider/data"

type TagChartProps = {
  tag: string;
};

export const TagChart = ({ tag }: TagChartProps) => {
  const { data } = useData()

  const chartData = useMemo(() => {
    return Object.values(data.skills.tech)
      .filter((skill) => skill.tags?.includes(tag) && skill.xp)
      .map((skill) => {
        return {
          id: skill.name,
          label: skill.name,
          value: skill.xp || 0,
          icon: skill.icon,
        }
      })
  }, [data, tag])

  return (
    <ResponsivePie
      data={chartData}
      colors={{ scheme: "accent" }}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      tooltip={(e) => (
        <div className="bg-muted flex items-center gap-2 p-2 text-sm text-white">
          <Avatar className="size-8">
            <div className="flex size-full items-center justify-center overflow-hidden bg-black text-2xl uppercase text-white">
              {e.datum.data.icon && (
                <i className={`devicon-${e.datum.data.icon}-plain`} />
              )}
              {!e.datum.data.icon && (
                <AvatarFallback>{e.datum.data.label[0]}</AvatarFallback>
              )}
            </div>
          </Avatar>
          <div>
            <h6 className="text-foreground">
              <span>{e.datum.label}</span>
            </h6>
            <p className="text-muted-foreground">
              xp:{" "}
              {formatDuration({
                years: Math.floor(e.datum.value / 12),
                months: Math.round(e.datum.value % 12),
              })}
            </p>
          </div>
        </div>
      )}
    />
  )
}
