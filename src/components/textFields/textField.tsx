"use client";
import React from "react";

interface TextFieldProps {
  text: string;
  field: string;
  setField: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement> | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  text,
  field,
  setField,
  placeholder = "",
  type = "text",
  error = "",
  inputRef,
  onKeyDown,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(e.target.value);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Label */}
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          {text}
        </label>
      )}

      {/* Input field */}
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 border-2 ${
          error
            ? "border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
            : "border-gray-200 hover:shadow-sm"
        }`}
      >
        <input
          type={type}
          ref={inputRef}
          value={field}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className="w-full px-4 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400
            transition-all duration-300 font-mono tracking-wide outline-none focus:outline-none focus:ring-0 focus:border-gray-200"
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default TextField;
