"use client";

import VendorSideBar from "../sidebar/vendorsSideBard";
import VendorHeader from "../header/vendorHeader";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Vendor {
  id: number;
  firstName: string;
  lastName: string;
  businessName: string;
  activeStatus: boolean;
  businessAddress: string;
  subscriptionTitle: string;
  permitExpiration: string;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedVendor = sessionStorage.getItem("selectedVendor");
    if (storedVendor) {
      setVendor(JSON.parse(storedVendor));
    }

    // Disable scroll globally
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Reset when unmounted
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* 🟣 HEADER — visible only on small screens */}
      <div className="block md:hidden bg-white w-full border-b border-gray-100 shadow-md flex-shrink-0">
        <div className="p-4">
          <VendorHeader />
        </div>
      </div>

      {/* 🟣 SIDEBAR — full width on mobile, fixed width on desktop */}
      <div className="w-full md:w-98 bg-white border-b md:border-b-0 md:border-r border-gray-100 flex-shrink-0 flex flex-col overflow-hidden">
        <div className="flex items-center mx-6 mt-4 mb-2 gap-x-2 flex-shrink-0">
          <p
            onClick={() => router.push("/vendor")}
            className="text-[#9FA2B4] text-md cursor-pointer hover:underline"
          >
            Vendor
          </p>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <p className="text-[#8B4DC5] text-md font-medium truncate max-w-[200px]">
            {vendor?.businessName}
          </p>
        </div>

        <VendorSideBar vendor={vendor} />
      </div>

      {/* 🟣 MAIN CONTENT — static (no scroll) */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        <div className="hidden md:block p-4 flex-shrink-0 bg-white border-b border-gray-100 shadow-sm">
          <VendorHeader />
        </div>

        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
