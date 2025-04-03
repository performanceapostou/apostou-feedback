"use client";

import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);