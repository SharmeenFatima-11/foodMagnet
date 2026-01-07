// context/AdminContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface AdminContextType {
  vendorId: any;
  setVendorId: (data: any) => void;
  activeState: any;
  setActiveState: (data: any) => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [vendorId, setVendorId] = useState(null);
  const [activeState, setActiveState] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <AdminContext.Provider value={{ vendorId, setVendorId, activeState, setActiveState, notificationCount, setNotificationCount }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
