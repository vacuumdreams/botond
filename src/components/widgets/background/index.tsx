"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const Background = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && resolvedTheme === "dark") {
    return (
      <>
        <div
          className="fixed left-0 top-0 -z-10 flex size-full items-center justify-center print:hidden"
          style={{
            opacity: "0.075",
            backgroundImage: "url('/images/bg.jpeg')",
            animation: "500s scroll infinite linear",
          }}
        ></div>
        <div className="star-field fixed left-0 top-0 h-screen w-screen">
          <div />
          <div />
          <div />
        </div>
      </>
    );
  }

  if (mounted) {
    return (
      <div className="warp print:hidden">
        <div />
      </div>
    );
  }

  return null;
};
