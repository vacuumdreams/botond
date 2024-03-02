import { useMemo } from "react";
import { differenceInMonths, formatDuration } from "date-fns";
import {
  FactoryIcon,
  HeartPulseIcon,
  BadgePoundSterlingIcon,
  LandmarkIcon,
  ClubIcon,
  HeadsetIcon,
  TvIcon,
  RocketIcon,
  LinkIcon,
} from "lucide-react";
import { ResponsivePie } from "@nivo/pie";
import { Avatar } from "@/components/ui/avatar";
import { useData } from "@/components/provider/data";
import { getStartDate, getEndDate } from "@/lib/utils";

const iconMapping = {
  "health & wellness": <HeartPulseIcon />,
  blockchain: <LinkIcon />,
  aerospace: <RocketIcon />,
  media: <TvIcon />,
  telecommunication: <HeadsetIcon />,
  gambling: <ClubIcon />,
  finance: <LandmarkIcon />,
  sales: <BadgePoundSterlingIcon />,
};

type Item = {
  id: string;
  label: string;
  value: number;
};

function addItem(
  acc: Record<string, Item>,
  industry: string,
  start: string,
  end: string | null,
) {
  if (!acc[industry]) {
    acc[industry] = {
      id: industry,
      label: industry,
      value: differenceInMonths(getEndDate(end), getStartDate(start)),
    };
    return acc;
  }
  acc[industry] = {
    id: industry,
    label: industry,
    value:
      acc[industry].value +
      differenceInMonths(getEndDate(end), getStartDate(start)),
  };
}

export const IndustryChart = () => {
  const { data } = useData();

  const chartData = useMemo(() => {
    const res = Object.values(data.work.history).reduce<Record<string, Item>>(
      (acc, work) => {
        if (work.employment === "freelance") {
          Object.values(work.clients || {}).reduce<Record<string, Item>>(
            (accClients, client) => {
              addItem(accClients, client.industry, client.start, client.end);
              return accClients;
            },
            acc,
          );
          return acc;
        }
        addItem(acc, work.industry, work.start, work.end);
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
        <div className="bg-muted text-foreground flex items-center gap-2 p-2 text-sm">
          <Avatar className="h-8 w-8">
            {/* @ts-ignore */}
            {iconMapping[e.datum.label] || <FactoryIcon />}
          </Avatar>
          <div>
            <h6 className="">
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
  );
};
