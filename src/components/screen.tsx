"use client";

import { useState } from "react";
import Image from "next/image";
import { Intro } from "@/components/widgets/intro";
import { Dialogue } from "@/components/widgets/dialogue";
import { Stats } from "@/components/widgets/stats";

export const Screen = () => {
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <div>
      <div>
        <div>
          <Intro startTransition={false} />
        </div>
      </div>
      <article className="container">
        <Dialogue setStatsOpen={setStatsOpen} />
      </article>
      <Stats open={statsOpen} setOpen={setStatsOpen} />
      <div
        className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center"
        style={{
          opacity: "0.075",
          backgroundImage: "url('/images/bg.jpeg')",
          animation: "500s scroll infinite linear",
        }}
      ></div>
    </div>
  );
};
