"use client";

import VendorSideBar from "../sidebar/vendorsSideBard";
import VendorHeader from "../header/vendorHeader";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Vendor {
  id: number;
  name: string;
  image: string;
  email: string;
  phoneNumber: { code: string; number: string };
  buissnessName: string;
  location: string;
  isPublished: boolean;
  isPremium: string;
  businessHours: { day: string; hours: string }[];
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}

// Separate component to use the context
function LayoutContent({ children }: { children: React.ReactNode }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve vendor data from sessionStorage
    const storedVendor = sessionStorage.getItem("selectedVendor");
    if (storedVendor) {
      setVendor(JSON.parse(storedVendor));
    }
  }, []);
  return (
    <div className="h-[85%] flex ">
      <div>
        <div className="flex items-center mx-10 mt-4 mb-2 gap-x-2 ">
          <p
          onClick={() => router.push("/vendor")}
           className="text-[#9FA2B4] font-sm text-sm cursor-pointer">Vendor</p>
          <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" />
          <p className="text-[#8B4DC5] font-sm text-sm cursor-pointer"> {vendor?.buissnessName}</p>
        </div>
        <VendorSideBar vendor={vendor} />
      </div>
      <div className="flex-1 p-6">
        <VendorHeader />
        {children}
      </div>
    </div>
  );
}
