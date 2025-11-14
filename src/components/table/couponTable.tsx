"use client";
import React, { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Coupon {
  promo_code: string; // or number if you prefer, but keep it consistent
  is_used: boolean;
  expiry_date: string | Date;
}

interface CouponTableProps {
  data: Coupon[];
}

const CouponTable: React.FC<CouponTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Coupon | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (!sortConfig.key || !sortConfig.direction) return data;

    return Array.isArray(data)
      ? [...data].sort((a, b) => {
          const key = sortConfig.key!;
          const valA = a[key];
          const valB = b[key];

          if (typeof valA === "number" && typeof valB === "number") {
            return sortConfig.direction === "asc" ? valA - valB : valB - valA;
          }

          return sortConfig.direction === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
        })
      : [];
  }, [data, sortConfig]);

  const handleSort = (key: keyof Coupon) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="mt-6 w-full flex justify-center">
      <div className="inline-block w-full align-middle overflow-x-auto rounded-lg shadow-sm border border-gray-100">
        <table className="min-w-full bg-white text-center text-sm md:text-base border border-[#DBB6FF]">
          <thead className="sticky top-0 bg-[#DBB6FF] z-10">
            <tr className="border-b border-[#DBB6FF] text-xs sm:text-sm font-medium">
              {[
                { label: "Coupon Code", key: "promo_code" },
                { label: "Status", key: "is_used" },
                { label: "Expiration Date", key: "expiry_date" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="px-3 sm:px-4 py-3 cursor-pointer select-none hover:text-gray-700 whitespace-nowrap"
                  onClick={() => handleSort(col.key as keyof Coupon)}
                >
                  <div className="flex justify-center items-center gap-1">
                    <span>{col.label}</span>
                    <ArrowUpDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        sortConfig.key === col.key
                          ? sortConfig.direction === "asc"
                            ? "rotate-180 text-[#441372]"
                            : "text-[#441372]"
                          : "text-white"
                      }`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {Array.isArray(sortedData)
                ? sortedData?.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="cursor-default border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition-all duration-150"
                    >
                      <td className="px-4 py-3 break-words">
                        {item.promo_code}
                      </td>
                      <td className="px-4 py-3 break-words">
                        {item.is_used ? "Used" : "Not Used"}
                      </td>
                      <td className="px-4 py-3 break-words">
                        {new Date(item.expiry_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          }
                        )}
                      </td>
                    </motion.tr>
                  ))
                : "No coupons available."}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponTable;
