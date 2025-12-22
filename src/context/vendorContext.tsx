// context/VendorContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface VendorContextType {
  verified: any;
  setVerified: (data: any) => void;
  actionTriggered: any; 
  setActionTriggered: React.Dispatch<React.SetStateAction<boolean>>;
}

const VendorContext = createContext<VendorContextType | null>(null);

export const VendorProvider = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState(null);
  const [actionTriggered, setActionTriggered] = useState<boolean>(false);

  return (
    <VendorContext.Provider value={{ verified, setVerified, actionTriggered, setActionTriggered }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => {
  const ctx = useContext(VendorContext);
  if (!ctx) throw new Error("useVendor must be used inside VendorProvider");
  return ctx;
};
