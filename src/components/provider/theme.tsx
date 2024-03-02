"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      forcedTheme={pathname === "/print" ? "light" : undefined}
    >
      {children}
    </NextThemeProvider>
  );
}

export { useTheme };
