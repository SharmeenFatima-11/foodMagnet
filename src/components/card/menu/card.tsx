import React from "react";

interface VendorSidebarCardProps {
  name: string;
  items: string;
  image: string;
}

const VendorSidebarCard: React.FC<VendorSidebarCardProps> = ({
  name,
  items,
  image,
}) => {
  return (
    <div className="flex justify-between items-stretch gap-x-10 bg-white rounded-lg mr-6 my-1">
      {/* Text Section */}
      <div className="flex flex-col gap-y-2 flex-1">
        <span className="font-bold text-base">{name}</span>
        <span className="text-xs ">{items}</span>
      </div>

      {/* Image Section */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={image}
          alt="Food Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default VendorSidebarCard;
