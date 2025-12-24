"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadDocument from "../../../components/button/uploadDocument";
import {
  SwitchToggle,
  GetVerificationStatus,
} from "../../../lib/api/vendor/documentApis";
import { useVendor } from "../../../context/vendorContext";
import { useViewOnly } from "@/context/ViewOnlyContext";

interface Vendor {
  id: number;
  isVerified: boolean;
}

const Page = () => {
  const { isViewOnly } = useViewOnly();
  const { setVerified } = useVendor();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [docs, setDocs] = useState<Array<any>>([]);
  const [isDisabled, setDisabled] = useState(true);

  const handleToggle = async () => {
    if (!vendor) return;

    const newState = !enabled;

    // ✅ Optimistically update UI
    setDisabled(true);

    try {
      const res = await SwitchToggle({
        id: vendor.id,
        isVerified: newState,
      });
      setVerified(newState);
      setEnabled(newState);
      setDisabled(false);

      console.log("Data fetched successfully:", res);
    } catch (error: any) {
      console.error("Error updating vendor", error.message);
      setDisabled(false);
      // ✅ Revert UI if API fails
      setEnabled(enabled);
    }
  };

  useEffect(() => {
    const storedVendorString = sessionStorage.getItem("selectedVendor");

    if (storedVendorString) {
      const parsedVendor = JSON.parse(storedVendorString);
      if (!parsedVendor) return;
      setVendor(parsedVendor);
      if (parsedVendor?.id != null) {
        GetVerificationStatus(parsedVendor?.id.toString())
          .then((res) => {
            console.log("Data fetched successfully:", res);
            setEnabled(res.verificationStatus);
            setDisabled(false);
          })
          .catch((error) => {
            console.error("Error fetching items", error.message);
          });
      }
    }
  }, []);

  return (
    <div className="flex flex-col flex-grow min-h-0 overflow-hidden">
      <UploadDocument />

      {/* Header with Toggle */}
      <div className="flex justify-between items-center my-6">
        <span className="text-black text-md">Documents</span>

        <div className="flex items-center gap-2">
          {/* Toggle Switch */}
          <button
            onClick={handleToggle}
            disabled={isDisabled || isViewOnly}
            className={`relative w-10 h-5 flex items-center rounded-full transition-colors duration-300 ${
              enabled ? "bg-[#8B4DC5]" : "bg-gray-300"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute w-4 h-4 bg-white rounded-full shadow-md"
              style={{
                x: enabled ? 20 : 4,
              }}
            />
          </button>

          {/* Verified Badge Animation */}
          <AnimatePresence>
            <motion.img
              src="/verifiedBadge.svg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Documents Section */}
      <div className="flex flex-grow">
        <AnimatePresence mode="wait">
          {docs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center items-center gap-y-2 w-full"
            >
              <img
                src="/documents.svg"
                alt="No Documents"
                className="w-68 h-68"
              />
              <span className="text-[#9FA2B4] text-md font-semibold text-center">
                Looks like you don’t have any documents here
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="docs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Map through docs and display them */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
