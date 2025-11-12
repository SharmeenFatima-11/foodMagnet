"use client";
import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { GetNotifications } from "@/lib/api/notification/notification";
import Card from "../card/notification/card";

interface AddVendorFormProps {
  showModel: boolean;
  setModel: (value: boolean) => void;
}

const AddVendorForm: React.FC<AddVendorFormProps> = ({
  showModel,
  setModel,
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  useEffect(() => {
    GetNotifications()
      .then((data) => {
        setNotifications(data.userNotifications);
      })
      .catch((error) => {
        console.error("notification error:", error.message);
      });
  }, []);
  return (
    <motion.div
      className="fixed top-0 right-0 w-[420px] h-full bg-white shadow-2xl z-50 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <button onClick={() => setModel(false)}>
          <XMarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm px-6 py-2">(5) Unread</span>

        <button
          className="text-sm px-6 py-2 hover:text-gray-600 cursor-pointer"
          onClick={() => {
            // Your dismiss all logic here
            console.log("Dismiss all clicked");
          }}
        >
          Dismiss All
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <img
            src="/notifications.svg"
            alt="Notification"
            className="w-50 h-50 md:w-64 md:h-64 object-contain"
          />
          <p className="font-semibold text-[#9FA2B4] text-lg my-6">
            You Currently Have No Notifications
          </p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-6">
          {notifications.map((notification, index) => (
            <div key={index}>
              <Card notification={notification} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AddVendorForm;
