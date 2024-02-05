"use client";

import { Typewriter } from "react-simple-typewriter";

type TitleProps = {
  children: string | string[];
};

export const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="my-12 text-center">
      <Typewriter
        words={Array.isArray(children) ? children : [children]}
        typeSpeed={70}
        deleteSpeed={20}
        delaySpeed={2000}
        cursor
      />
    </h1>
  );
};
