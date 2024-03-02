"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Orbit } from "./orbit";
import { useData } from "@/components/provider/data";

type IntroProps = {
  startTransition: boolean;
};

export const Intro = ({ startTransition }: IntroProps) => {
  const { intro } = useData();
  const [showZen, setZen] = useState(false);

  useEffect(() => {
    setZen(true);
  }, []);

  useEffect(() => {
    if (startTransition) {
    }
  }, [startTransition]);

  return (
    <div className="relative">
      <div>
        {intro.map((t, i) => (
          <div
            key={t.name}
            className={cn(
              "mt-48 origin-center",
              "absolute left-1/2 top-1/2",
              "border-foreground rounded-full border border-dashed",
            )}
            style={{
              opacity: showZen ? 1 : 0,
              transform: showZen
                ? "scale(1) translate(-50%, -50%)"
                : "scale(0.75) translate(-50%, -50%)",
              transition: `opacity 1000ms ease-in, transform 1000ms ease-in`,
              transitionDelay: `${1000 + (intro.length - i) * 100}ms`,
              width: `${250 + (intro.length - i) * 36}px`,
              height: `${250 + (intro.length - i) * 36}px`,
            }}
          />
        ))}
        {intro.map((t, i) => (
          <div
            key={t.name}
            className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 transition-all"
            style={{
              opacity: showZen ? 1 : 0,
              transition: `opacity 1000ms ease-in, transform 1000ms ease-in`,
              transitionDelay: `${1000 + (intro.length - i) * 100}ms`,
              width: `${250 + (intro.length - i) * 36}px`,
              height: `${250 + (intro.length - i) * 36}px`,
            }}
          >
            <Orbit name={t.name} icon={t.icon} count={i} total={intro.length} />
          </div>
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
        <div className="relative m-auto mt-20 w-10/12 sm:w-80">
          <div className="animate-float">
            <Image
              src="/images/illustrations/figure.svg"
              alt="Botond Fekete"
              priority={true}
              width={300}
              height={300}
            />
          </div>
          <div className="absolute -left-20 top-1 w-40 -rotate-12">
            <Image
              src="/images/illustrations/vinyl-player.png"
              alt="Vinyl player"
              className="animate-float h-auto"
              width={300}
              height={300}
              style={{ animationDelay: "0.95s" }}
            />
          </div>
          <div className="absolute -right-40 -top-2 w-48 rotate-[24deg]">
            <Image
              src="/images/illustrations/guitar.png"
              alt="guitar"
              className="animate-float"
              width={400}
              height={400}
              style={{ animationDelay: "0.65s" }}
            />
          </div>
          <div className="absolute -top-24 right-0 w-24 -rotate-[24deg]">
            <Image
              src="/images/illustrations/moka.png"
              alt="guitar"
              className="animate-float"
              width={400}
              height={400}
              style={{ animationDelay: "1.25s" }}
            />
          </div>
          <div className="rotate absolute -left-8 top-44 w-40">
            <Image
              src="/images/illustrations/laptop.png"
              alt="guitar"
              className="animate-float"
              width={400}
              height={400}
              style={{ animationDelay: "2s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
