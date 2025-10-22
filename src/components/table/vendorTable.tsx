"use client";
import React, { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

interface VendorTableProps {
  data: Vendor[];
}

const VendorTable: React.FC<VendorTableProps> = ({ data }) => {
  const router = useRouter();

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Vendor | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  // ✅ Sorting logic (handles all types)
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const key = sortConfig.key!;
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "boolean") {
        return sortConfig.direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }

      if (typeof valA === "number") {
        return sortConfig.direction === "asc"
          ? valA - (valB as number)
          : (valB as number) - valA;
      }

      return sortConfig.direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortConfig]);

  // ✅ Column header sorting toggle
  const handleSort = (key: keyof Vendor) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const handleRowClick = (vendor: Vendor) => {
    router.push(`/vendor/details?id=${vendor.id}`);
    sessionStorage.setItem("selectedVendor", JSON.stringify(vendor));
  };

  // ✅ Define table columns with proper field mapping
  const columns = [
    { label: "Client Name", key: "firstName" as keyof Vendor },
    { label: "Business Name", key: "businessName" as keyof Vendor },
    { label: "Location", key: "city" as keyof Vendor },
    { label: "Publication", key: "activeStatus" as keyof Vendor },
    { label: "Subscription", key: "subscriptionTitle" as keyof Vendor },
  ];

  return (
    <div className="mt-6 w-full flex justify-center">
      <div className="inline-block w-full align-middle overflow-x-auto rounded-lg shadow-sm border border-gray-100">
        <table className="min-w-full bg-white text-center text-sm md:text-base">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr className="border-b border-gray-200 text-gray-500 text-xs sm:text-sm font-medium">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 sm:px-4 py-3 cursor-pointer select-none hover:text-gray-700 whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
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
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {sortedData.map((item) => (
                <motion.tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="cursor-pointer border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-4 py-3 text-[#441372] font-medium hover:underline break-words">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="px-4 py-3 break-words">{item.businessName}</td>
                  <td className="px-4 py-3 break-words">
                    {item.city}, {item.state}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.activeStatus
                          ? "bg-[rgba(69,188,182,0.46)] text-[#343A40]"
                          : "bg-[#ABABAB] text-white"
                      }`}
                    >
                      {item.activeStatus ? "Published" : "Unpublished"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.subscriptionTitle === "Free"
                          ? "bg-[#343A40] text-white"
                          : item.subscriptionTitle === "Standard"
                          ? "bg-[#3C096C] text-white"
                          : "bg-[rgba(139,77,196,0.2)] text-[#343A40] font-semibold"
                      }`}
                    >
                      {item.subscriptionTitle}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {sortedData.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-400 py-4 text-sm"
          >
            No data found
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default VendorTable;
