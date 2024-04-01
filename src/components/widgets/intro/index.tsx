"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse"

import { cn } from "@/lib/utils"
import { Orbit } from "./orbit"
import { useData } from "@/components/provider/data"

type IntroProps = {
  startTransition: boolean;
};

export const Intro = ({ startTransition }: IntroProps) => {
  const { intro } = useData()
  const [showZen, setZen] = useState(false)

  useEffect(() => {
    setZen(true)
  }, [])

  useEffect(() => {
    if (startTransition) {
    }
  }, [startTransition])

  return (
    <MouseParallaxContainer
      globalFactorX={0.05}
      globalFactorY={0.05}
      className="h-screen w-screen"
    >
      <div className="relative">
        <div>
          {intro.map((t, i) => (
            <div
              key={t.name}
              className={cn(
                "mt-72 origin-center",
                "absolute left-1/2 top-1/2",
                "dark:border-muted rounded-full border border-dashed border-slate-300",
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
              className="absolute left-1/2 top-1/2 mt-24 origin-center -translate-x-1/2 -translate-y-1/2 transition-all"
              style={{
                opacity: showZen ? 1 : 0,
                transition: `opacity 1000ms ease-in, transform 1000ms ease-in`,
                transitionDelay: `${1000 + (intro.length - i) * 100}ms`,
                width: `${250 + (intro.length - i) * 36}px`,
                height: `${250 + (intro.length - i) * 36}px`,
              }}
            >
              <Orbit
                name={t.name}
                icon={t.icon}
                count={i}
                total={intro.length}
              />
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
          <div className="relative m-auto mt-44 w-10/12 sm:w-80">
            <div className="animate-float">
              <MouseParallaxChild factorX={0.3} factorY={0.5}>
                <Image
                  src="/images/illustrations/figure.svg"
                  alt="Botond Fekete"
                  priority={true}
                  width={300}
                  height={300}
                />
              </MouseParallaxChild>
            </div>

            <div
              className="absolute -left-20 top-1 hidden w-40 -rotate-12 sm:block"
              style={{ zIndex: -1 }}
            >
              <MouseParallaxChild factorX={0.5} factorY={0.35}>
                <Image
                  src="/images/illustrations/vinyl-player.png"
                  alt="Vinyl player"
                  className="animate-float h-auto"
                  width={300}
                  height={300}
                  style={{ animationDelay: "0.95s" }}
                />
              </MouseParallaxChild>
            </div>
            <div
              className="absolute -right-28 -top-2 hidden w-48 rotate-[24deg] sm:block"
              style={{ zIndex: -1 }}
            >
              <MouseParallaxChild factorX={0.35} factorY={0.15}>
                <Image
                  src="/images/illustrations/guitar.png"
                  alt="guitar"
                  className="animate-float"
                  width={400}
                  height={400}
                  style={{ animationDelay: "0.65s" }}
                />
              </MouseParallaxChild>
            </div>
            <div className="absolute -top-24 right-0 hidden w-24 -rotate-[24deg] sm:block">
              <MouseParallaxChild factorX={1.75} factorY={1.5}>
                <Image
                  src="/images/illustrations/moka.png"
                  alt="guitar"
                  className="animate-float"
                  width={400}
                  height={400}
                  style={{ animationDelay: "1.25s" }}
                />
              </MouseParallaxChild>
            </div>
            <div className="rotate absolute -left-8 top-44 hidden w-40 sm:block">
              <MouseParallaxChild factorX={1.15} factorY={0.65}>
                <Image
                  src="/images/illustrations/laptop.png"
                  alt="guitar"
                  className="animate-float"
                  width={400}
                  height={400}
                  style={{ animationDelay: "2s" }}
                />
              </MouseParallaxChild>
            </div>
          </div>
        </div>
      </div>
    </MouseParallaxContainer>
  )
}
