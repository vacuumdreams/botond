"use client";

import { useRef, useEffect, useState } from "react";
import { Animation, AnimationRef } from "@/components/animation";

import type { ProcessedData } from "@/lib/data";
import { cn, shuffle } from "@/lib/utils";
import { Orbit } from "./orbit";

type IntroProps = {
  data: ProcessedData;
};

export const Intro = ({ data }: IntroProps) => {
  const zenRef = useRef<AnimationRef>(null);
  const [showZen, setZen] = useState(false);
  const tech = shuffle(
    Object.values(data.skills.tech).filter((t) => t.featured),
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setZen(true);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className={cn("transition delay-1000 duration-1000", {
          "opacity-0": !showZen,
          "opacity-100": showZen,
        })}
      >
        {tech.map((t, i) => (
          <div
            key={t.name}
            className={cn(
              "mt-48",
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
              "rounded-full border border-dashed border-slate-800",
            )}
            style={{
              width: `${250 + (tech.length - i) * 36}px`,
              height: `${250 + (tech.length - i) * 36}px`,
            }}
          />
        ))}
        {tech.map((t, i) => (
          <Orbit
            key={t.name}
            name={t.name}
            icon={t.icon}
            count={i}
            total={tech.length}
          />
        ))}
      </div>
      <div
        className={cn(
          "absolute left-0 top-0 w-full transition-opacity duration-1000",
          {
            "opacity-0": !showZen,
            "opacity-100": showZen,
          },
        )}
      >
        <div className="m-auto w-96">
          <Animation lottieRef={zenRef} name="zen" />
        </div>
      </div>
    </div>
  );
};
