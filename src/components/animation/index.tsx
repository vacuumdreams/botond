"use client";

import Lottie, {
  LottieComponentProps,
  LottieRefCurrentProps,
} from "lottie-react";
import bang from "./src/bang.json";
import zen from "./src/zen.json";

const animationNames = {
  bang,
  zen,
} as const;

type AnimationName = keyof typeof animationNames;

type AnimationProps = Omit<LottieComponentProps, "animationData"> & {
  name: AnimationName;
};

export const Animation = ({ name, ...props }: AnimationProps) => {
  return <Lottie animationData={animationNames[name]} {...props} />;
};

export type AnimationRef = LottieRefCurrentProps;
