"use client"

import Lottie, {
  LottieComponentProps,
  LottieRefCurrentProps,
} from "lottie-react"
import bang from "./src/bang.json"
import zen from "./src/zen.json"
import clouds from "./src/clouds.json"
import transmission from "./src/transmission.json"

const animationNames = {
  bang,
  zen,
  clouds,
  transmission,
} as const

type AnimationName = keyof typeof animationNames;

export type AnimationProps = Omit<LottieComponentProps, "animationData"> & {
  name: AnimationName;
};

export const Animation = ({ name, ...props }: AnimationProps) => {
  return <Lottie animationData={animationNames[name]} {...props} />
}

export type AnimationRef = LottieRefCurrentProps;
