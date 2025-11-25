import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const [maskTimeouts, setMaskTimeouts] = useState<NodeJS.Timeout[]>([]);

  const isPasswordField = type === "password";

  useEffect(() => {
    return () => {
      maskTimeouts.forEach((t) => clearTimeout(t));
    };
  }, [maskTimeouts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setField(value);

    if (isPasswordField && !showPassword) {
      const masked = field
        .split("")
        .map(() => "•")
        .join("");
      const newChar = value[value.length - 1] || "";
      setDisplayValue(masked + newChar);

      const timeout = setTimeout(() => {
        setDisplayValue(
          value
            .split("")
            .map(() => "•")
            .join("")
        );
      }, 500);
      setMaskTimeouts((prev) => [...prev, timeout]);
    } else {
      setDisplayValue(value);
    }
  };

  useEffect(() => {
    if (isPasswordField) {
      if (showPassword) {
        setDisplayValue(field);
      } else {
        setDisplayValue(
          field
            .split("")
            .map(() => "•")
            .join("")
        );
      }
    }
  }, [showPassword, field]);

  return (
    <div className={`w-full flex flex-col`}>
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          {text}
        </label>
      )}

      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300
          border-2
          ${
            error
              ? "border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
              : "border-gray-200 hover:shadow-sm"
          }
        `}
      >
        <input
          type={isPasswordField ? (showPassword ? "text" : "password") : type} // ✅ fixed
          ref={inputRef}
          value={field} // just use actual field value
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className={`w-full px-4 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400
    transition-all duration-300
    ${isPasswordField ? "pr-12" : ""}
    font-mono tracking-wide outline-none focus:outline-none focus:ring-0
  `}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#F3E8FF] hover:bg-[#E2D0FF] text-[#3C096C] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default TextField;
