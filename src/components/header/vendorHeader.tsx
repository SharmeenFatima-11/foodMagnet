"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const VendorHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Details", href: "/vendor/details" },
    { label: "Menu", href: "/vendor/menu" },
    { label: "Documents", href: "/vendor/documents" },
    { label: "Reviews", href: "/vendor/reviews" },
    { label: "Account", href: "/vendor/account" },
    { label: "Notes", href: "/vendor/notes" },
  ];

  return (
    <div className="relative flex border-b border-b-4 border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <button
            key={tab.label}
            onClick={() => router.push(tab.href)}
            className={`relative px-4 py-2 text-sm cursor-pointer font-medium transition-colors duration-200 ${
              isActive ? "text-[#8B4DC5]" : "text-[#000000] hover:text-gray-700"
            }`}
          >
            {tab.label}
            {/* Animated underline */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.span
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B4DC5] rounded-t-md"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
};

export default VendorHeader;
