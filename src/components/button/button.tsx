import React from "react";

interface ButtonProps {
  text: string;
  onClick: (value: string) => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, buttonRef }) => {
  return (
    <div className="w-full flex flex-col">
      <button
        ref={buttonRef}
        onClick={() => onClick(text)}
        className="
        cursor-pointer
          w-full bg-[#8B4DC5] text-md text-white py-4 px-4 rounded-full
          shadow-md shadow-[#3C096C]/30
          transition-all duration-700 ease-[cubic-bezier(0.45,0,0.15,1)]
          hover:bg-[#7B3FB0] hover:scale-[1.015]
          hover:shadow-lg hover:shadow-[#3C096C]/40
          cursor-pointer
          active:scale-[0.98]
          focus:outline-none focus:ring-0
        "
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
