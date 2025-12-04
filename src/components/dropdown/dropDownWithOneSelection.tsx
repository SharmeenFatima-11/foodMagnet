"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface DropDownOption {
  id?: number | string;
  name?: string;
}

interface DropDownProps {
  text: string;
  field: string[];
  options: (string | DropDownOption)[];
  setField: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  inputRef?: React.Ref<HTMLDivElement> | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  text,
  field,
  options,
  setField,
  placeholder = "Select options",
  error = "",
  inputRef,
  onKeyDown,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string | DropDownOption) => {
    const value = typeof option === "string" ? option : String(option.id ?? "");
    setField([value]);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleRemove = (value: string) => {
    setField(field.filter((item) => item !== value));
  };

  const handleKeyDownInternal = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
      else {
        setIsOpen(false);
        if (onKeyDown) onKeyDown(e as any);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) => {
    const label = typeof option === "string" ? option : option.name || "";
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full flex flex-col" ref={dropdownRef}>
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide text-gray-700">
          {text}
        </label>
      )}

      <div
        ref={inputRef as React.RefObject<HTMLDivElement>}
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDownInternal}
        className={`relative rounded-xl border-2 from-white to-gray-50 transition-all duration-300 focus:ring-2 focus:ring-gray-200 outline-none ${
          error
            ? "border-red-400 shadow-[0_0_12px_rgba(255,0,0,0.25)]"
            : "border-gray-200 hover:shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 cursor-pointer rounded-xl">
          <span
            className={`text-gray-800 font-mono tracking-wide ${
              field.length === 0 ? "text-gray-400" : ""
            }`}
          >
            {field.length > 0
              ? (() => {
                  const selected = options.find((o) =>
                    typeof o === "string"
                      ? o === field[0]
                      : String(o.id) === field[0]
                  );
                  return typeof selected === "string"
                    ? selected
                    : selected?.name || field[0];
                })()
              : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-56 overflow-y-auto transition-all duration-300 origin-top animate-scaleIn">
            <div className="p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gray-300"
                autoFocus
              />
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => {
                  const label =
                    typeof option === "string" ? option : option.name || "";
                  const value =
                    typeof option === "string"
                      ? option
                      : String(option.id ?? "");
                  return (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ stop the parent toggle
                        handleSelect(option); // close dropdown and set value
                      }}
                      className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                        field.includes(value)
                          ? "bg-[#EDE0FF] text-[#3C096C] font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {label}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm px-3 py-2">
                  No results found
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {field.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {field.map((item, idx) => {
      // find the corresponding option
      const selectedOption = options.find((o) =>
        typeof o === "string" ? o === item : String(o.id ?? o.name) === item
      );
      const displayName =
        typeof selectedOption === "string"
          ? selectedOption
          : selectedOption?.name || item; // fallback to item if name missing

      return (
        <div
          key={idx}
          className="flex items-center gap-2 bg-[#F3E8FF] text-[#3C096C] px-3 py-1.5 rounded-full shadow-sm border border-[#E0C6FF] hover:bg-[#EDE0FF] transition-all duration-200"
        >
          <span className="text-sm font-medium">{displayName}</span>
          <button
            type="button"
            onClick={() => handleRemove(item)}
            className="text-[#3C096C] hover:text-[#5A189A] focus:outline-none transition-transform hover:scale-110"
          >
            <X size={14} />
          </button>
        </div>
      );
    })}
  </div>
)}

      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default DropDown;
