"use client";
import React, { useRef, useState } from "react";
import TextField from "../../textFields/textField";
import SquareButton from "../../button/squareButton";

interface VendorSidebarCardProps {
  isPublished: boolean;
}

const DeviceActivationCards: React.FC<VendorSidebarCardProps> = ({
  isPublished,
}) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [serialNumberError, setSerialNumberError] = useState("");
  const [foodMagnetIdNumber, setFoodMagnetIdNumber] = useState("");
  const [foodMagnetIdNumberError, setFoodMagnetIdNumberError] = useState("");
  const [deviceNumber, serDeviceNumber] = useState({
    number: "095",
    status: "Active",
  });
  const [formError, setFormError] = useState("");

  const serialNumberRef = useRef<HTMLInputElement | null>(null);
  const foodMagnetIdRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const handleSerialChange = (value: string) => {
    setSerialNumber(value);
    setSerialNumberError(value.length === 0 ? "Please add serial number" : "");
  };

  const handleFoodMagnetIdChange = (value: string) => {
    setFoodMagnetIdNumber(value);
    setFoodMagnetIdNumberError(
      value.length === 0 ? "Please add food magnet id number" : ""
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<
      HTMLInputElement | HTMLButtonElement | null
    > | null
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  const resetForm = () => {
    setSerialNumber("");
    setSerialNumberError("");
    setFoodMagnetIdNumber("");
    setFoodMagnetIdNumberError("");
  };

  const handleSubmit = () => {
    if (serialNumber.length === 0) {
      setFormError("Please fill out all required fields before submitting.");
      return;
    }
    setFormError("");

    const vendorData = {
      serialNumber,
      foodMagnetIdNumber,
    };

    console.log("Vendor Data:", vendorData);
    resetForm();
  };

  const handleDeactivate = () => {
    console.log("Device deactivated");
  };

  return (
    <div className="flex gap-x-2 items-stretch">
      {/* LEFT CARD */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-4">
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          Device Activation
        </label>
        <div className="flex flex-col gap-y-4 flex-1">
          <TextField
            text="Serial Number"
            field={serialNumber}
            setField={handleSerialChange}
            placeholder="Tracking Number"
            type="text"
            error={serialNumberError}
            inputRef={serialNumberRef}
            onKeyDown={(e) => handleKeyDown(e, foodMagnetIdRef)}
          />
          <TextField
            text="Food Magnet ID Number"
            field={foodMagnetIdNumber}
            setField={handleFoodMagnetIdChange}
            placeholder="0-0-0"
            type="text"
            error={foodMagnetIdNumberError}
            inputRef={foodMagnetIdRef}
            onKeyDown={(e) => handleKeyDown(e, submitRef)}
          />
          {formError && (
            <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded-md">
              {formError}
            </p>
          )}
          <div className="mt-auto mt-4">
            <SquareButton
              text="Activate Device"
              onClick={handleSubmit}
              buttonRef={submitRef}
            />
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-4">
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          Active Devices
        </label>
        <div className="border border-[#DBB6FF] flex-1 rounded-lg mx-2 my-4 flex flex-col">
          <div className="bg-[#DBB6FF] w-full rounded-t-lg p-2">
            <label className="text-md mb-2 ml-2 tracking-wide">ID Number</label>
          </div>
          {isPublished && isPublished == true && (
            <div className="flex justify-between items-center m-2 border-b border-b-[#DFE0EB]">
              <label className="text-md mb-2 ml-2 tracking-wide">
                {deviceNumber.number}
              </label>
              <label
                className={`text-md mb-2 ml-2 tracking-wide cursor-pointer ${
                  deviceNumber.status === "Active"
                    ? "text-[#BC2B4D]"
                    : "text-green-600"
                }`}
                onClick={handleDeactivate}
              >
                {deviceNumber.status == "Active" ? "Deactivate" : "Active"}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceActivationCards;
