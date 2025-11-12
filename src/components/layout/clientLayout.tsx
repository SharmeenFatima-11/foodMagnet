"use client";

import Sidebar from "../sidebar/page";
import Header from "../header/page";
import VendorLayout from "./vendorLayout";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if path starts with /vendor
  const isVendorRoute = pathname.startsWith("/vendor/");

  return (
    <LayoutContent isVendorRoute={isVendorRoute}>{children}</LayoutContent>
  );
}

// Separate component to use the context
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
