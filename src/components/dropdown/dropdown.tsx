"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface DropDownProps {
  text: string;
  field: string[];
  options: string[];
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

  const handleSelect = (value: string) => {
    if (!field.includes(value)) {
      setField([...field, value]);
    }
    setSearchTerm("");
  };

  const handleRemove = (value: string) => {
    setField(field.filter((item) => item !== value));
  };

  // ✅ Handle Enter key (open, close, and move to next)
  const handleKeyDownInternal = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!isOpen) {
        setIsOpen(true); // open dropdown
      } else {
        setIsOpen(false); // close dropdown
        if (onKeyDown) onKeyDown(e as any); // 👈 Allow mixed event type
      }
    }
  };

  // ✅ Close dropdown when clicking outside
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

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col" ref={dropdownRef}>
      {/* Label */}
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide text-gray-700">
          {text}
        </label>
      )}

      {/* Dropdown Container */}
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
            {field.length > 0 ? `${field.length} selected` : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Dropdown Options */}
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
                filteredOptions.map((option, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelect(option)}
                    className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                      field.includes(option)
                        ? "bg-[#EDE0FF] text-[#3C096C] font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm px-3 py-2">
                  No results found
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Chips */}
      {field.length > 0 && (
        <div className="flex gap-2 mt-3">
          {field.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-[#F3E8FF] text-[#3C096C] px-3 py-1.5 rounded-full shadow-sm border border-[#E0C6FF] hover:bg-[#EDE0FF] transition-all duration-200 max-w-[150px]"
            >
              <span className="text-sm font-medium truncate" title={item}>
                {item}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="text-[#3C096C] hover:text-[#5A189A] focus:outline-none transition-transform hover:scale-110"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default DropDown;
