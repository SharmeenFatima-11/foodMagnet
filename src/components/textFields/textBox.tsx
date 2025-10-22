"use client";
import React from "react";

interface TextFieldProps {
  text: string;
  field: string;
  setField: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement> | null;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  multiline?: boolean;
  maxLength?: number;
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
  multiline = true,
  maxLength = 500, // default max characters for multiline
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setField(value);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Label */}
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          {text}
        </label>
      )}

      {/* Input wrapper */}
      <div
        className={`relative rounded-xl transition-all duration-300 border-2 ${
          error
            ? "border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
            : "border-gray-200 hover:shadow-sm"
        }`}
      >
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={field}
            onChange={handleChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            rows={6} // 👈 default height for 6 lines
            maxLength={maxLength}
            className="w-full px-4 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400 resize-none
              font-mono tracking-wide transition-all duration-300 outline-none focus:ring-0 focus:border-gray-200"
          />
        ) : (
          <input
            type={type}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={field}
            onChange={handleChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className="w-full px-4 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400
              transition-all duration-300 font-mono tracking-wide outline-none focus:ring-0 focus:border-gray-200"
          />
        )}
      </div>

      {/* Character count */}
      {multiline && (
        <div className="text-sm text-gray-500 mt-1 text-right">
          {field.length} / {maxLength}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default TextField;
