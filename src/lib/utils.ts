import { type ClassValue, clsx } from "clsx";
import prand from "pure-rand";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStartDate = (dateStr?: string | null) => {
  if (!dateStr) return new Date();
  const [m, y] = dateStr.split("/").map((v) => parseInt(v));
  return new Date(y, m - 1);
};

export const getEndDate = (dateStr?: string | null) => {
  if (!dateStr) return new Date();
  const [m, y] = dateStr.split("/").map((v) => parseInt(v));
  return new Date(y, m);
};

export const getDate = getStartDate;

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

type DateRange = [Date, Date];

export function mergeOverlappingRanges(ranges: DateRange[]): DateRange[] {
  // Sort ranges by start date
  ranges.sort((a, b) => a[0].getTime() - b[0].getTime());

  const merged: DateRange[] = [];
  for (let range of ranges) {
    if (merged.length === 0) {
      merged.push(range);
    } else {
      let last = merged[merged.length - 1];
      if (last[1] >= range[0]) {
        // If the current range overlaps with the last one, merge them
        last[1] = new Date(Math.max(last[1].getTime(), range[1].getTime()));
      } else {
        merged.push(range);
      }
    }
  }

  return merged;
}

export function getHeightMm(el: null | HTMLElement) {
  if (!el?.cloneNode) {
    return 0;
  }
  const clone = el.cloneNode(true);

  if (clone instanceof HTMLElement) {
    Object.assign(clone.style, {
      width: "210mm",
      overflow: "visible",
      height: "auto",
      maxHeight: "none",
      opacity: "0",
      visibility: "hidden",
      display: "block",
    });

    el.after(clone);
    const height = clone.offsetHeight;

    clone.remove();

    return Math.floor((height * 25.4) / 96);
  }
  return 0;
}
