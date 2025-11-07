"use client";
import React, { useState, useMemo, useEffect } from "react";
import SearchField from "../../textFields/squareSearchField";
import Swal from "sweetalert2";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { GetActivateDevice } from "../../../lib/api/vendor/accountApis";

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
    { id: string; number: string; status: boolean }[]
  >([]);
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

  useEffect(() => {
    GetActivateDevice(id)
      .then((data) => {
        setTrackingData(data);
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

  // Filter tracking numbers based on search input
  // Filter tracking numbers based on search input
  const filteredData = useMemo(() => {
    if (!search.trim()) return trackingData;
    return trackingData.filter((val) =>
      val.number.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, trackingData]);

  return (
    <div className="flex gap-x-2 bg-white rounded-2xl shadow-lg p-6 my-6 transition-all">
      {/* LEFT SIDE — Tracking Numbers */}
      <div className="flex-[4] border-r border-gray-200 pr-4">
        <SearchField value={search} setValue={setSearch} />

        <div className="flex flex-col gap-y-3 mt-6">
          <span className="font-semibold text-gray-700">Tracking Log</span>

          {isPublished == true && filteredData.length > 0 ? (
            filteredData.map((val, ind) => (
              <div
                key={ind}
                className="flex justify-between items-center border-b border-gray-100 text-[#8B4DC5] py-2 group"
              >
                <span className="font-medium tracking-wide">{val.number}</span>
                <Copy
                  size={16}
                  className="cursor-pointer text-[#8B4DC5] opacity-80 group-hover:opacity-100 transition-opacity"
                  onClick={() => navigator.clipboard.writeText(val.number)}
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

      {/* RIGHT SIDE — Tracking Updates */}
      <div className="flex-[3] pl-4">
        <label className="text-md font-semibold text-gray-800 mb-2 ml-2 tracking-wide">
          Tracking Updates
        </label>

        <div className="relative rounded-lg py-2 mx-2">
          {/* Scrollable container */}
          <div
            className={`overflow-y-auto pr-3 transition-all duration-500 ease-in-out ${
              expanded ? "max-h-64" : "max-h-48"
            }`}
            style={{ scrollbarWidth: "none" }}
          >
            <div className="relative ml-4 border-l-2 border-[#B86CFF]/50">
              {trackingUpdates.map((val, ind) => (
                <div key={ind} className="relative pl-6 pb-4">
                  {/* Connector line gradient */}
                  {ind !== trackingUpdates.length - 1 && (
                    <div className="absolute left-[-2px] top-3 h-full w-[2px] bg-gradient-to-b from-[#B86CFF]/70 to-transparent"></div>
                  )}

                  {/* Purple circle */}
                  <div className="absolute left-[-9px] top-[6px] w-3 h-3 bg-[#B86CFF] rounded-full shadow-md ring-2 ring-white"></div>

                  {/* Text */}
                  <span className="block font-semibold text-[#333333]">
                    {val.status}
                  </span>
                  <div className="flex flex-wrap gap-x-1 text-[#6B7280] text-sm mt-0.5">
                    <span>{val.location}</span>
                    <span>• {val.date}</span>
                    <span>• {val.time}</span>
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
  );
};

export default TrackingInfoCards;
