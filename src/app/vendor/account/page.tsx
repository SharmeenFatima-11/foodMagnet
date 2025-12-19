"use client";
import React, { useEffect, useState } from "react";
import Publishcard from "../../../components/card/account/publishcard";
import DeviceActivationCard from "../../../components/card/account/deviceActivationCards";
import TrackingInfoCard from "../../../components/card/account/trackingInfoCard";
import ManualUpgradeCard from "../../../components/card/account/manualUpgradeCard";
import { useAdmin } from "@/context/adminContext";

interface Vendor {
  id: number;
  activeStatus: boolean;
}

const Page = () => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  const { vendorId, activeState } = useAdmin();

  useEffect(() => {
    const storedVendor = sessionStorage.getItem("selectedVendor");
    if (storedVendor) {
      setVendor(JSON.parse(storedVendor));
    }
    setTimeout(() => setLoading(false), 500); // small delay for smooth transition
  }, [vendorId, activeState]);

  // ✅ Helper to update vendor state and sessionStorage
  const updateVendor = (updatedFields: Partial<Vendor>) => {
    setVendor((prev) => {
      if (!prev) return prev;
      const updatedVendor = { ...prev, ...updatedFields };
      sessionStorage.setItem("selectedVendor", JSON.stringify(updatedVendor)); // persist to sessionStorage
      return updatedVendor;
    });
  };

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
    <div
      className="h-full overflow-y-auto p-4 pt-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      style={{
        height: "calc(100vh - 165px)",
      }}
    >
      <Publishcard
        isPublished={vendor.activeStatus}
        id={vendor.id}
        onPublishSuccess={() =>
          updateVendor({ activeStatus: !vendor.activeStatus })
        } // ✅ updates both state & storage
      />
      <DeviceActivationCard isPublished={vendor.activeStatus} id={vendor.id} />
      <TrackingInfoCard isPublished={vendor.activeStatus} id={vendor.id} />
      <ManualUpgradeCard id={vendor.id} />
    </div>
  );
};

export default Page;
