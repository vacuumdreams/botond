"use client"

import { useLayoutEffect, useRef } from "react"

import { getHeightMm } from "@/lib/utils"
import { ScreenPrint } from "@/components/screen-print"

export function Print() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    // Set the height of the page to the height of the content for printing
    const height = getHeightMm(ref.current)
    const style = document.createElement("style")
    // TODO: fix incorrect dynamic height later
    style.innerHTML = "@page {size: 210mm " + 685 + "mm;}"
    document.head.appendChild(style)
  }, [])

  return (
    <div ref={ref} className="hidden w-[210mm] print:block">
      <div className="max-w-screen min-h-screen overflow-hidden text-xs">
        <ScreenPrint />
      </div>
    </div>
  )
}
