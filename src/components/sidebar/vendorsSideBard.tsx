"use client";
import React, { useState } from "react";
import VendorSidebarCard from "../card/vendorSidebarCard";
import { motion } from "framer-motion";

interface Vendor {
  id: number;
  firstName: string;
  lastName: string;
  businessName: string;
  activeStatus: boolean;
  city: string;
  state: string;
  subscriptionTitle: string;
  permitExpiration: string;
}

interface VendorSideBarProps {
  vendor: Vendor | null;
}

const VendorSideBar: React.FC<VendorSideBarProps> = ({ vendor }) => {
  const [vendorData] = useState({
    image: "https://i.pravatar.cc/100",
    email: "abc@gmail.com",
    phoneNumber: { code: "+92", number: 3144444 },
    businessHours: [
      { day: "Monday", hours: "1 - 2" },
      { day: "Tuesday", hours: "1 - 2" },
      { day: "Wednesday", hours: "1 - 2" },
      { day: "Thursday", hours: "1 - 2" },
      { day: "Friday", hours: "1 - 2" },
    ],
  });

  return (
    <motion.div
      className="h-full w-80 bg-white p-6 m-6 mx-10 mt-0 rounded-lg shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {vendor ? (
        <div className="space-y-2 text-sm h-full overflow-y-auto">
          {/* Status and Subscription */}
          <div className="flex justify-between items-center">
            <div
              className={`rounded-full px-3 ${
                vendor.activeStatus ? "bg-green-600" : "bg-gray-400"
              } text-white`}
            >
              {vendor.activeStatus ? "Published" : "Unpublished"}
            </div>
            <div className="bg-[#343A40] text-white rounded-full px-4">
              {vendor.subscriptionTitle}
            </div>
          </div>

          {/* Vendor Info */}
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center my-6">
              <img
                src={vendorData?.image || "/default-avatar.png"}
                alt="User Image"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <p className="text-lg font-bold">{vendor.businessName}</p>
          </div>

          {/* Vendor Details */}
          <div>
            <VendorSidebarCard
              heading="Owner’s Name"
              value={`${vendor.firstName} ${vendor.lastName}`}
            />
            <VendorSidebarCard
              heading="Owner’s Phone Number"
              value={`${vendorData.phoneNumber.code} ${vendorData.phoneNumber.number}`}
            />
            <VendorSidebarCard heading="Email" value={vendorData.email} />
            <VendorSidebarCard
              heading="Business Address"
              value={`${vendor.city}, ${vendor.state}`}
            />

            {/* Business Hours */}
            <div className="flex flex-col gap-y-2 py-4">
              <span className="font-bold">Business Hours</span>
              {vendorData.businessHours.map((val, ind) => (
                <div
                  key={ind}
                  className="flex items-center justify-between mr-6"
                >
                  <span>{val.day}</span>
                  <span>{val.hours}</span>
                </div>
              ))}
            </div>
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
