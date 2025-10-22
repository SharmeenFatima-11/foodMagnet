"use client";
import React, { useEffect, useState } from "react";
import Publishcard from "../../../components/card/account/publishcard";
import DeviceActivationCard from "../../../components/card/account/deviceActivationCards";
import TrackingInfoCard from "../../../components/card/account/trackingInfoCard";
import ManualUpgradeCard from "../../../components/card/account/manualUpgradeCard";

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

const Page = () => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedVendor = sessionStorage.getItem("selectedVendor");
    if (storedVendor) {
      setVendor(JSON.parse(storedVendor));
    }
    setTimeout(() => setLoading(false), 500); // small delay for smooth transition
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg animate-pulse">
        Loading vendor data...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        No vendor data found.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <Publishcard isPublished={vendor.isPublished} />
      <DeviceActivationCard isPublished={vendor.isPublished} />
      <TrackingInfoCard isPublished={vendor.isPublished} />
      <ManualUpgradeCard />
    </div>
  );
};

export default Page;
