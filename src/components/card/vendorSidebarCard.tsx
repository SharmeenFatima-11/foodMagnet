import React from "react";

interface VendorSidebarCardProps {
  heading: string;
  value: string | null | undefined;
}

const VendorSidebarCard: React.FC<VendorSidebarCardProps> = ({ heading, value }) => {
  return (
    <div className="flex flex-col gap-y-2 py-4 border-b border-b-2 border-gray-200">
      <span className="font-bold">{heading}</span>
      <span >{value || "-"}</span>
    </div>
  );
};

export default VendorSidebarCard;
