import React from "react";

const LoginLeft = () => {
  return (
    <div className="flex flex-col justify-center items-center flex-[5] h-full bg-[#3c096c] px-3">
      <div className="flex flex-col items-center text-center">
        <img
          className="w-[70%] min-w-[350px] mx-auto"
          src="FoodMagnetLogo.svg"
          alt="Food Magnet Logo"
        />
        <h2 className="font-medium text-2xl leading-[37px] text-white mt-4">
          Connecting Good Food
          <br />
          To Good People
        </h2>
      </div>
    </div>
  );
};

export default LoginLeft;
