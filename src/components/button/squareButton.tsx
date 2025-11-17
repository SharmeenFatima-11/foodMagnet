import React from "react";
import { useViewOnly } from "@/context/ViewOnlyContext";

interface ButtonProps {
  text: string;
  onClick: (value: string) => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  isTriggered?: boolean | null
}

const Button: React.FC<ButtonProps> = ({ text, onClick, buttonRef, isTriggered }) => {
  const { isViewOnly } = useViewOnly();
  return (
    <div className="w-full flex flex-col">
      <button
        ref={buttonRef}
        onClick={() => onClick(text)}
        disabled={!!isTriggered || isViewOnly}
        className="
        cursor-pointer
          w-full bg-[#8B4DC5] text-md text-white py-2 px-4 rounded-md
          shadow-md shadow-[#3C096C]/30
          transition-all duration-700 ease-[cubic-bezier(0.45,0,0.15,1)]
          hover:bg-[#7B3FB0] hover:scale-[1.015]
          hover:shadow-lg hover:shadow-[#3C096C]/40
          cursor-pointer
          active:scale-[0.98]
          focus:outline-none focus:ring-0
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
