"use client";

import React from "react";
import { Search } from "lucide-react";
import Button from "../button/squareButton";

interface TrackingInfoFieldProps {
  value: string;
  setValue: (val: string) => void;
  submit: () => void;
  placeholder?: string;
}

const TrackingInfoField: React.FC<TrackingInfoFieldProps> = ({
  value,
  setValue,
  submit,
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
          w-full pl-4 pr-10 py-3
          text-gray-700 bg-white
          border border-gray-200
          rounded-lg shadow-sm
          focus:outline-none focus:ring-0
          placeholder-gray-400
          transition-all duration-200
          hover:border-gray-300
        "
      />

      {/* button inside input */}
      <span className="absolute right-3 inset-y-1 flex items-center">
        <Button text="Enter" onClick={() => submit()} />
      </span>
    </div>
  );
};

export default TrackingInfoField;
