"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export const ThemeSwitch = () => {
  const [isMounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!isMounted) return null

  return (
    <div className="absolute right-0 top-0">
      <div className="flex gap-2 p-2">
        <MoonIcon className="text-muted-foreground" />
        <Switch
          checked={resolvedTheme === "light"}
          onCheckedChange={(v) => setTheme(v ? "light" : "dark")}
          aria-label="Toggle Dark Mode"
        />
        <SunIcon className="text-muted-foreground" />
      </div>
    </div>
  )
}
