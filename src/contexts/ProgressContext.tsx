"use client";

import React, { createContext, useContext, useState } from "react";

interface ProgressContextProps {
  progress: number;
  setProgress: (value: number) => void;
}

const ProgressContext = createContext<ProgressContextProps | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState(33);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress deve ser usado dentro de um ProgressProvider");
  }
  return context;
};