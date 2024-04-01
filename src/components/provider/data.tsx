"use client"

import { ReactNode, createContext, useContext } from "react"
import type { ProcessedData } from "@/lib/data"

export const DataContext = createContext<ProcessedData>({} as ProcessedData)

type DataProviderProps = {
  data: ProcessedData;
  children: ReactNode;
};

export const DataProvider = ({ data, children }: DataProviderProps) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export const useData = () => {
  return useContext(DataContext)
}
