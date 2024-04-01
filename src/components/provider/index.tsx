import { ReactNode } from "react"
import { DataProvider } from "./data"
import { ThemeProvider } from "./theme"
import { getData } from "@/lib/data"

type ProviderProps = {
  children: ReactNode;
};

export async function Provider({ children }: ProviderProps) {
  const data = await getData()

  return (
    <ThemeProvider>
      <DataProvider data={data}>{children}</DataProvider>
    </ThemeProvider>
  )
}
