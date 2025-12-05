"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadDocument from "../../../components/button/uploadDocument";

const Page = () => {
  const [enabled, setEnabled] = useState(false);
  const [docs, setDocs] = useState<Array<any>>([]);

  const handleToggle = () => {
    setEnabled((prev) => {
      const newState = !prev;

      if (newState) {
        console.log("✅ Toggle Enabled – call your API here");
      } else {
        console.log("❌ Toggle Disabled");
      }

      return newState;
    });
  };

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
