"use client"

import { useRef, useLayoutEffect } from "react"
import { ScreenPrint } from "@/components/screen-print"
import { getHeightMm } from "@/lib/utils"

export function Print() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    // Set the height of the page to the height of the content for printing
    const height = getHeightMm(ref.current)
    const style = document.createElement("style")
    // TODO: fix incorrect dynamic height later
    style.innerHTML = "@page {size: 210mm " + 800 + "mm;}"
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
