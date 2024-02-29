import { useMemo } from "react";
import { differenceInMonths, formatDuration } from "date-fns";
import { ResponsivePie } from "@nivo/pie";
import { MapPinIcon, LaptopIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useData } from "@/components/provider/data";
import { getStartDate, getEndDate } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  value: number;
};

function addItem(
  acc: Record<string, Item>,
  location: string,
  start: string,
  end: string | null,
) {
  if (!acc[location]) {
    acc[location] = {
      id: location,
      label: location,
      value: differenceInMonths(getEndDate(end), getStartDate(start)),
    };
    return acc;
  }
  acc[location] = {
    id: location,
    label: location,
    value:
      acc[location].value +
      differenceInMonths(getEndDate(end), getStartDate(start)),
  };
}

export const LocationChart = () => {
  const { data } = useData();

  const chartData = useMemo(() => {
    const res = Object.values(data.work.history).reduce<Record<string, Item>>(
      (acc, work) => {
        if (work.employment === "freelance") {
          Object.values(work.clients || {}).reduce<Record<string, Item>>(
            (accClients, client) => {
              addItem(accClients, client.location, client.start, client.end);
              return accClients;
            },
            acc,
          );
          return acc;
        }
        addItem(acc, work.location, work.start, work.end);
        return acc;
      },
      {},
    );

    return Object.values(res);
  }, [data]);

  return (
    <ResponsivePie
      data={chartData}
      colors={{ scheme: "accent" }}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      innerRadius={0}
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
        <div className="flex items-center gap-2 bg-slate-500 p-2 text-sm text-white">
          <Avatar className="h-8 w-8">
            {e.datum.label === "remote" ? <LaptopIcon /> : <MapPinIcon />}
          </Avatar>
          <div>
            <h6 className="">
              <span>{e.datum.label}</span>
            </h6>
            <p className="text-slate-300">
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
  );
};
