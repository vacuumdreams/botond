import React from "react"
import { cn } from "@/lib/utils"

type TagProps = {
  className?: string;
  children: React.ReactNode;
};

export const Tag = ({ className, children }: TagProps) => {
  return (
    <span
      className={cn(
        "mr-2 inline-block bg-gray-200 px-3 py-1 font-mono text-sm font-semibold uppercase tracking-widest text-gray-700",
        className,
      )}
    >
      {children}
    </span>
  )
}
