import React from "react";
import { AlertTriangle, Bell, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/adminContext";

type MessageType =
  | "alert"
  | "danger"
  | "expiring_soon"
  | "permit_expired"
  | "shipping";

interface Notification {
  title: string;
  messageContent: string;
  createdAt: Date | string;
  messageType: MessageType; // <-- narrow type here
  read: boolean;
  userId: string;

}

const Card = ({ notification, setModel }: { notification: Notification , setModel: (value: boolean) => void}) => {
  const { title, messageContent, createdAt, messageType, read, userId } =
    notification;
  const router = useRouter();
  const {setVendorId} = useAdmin()

  // Format date like "3 days ago"
  const formattedDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "";

  const typeConfig: Record<MessageType, { icon: React.ReactElement }> = {
    alert: {
      icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
    },
    danger: {
      icon: <AlertTriangle className="text-red-500 w-6 h-6" />,
    },
    expiring_soon: {
      icon: <Clock className="text-[#3C096C] w-6 h-6" />,
    },
    permit_expired: {
      icon: <Bell className="text-[#3C096C] w-6 h-6" />,
    },
    shipping: {
      icon: (
        <div className="w-7 h-7 flex items-center justify-center">
          <img
            src="/shipping.svg"
            alt="Shipping"
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
  };

  // Now TypeScript knows this is safe
  const { icon } = typeConfig[messageType];

  return (
    <div
      className={`flex border rounded-md my-3 p-3 ${
        title == "Review Profile" ? "cursor-pointer" : ""
      }`}
      onClick={() => {
        if (title == "Review Profile") {
          router.push(`/vendor/account`);
          sessionStorage.setItem(
            "selectedVendor",
            JSON.stringify({ id: userId })
          );
          setModel(false)
          setVendorId(userId)
        }
      }}
    >
      {/* Left icon */}
      <div>{icon}</div>

      {/* Content area */}
      <div className="flex flex-col px-3 flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">
            {title ? title : messageType}
          </span>
          {!read && <div className="h-3 w-3 rounded-full bg-[#8B4DC4]"></div>}
        </div>

        <span className="text-[#000000] text-sm">{messageContent}</span>

        {/* Bottom-right date */}
        <div className="flex justify-end mt-2">
          <span className="text-xs">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
