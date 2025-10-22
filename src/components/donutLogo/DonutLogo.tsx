"use client";
import Image from "next/image";

export default function DonutLogo() {
  return (
    <div className="flex flex-col items-center gap-y-2 w-full">
      {/* Left Section (Logo Side) */}
      <div className="flex items-center justify-center bg-[#3C096C] p-3 rounded-full w-25 h-25">
        <Image
          src="/donut_avatar.svg"
          alt="Donut Avatar"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>

    </div>
  );
}
