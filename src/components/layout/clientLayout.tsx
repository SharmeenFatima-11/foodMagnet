"use client";

import Sidebar from "../sidebar/page";
import Header from "../header/page";
import VendorLayout from "./vendorLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ViewOnlyContext } from "@/context/ViewOnlyContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isViewOnly, setIsViewOnly] = useState(false);

  useEffect(() => {
    let userRole = localStorage.getItem("userData");
    userRole = userRole ? JSON.parse(userRole).userRole : null;
    if (userRole === "viewOnly") {
      setIsViewOnly(true);
    }
  }, []);

  const isVendorRoute = pathname.startsWith("/vendor/");

  return (
    <ViewOnlyContext.Provider value={{ isViewOnly }}>
      <LayoutContent isVendorRoute={isVendorRoute}>{children}</LayoutContent>
    </ViewOnlyContext.Provider>
  );
}

function LayoutContent({
  children,
  isVendorRoute,
}: {
  children: React.ReactNode;
  isVendorRoute: boolean;
}) {
  return (
    <div className="flex min-h-screen h-screen text-[#000000]">
      <div>
        <Sidebar />
      </div>
      <div className="w-full bg-[#F4F4F4]">
        <Header />
        {isVendorRoute ? <VendorLayout>{children}</VendorLayout> : children}
      </div>
    </div>
  );
}
