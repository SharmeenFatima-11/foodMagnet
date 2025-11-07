"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivateDevice,
  GetActivateDevice,
  DeActivateDevice,
} from "../../../lib/api/vendor/accountApis";
import Swal from "sweetalert2";
import TextField from "../../textFields/textField";
import SquareButton from "../../button/squareButton";

interface VendorSidebarCardProps {
  isPublished: boolean;
  id: number;
}

const DeviceActivationCards: React.FC<VendorSidebarCardProps> = ({
  isPublished,
  id,
}) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [serialNumberError, setSerialNumberError] = useState("");
  const [foodMagnetIdNumber, setFoodMagnetIdNumber] = useState("");
  const [foodMagnetIdNumberError, setFoodMagnetIdNumberError] = useState("");
  const [isPublishedCalled, setIsPublishedCalled] = useState(false);
  const [isDeactivatedCalled, setIsDeactivatedCalled] = useState(false);
  const [deviceNumber, setDeviceNumber] = useState<
    { id: string; number: string; status: boolean }[]
  >([]);

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

    setIsPublishedCalled(true);
    ActivateDevice(serialNumber, foodMagnetIdNumber)
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Device has been activated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        });
        setIsPublishedCalled(false);
        resetForm();
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to activate device.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setIsPublishedCalled(false);
      });
  };

  useEffect(() => {
    GetActivateDevice(id)
      .then((data) => {
        setDeviceNumber(data);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to activate device.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
      });
  }, []);

  const handleDeactivate = (data: any) => {
    setIsDeactivatedCalled(true);
    DeActivateDevice({ foodTruckId: data.id })
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Device has been deactivated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        });
        setIsDeactivatedCalled(false);
        setDeviceNumber([])
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to activate device.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setIsDeactivatedCalled(false);
      });
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
              isTriggered={isPublishedCalled}
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
          {isPublished && isPublished === true && deviceNumber.length > 0 && (
            <>
              {deviceNumber?.map((val, ind) => (
                <div
                  key={ind}
                  className="flex justify-between items-center m-2 border-b border-b-[#DFE0EB]"
                >
                  <label className="text-md mb-2 ml-2 tracking-wide">
                    {val.id}
                  </label>
                  <label
                    className={`text-md mb-2 ml-2 tracking-wide ${
                      isDeactivatedCalled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    } ${
                      val.status === true ? "text-[#BC2B4D]" : "text-green-600"
                    }`}
                    onClick={() => {
                      if (!isDeactivatedCalled) handleDeactivate(val);
                    }}
                  >
                    {val.status === true ? "Deactivate" : ""}
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceActivationCards;
