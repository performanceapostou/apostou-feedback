"use client";

import { createContext, ReactNode } from "react";

type AppContextProps = {};

export const AppContext = createContext({} as AppContextProps);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
