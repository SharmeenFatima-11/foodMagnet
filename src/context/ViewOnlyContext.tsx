"use client";

import { createContext, useContext } from "react";

interface ViewOnlyContextType {
  isViewOnly: boolean;
}

export const ViewOnlyContext = createContext<ViewOnlyContextType>({
  isViewOnly: false,
});

export const useViewOnly = () => useContext(ViewOnlyContext);
