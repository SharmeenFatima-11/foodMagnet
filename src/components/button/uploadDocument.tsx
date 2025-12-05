"use client";
import React, { useRef } from "react";

const UploadDocument: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allowedTypes = [
    "application/msword", // .doc
    "application/pdf", // .pdf
    "image/svg+xml", // .svg
    "image/png", // .png
  ];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ✅ STRICT TYPE CHECK
    if (!allowedTypes.includes(file.type)) {
      alert("Only .doc, .pdf, .svg, and .png files are allowed.");
      event.target.value = ""; // reset input
      return;
    }

    console.log("Valid file selected:", file);

    // ✅ Safe to upload now
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-2 w-full bg-white p-6 shadow-xl rounded-lg">
      <div
        className="flex justify-center bg-[#EBEBEB] w-full p-8 cursor-pointer"
        onClick={handleImageClick}
      >
        <img src="/upload.svg" alt="Upload" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".doc,.pdf,.svg,.png"
      />

      <span className="text-[#6F6F6F] text-sm">
        Upload .doc, .pdf, .svg, .png
      </span>
    </div>
  );
};

export default UploadDocument;
