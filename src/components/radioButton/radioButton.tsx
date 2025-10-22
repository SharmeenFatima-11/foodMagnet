"use client";
import React from "react";

interface RadioOption {
  label: string;
  value: string;
  subtext?: string; // ✅ added optional subtext (e.g., "$79.00 per month")
}

interface RadioButtonGroupProps {
  label?: string;
  options: RadioOption[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  error?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  options,
  selectedValue,
  setSelectedValue,
  error = "",
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label className="text-md font-semibold mb-3 ml-2 tracking-wide text-gray-700">
          {label}
        </label>
      )}

      {/* Radio Cards */}
      <div className="flex flex-col gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedValue === option.value;

          return (
            <label
              key={idx}
              className={`flex items-center justify-between w-full rounded-xl px-4 py-3 cursor-pointer select-none transition-all duration-300 shadow-sm hover:shadow-md ${
                isSelected ? "shadow-[0_0_0_3px_rgba(139,77,197,0.25)]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="subscription"
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="w-5 h-5 accent-[#8B4DC5] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span
                    className={`font-medium transition-colors ${
                      isSelected ? "text-[#3C096C]" : "text-gray-800"
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.subtext && (
                    <span className="text-sm text-gray-500 mt-0.5">
                      {option.subtext}
                    </span>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default RadioButtonGroup;
