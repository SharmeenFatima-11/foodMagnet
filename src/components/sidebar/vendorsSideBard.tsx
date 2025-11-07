"use client";
import React, { useEffect, useState } from "react";
import VendorSidebarCard from "../card/vendorSidebarCard";
import { GetVendorDetails } from "../../lib/api/vendorApi";
import { motion } from "framer-motion";

interface Vendor {
  id: any;
  firstName: string;
  lastName: string;
  businessName: string;
  activeStatus: boolean;
  businessAddress: string;
  subscriptionTitle: string;
  permitExpiration: string;
}

interface VendorDetails {
  id: any;
  email: string;
  phoneNumber: string;
  description: string;
  bannerImageUrl: string;
  businessPhoneNumber: string | null;
  logoImageUrl: string | null;
  hasGenerator: boolean;
  hasSeating: boolean;
  paymentOptions: string[] | null;
  businessHours: { day: string; hours: string }[] | null;
}

interface VendorSideBarProps {
  vendor: Vendor | null;
}

const VendorSideBar: React.FC<VendorSideBarProps> = ({ vendor }) => {
  const [vendorDetails, setVendorDetails] = useState<VendorDetails | null>(null);

  useEffect(() => {
    if (vendor?.id != null) {
      GetVendorDetails(vendor.id)
        .then((res) => {
          console.log("Data fetched successfully:", res);
          setVendorDetails(res.foodTruckData);
        })
        .catch((error) => {
          console.error("Error fetching vendor details:", error.message);
        });
    }
  }, [vendor]);

  return (
    <motion.div
      className="
        bg-white 
        p-6 
        rounded-lg 
        shadow-lg 
        m-4 
        md:m-6 
        md:mx-10 
        mt-0 
        w-full 
        md:w-80 
        h-[calc(100vh-150px)]  /* Takes full available height on most screens */
        overflow-y-auto 
        flex-shrink-0
        scrollbar-thin 
        scrollbar-thumb-gray-300 
        scrollbar-track-transparent
      "
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {vendor ? (
        <div className="space-y-2 text-sm">
          {/* Status and Subscription */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                vendor.activeStatus ? "bg-green-600" : "bg-gray-400"
              } text-white`}
            >
              {vendor.activeStatus ? "Published" : "Unpublished"}
            </div>
            <div className="bg-[#343A40] text-white rounded-full px-4 py-1 text-xs font-medium">
              {vendor.subscriptionTitle}
            </div>
          </div>

          {/* Vendor Info */}
          <div className="flex flex-col justify-center items-center text-center mt-6 mb-4">
            <div className="flex justify-center items-center mb-4">
              <img
                src={
                  vendorDetails?.logoImageUrl ||
                  vendorDetails?.bannerImageUrl ||
                  "https://via.placeholder.com/100"
                }
                alt="Vendor Logo"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border border-gray-200"
              />
            </div>
            <p className="text-lg font-bold text-[#3C096C]">{vendor.businessName}</p>
          </div>

          {/* Vendor Details */}
          <div className="space-y-2">
            <VendorSidebarCard
              heading="Owner’s Name"
              value={`${vendor.firstName} ${vendor.lastName}`}
            />
            <VendorSidebarCard
              heading="Owner’s Phone Number"
              value={
                vendorDetails?.businessPhoneNumber ||
                vendorDetails?.phoneNumber ||
                "-"
              }
            />
            <VendorSidebarCard
              heading="Email"
              value={vendorDetails?.email || "-"}
            />
            <VendorSidebarCard
              heading="Business Address"
              value={vendor.businessAddress || "-"}
            />

            {/* Business Hours */}
            {vendorDetails?.businessHours && vendorDetails.businessHours.length > 0 && (
              <div className="flex flex-col gap-y-2 py-4">
                <span className="font-bold text-[#3C096C]">Business Hours</span>
                {vendorDetails.businessHours.map((val, ind) => (
                  <div
                    key={ind}
                    className="flex items-center justify-between text-gray-700"
                  >
                    <span>{val.day}</span>
                    <span className="font-medium">{val.hours}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm text-center mt-4">
          No vendor selected
        </p>
      )}
    </motion.div>
  );
};

export default VendorSideBar;
