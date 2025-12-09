"use client";
import React, { useState, useMemo, useEffect } from "react";
import TrackingInfoField from "../../textFields/trackingInfo";
import Swal from "sweetalert2";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import {
  AddTrackingNumber,
  GetTrackingNumber,
} from "../../../lib/api/vendor/accountApis";

interface VendorSidebarCardProps {
  isPublished: boolean;
  id: number;
}

const TrackingInfoCards: React.FC<VendorSidebarCardProps> = ({
  isPublished,
  id,
}) => {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [trackingData, setTrackingData] = useState<
    { id: string; tracking_number: string; status: boolean }[]
  >([]);
  const [trackingAdded, setTrackingAdded] = useState(false);
  const [trackingUpdates] = useState([
    {
      status: "Arrived at Destination",
      location: "Houston, Texas",
      date: "Apr, 19",
      time: "9:31 am",
    },
    {
      status: "In Transit",
      location: "Houston, Texas",
      date: "Apr, 19",
      time: "9:31 am",
    },
    {
      status: "Ship Date",
      location: "Houston, Texas",
      date: "Apr, 19",
      time: "9:31 am",
    },
    {
      status: "Order Processed",
      location: "Houston, Texas",
      date: "Apr, 19",
      time: "9:31 am",
    },
    {
      status: "Order Confirmed",
      location: "Houston, Texas",
      date: "Apr, 18",
      time: "7:42 pm",
    },
    {
      status: "Label Created",
      location: "Houston, Texas",
      date: "Apr, 18",
      time: "7:00 pm",
    },
  ]);

  const submit = async () => {
    console.log("submit");
    AddTrackingNumber({ userId: id.toString(), tracking_number: search })
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Tracking number added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        });
        setSearch("");
        setTrackingAdded((prev) => !prev);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to add tracking number.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
      });
  };

  useEffect(() => {
    GetTrackingNumber(id.toString())
      .then((data) => {
        console.log("data", data);
        setTrackingData(Array.isArray(data) ? data : []);
        // setCoupons(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to get coupons.";
      });
  }, [id, trackingAdded]);

  return (
    <div className=" bg-white rounded-2xl shadow-lg p-6 my-6 transition-all">
      {/* LEFT SIDE — Tracking Numbers */}
      <span className="font-semibold text-gray-700">Tracking Information</span>
      <div className="flex gap-x-2 mt-2">
        <div className="flex-[4] border-r border-gray-200 pr-4">
          <TrackingInfoField
            value={search}
            setValue={setSearch}
            submit={submit}
          />

          <div className="flex flex-col gap-y-3 mt-6">
            <span className="font-semibold text-gray-700">Tracking Log</span>
            <div
              className={`overflow-y-auto pr-3 transition-all duration-500 ease-in-out ${
                expanded ? "max-h-48" : "max-h-32"
              }`}
              style={{ scrollbarWidth: "none" }}
            >
              {isPublished == true && trackingData.length > 0 ? (
                trackingData.map((val, ind) => (
                  <div
                    key={ind}
                    className="flex justify-between items-center border-b border-gray-100 text-[#8B4DC5] py-2 group"
                  >
                    <span className="font-medium tracking-wide">
                      {val.tracking_number}
                    </span>
                    <Copy
                      size={16}
                      className="cursor-pointer text-[#8B4DC5] opacity-80 group-hover:opacity-100 transition-opacity"
                      onClick={() =>
                        navigator.clipboard.writeText(val.tracking_number)
                      }
                    />
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic mt-2">
                  No results found
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Tracking Updates */}
        <div className="flex-[3] pl-4">
          <div className="flex justify-center items-center">
            <label className="text-md font-semibold text-gray-800 mb-2 ml-2 tracking-wide">
              Tracking Updates
            </label>
          </div>

          <div className="relative rounded-lg py-2 mx-2">
            {/* Scrollable container */}
            <div
              className={`overflow-y-auto pr-3 transition-all duration-500 ease-in-out ${
                expanded ? "max-h-64" : "max-h-48"
              }`}
              style={{ scrollbarWidth: "none" }}
            >
              <div className="relative ml-4">
                <div
                  className="absolute left-[-12px] top-0 h-full" // Centered with left: -6px
                  style={{
                    width: "12px",
                    backgroundColor: "#C7A2E8",
                    borderRadius: "6px",
                  }}
                ></div>
                {trackingUpdates.map((val, ind) => (
                  <div key={ind} className="relative pl-8 pb-4">
                    {" "}
                    {/* Increased padding-left to pl-8 */}
                    {/* Circle indicator - centered in the thick border */}
                    <div
                      className={`absolute rounded-full ${
                        ind === 0
                          ? "bg-white border-white" // First/latest - white with purple border
                          : "bg-[#B86CFF] border-[#B86CFF]" // Past events - purple with white border
                      }`}
                      style={{
                        left: "-6px", // Half of border width (12px/2 = 6px) to center
                        top: "6px",
                        width: "10px",
                        height: "10px",
                        borderWidth: "3px",
                        transform: "translateX(-50%)",
                      }}
                    ></div>
                    {/* Status text - bold for current/latest */}
                    <span
                      className={`block text-md font-semibold ${
                        ind === 0 ? "text-[#333333]" : "text-[#333333]"
                      }`}
                    >
                      {val.status}
                    </span>
                    {/* Location and time details */}
                    <div className="flex items-center gap-x-1 text-[#999999] text-sm mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                      <span className="truncate">{val.location}</span>
                      <span>•</span>
                      <span className="truncate">{val.date}</span>
                      <span>•</span>
                      <span className="truncate">{val.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* See More / See Less Button */}
            <div
              className="text-[#8B4DC5] font-medium text-sm flex items-center justify-center mt-3 cursor-pointer hover:opacity-80 transition-all"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  See Less Updates <ChevronUp size={14} className="ml-1" />
                </>
              ) : (
                <>
                  See {trackingUpdates.length - 3} More Updates{" "}
                  <ChevronDown size={14} className="ml-1" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingInfoCards;
