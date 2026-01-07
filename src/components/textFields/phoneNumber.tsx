"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneTextFieldProps {
  text: string;
  field: string;
  setField: any;
  placeholder?: string;
  type?: string;
  error?: string;
  setError?: (value: string) => void; // 👈 added
  inputRef?: React.Ref<HTMLInputElement> | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PhoneTextField: React.FC<PhoneTextFieldProps> = ({
  text,
  field,
  setField,
  placeholder = "",
  type = "tel",
  error = "",
  setError,
  inputRef,
  onKeyDown,
}) => {
  const handleChange = (value: string) => {
    setField(value);

    if (!setError) return;

    // Required
    if (!value || !value.trim()) {
      setError("Phone number is required");
      return;
    }

    // Digits only (react-phone-input-2 already enforces this, but safe)
    if (!/^\d+$/.test(value)) {
      setError("Phone number must contain digits only");
      return;
    }

    // E.164 length rules
    if (value.length < 7) {
      setError("Phone number is too short");
      return;
    }

    if (value.length > 15) {
      setError("Phone number is too long");
      return;
    }

    setError("");
  };

  return (
    <div className="w-full flex flex-col relative z-50">
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          {text}
        </label>
      )}

      <div
        className={`relative rounded-xl overflow-visible transition-all duration-300 border-2 ${
          error
            ? "border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
            : "border-gray-200 hover:shadow-sm"
        }`}
      >
        <PhoneInput
          country={"us"} // default only — users can change
          value={field}
          onChange={handleChange}
          placeholder={placeholder}
          inputProps={{
            name: "phone",
            required: true,
            ref: inputRef as React.RefObject<HTMLInputElement>,
            onKeyDown,
            type,
          }}
          inputStyle={{
            width: "100%",
            border: "none",
            height: "48px",
            fontSize: "16px",
            borderRadius: "12px",
            paddingLeft: "48px",
            color: "#1f2937",
            backgroundColor: "#fff",
          }}
          buttonStyle={{
            border: "none",
            backgroundColor: "transparent",
            paddingLeft: "12px",
          }}
          dropdownStyle={{
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            zIndex: 9999,
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "4px",
            backgroundColor: "#fff",
          }}
          containerClass="w-full"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneTextField;
