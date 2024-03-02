"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemeProvider>
  );
}

export { useTheme };
