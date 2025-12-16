"use client";

import VendorSideBar from "../sidebar/vendorsSideBard";
import VendorHeader from "../header/vendorHeader";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { GetVendorDetails } from "../../lib/api/vendor/vendorApi";
import { VendorProvider } from "../../context/vendorContext";

interface Vendor {
  id: string;
  businessName: string;
  isVerified: boolean;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VendorProvider>
      {" "}
      <LayoutContent>{children}</LayoutContent>{" "}
    </VendorProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [businessName, setBusinessName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedVendor = sessionStorage.getItem("selectedVendor");
    if (storedVendor) {
      setVendor(JSON.parse(storedVendor));
    }
  }, []);

  useEffect(() => {
    if (vendor?.businessName) {
      setBusinessName(vendor?.businessName);
    } else {
      if (vendor?.id != null) {
        GetVendorDetails(vendor.id)
          .then((res) => {
            console.log("Data fetched successfully:", res);
            setBusinessName(res.foodTruckData.businessName);
          })
          .catch((error) => {
            console.error("Error fetching vendor details:", error.message);
          });
      }
    }
  }, [vendor]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 text-[#000000]">
      {/* 🟣 HEADER — visible only on small screens */}
      <div className="block md:hidden w-full">
        <div className="p-4">
          <VendorHeader />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* 🟣 SIDEBAR */}
        <div className="w-full md:w-98 bg-white border-b md:border-b-0 md:border-r border-gray-100">
          <div className="flex items-center mx-6 mt-4 mb-2 gap-x-2">
            <p
              onClick={() => router.push("/vendor")}
              className="text-[#9FA2B4] text-md cursor-pointer hover:underline"
            >
              Vendor
            </p>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <p className="text-[#8B4DC5] text-md font-medium truncate max-w-[200px]">
              {businessName}
            </p>
          </div>

          <VendorSideBar vendor={vendor} />
        </div>

        {/* 🟣 MAIN CONTENT */}
        <div className="flex-1 flex flex-col">
          {/* Header for md+ */}
          <div className="hidden md:block p-4">
            <VendorHeader />
          </div>

          {/* Content area — scroll only on md and below */}
          <div className="flex-1 md:overflow-y-auto lg:overflow-visible">
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
