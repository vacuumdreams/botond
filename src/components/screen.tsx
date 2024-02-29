"use client";

import { useState } from "react";
import { Intro } from "@/components/widgets/intro";
import { Dialogue } from "@/components/widgets/dialogue";
import { Stats } from "@/components/widgets/stats";

export const Screen = () => {
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="mb-6 mt-24">
          <Intro startTransition={false} />
        </div>
      </div>
      <article className="container">
        <Dialogue setStatsOpen={setStatsOpen} />
      </article>
      <Stats open={statsOpen} setOpen={setStatsOpen} />
    </div>
  );
};
