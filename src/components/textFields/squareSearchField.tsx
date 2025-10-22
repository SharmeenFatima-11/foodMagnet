"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchFieldProps {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  setValue,
  placeholder = "Tracking Number",
}) => {
  return (
    <div className="relative inline-flex items-center w-full max-w-xs">
      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-4 pr-10 py-2
          text-gray-700 bg-white
          border border-gray-200
          rounded-lg shadow-sm
          focus:outline-none focus:ring-0
          placeholder-gray-400
          transition-all duration-200
          hover:border-gray-300
        "
      />

      {/* Search icon inside input */}
      <span className="absolute right-3 flex items-center justify-center">
        <Search size={18} strokeWidth={2} className="text-gray-400" />
      </span>
    </div>
  );
};

export default SearchField;
