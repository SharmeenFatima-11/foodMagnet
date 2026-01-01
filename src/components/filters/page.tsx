"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import SquareButton from "../button/squareButton";
import WhiteSquareButton from "../button/whiteSquareButton";
import { Indent } from "lucide-react";

interface FilterProps {
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  filters: {
    subscription: string;
    permitStatus: string;
    city: string;
  };
  setFilter: (filters: any) => void;
}

const Filter: React.FC<FilterProps> = ({
  showFilter,
  setShowFilter,
  filters,
  setFilter,
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [tempFilters, setTempFilters] = useState(filters);

  // Sync tempFilters with filters when the sidebar opens
  useEffect(() => {
    if (showFilter) {
      setTempFilters(filters);
    }
  }, [showFilter, filters]);

  if (!showFilter) return null;

  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);


  /** Count filters applied (live count while selecting) */
  const appliedCount = Object.values(tempFilters).filter(
    (v) => v !== ""
  ).length;

  const renderDropdown = (
    label: string,
    field: keyof typeof tempFilters,
    options: string[]
  ) => {

    return (
      <div className="border-b border-gray-200 ">
        {/* Section Header */}
        <button
          className="flex justify-between items-center w-full py-3 text-left"
          onClick={() => toggleSection(field)}
        >
          <span className="font-medium text-gray-800">{label}</span>
          <ChevronDownIcon
            className={`w-5 h-5 text-gray-500 transform transition-transform cursor-pointer ${
              openSection === field ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown content */}
        <AnimatePresence>
          {openSection === field && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {options.map((opt, ind) => (
                <div
                  key={ind}
                  onClick={() =>
                    setTempFilters({ ...tempFilters, [field]: opt })
                  }
                  className={`cursor-pointer flex justify-between items-center px-2 py-2 text-sm rounded-md hover:bg-gray-100 ${
                    tempFilters[field] === opt
                      ? "text-[#441372] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  <span>{opt}</span>
                  {tempFilters[field] === opt && (
                    <span className="text-gray-400 text-xs">Selected</span>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const handleCancel = () => {
    // Reset only temporary filters (not main filters)
    setTempFilters({ subscription: "", permitStatus: "", city: "" });
  };

  const handleApply = () => {
    // Apply selected filters to main filter state
    setFilter(tempFilters);
    setShowFilter(false);
  };

  return (
    <motion.div
      className="fixed top-0 right-0 w-[380px] h-full bg-white shadow-2xl z-50 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Filter By</h2>
        </div>
        <button onClick={() => setShowFilter(false)}>
          <XMarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto">
        {renderDropdown("Subscription", "subscription", [
          "Free",
          // "Standard",
          "Premium",
        ])}

        {renderDropdown("Permit Status", "permitStatus", [
          "Active",
          // "Expiring Soon",
          // "Expired",
          // "Inactive",
        ])}

        {renderDropdown("City", "city", [
          "Conroe",
          "Dallas",
          "The Woodlands",
          "Lafayette",
          "Test",
        ])}
      </div>

      {/* Fixed Buttons at Bottom */}
      <div className="p-6 border-t border-gray-200 flex justify-end gap-x-3  gap-x-3">
        <div className="flex justify-end gap-x-3 ">
          <div>
            <WhiteSquareButton text="Cancel" onClick={handleCancel} />
          </div>
          <div className="flex-1">
            <SquareButton
              text={`Apply Filter${
                appliedCount > 0 ? ` ( ${appliedCount} )` : ""
              }`}
              onClick={handleApply}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;
