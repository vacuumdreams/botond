import { type ClassValue, clsx } from "clsx";
import prand from "pure-rand";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function randomIntFromInterval(seed: number, min: number, max: number) {
  const rng = prand.xoroshiro128plus(seed);
  return prand.unsafeUniformIntDistribution(min, max, rng);
}
