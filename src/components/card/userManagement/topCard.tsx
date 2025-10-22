import React from "react";
import SquareButton from "../../button/squareButton";

interface TopCardProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopCard: React.FC<TopCardProps> = ({ showPopup, setShowPopup }) => {
  const handleClick = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mx-4 sm:mx-10 mt-4 pb-4 mb-2 border-b border-[#E5E5E5]">
      {/* Left section */}
      <div className="flex flex-col text-left w-full sm:w-auto">
        <span className="font-bold text-lg sm:text-xl">Users</span>
        <span className="text-sm sm:text-base">
          Manage your team members and their account permission settings.
        </span>
      </div>

      {/* Right section */}
      <div className="w-full sm:w-auto flex justify-start sm:justify-end">
        <SquareButton text="Add New User" onClick={handleClick} />
      </div>
    </div>
  );
};

export default TopCard;
