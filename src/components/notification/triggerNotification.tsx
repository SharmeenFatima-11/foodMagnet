"use client";

import React, { useEffect, useState } from "react";
import { GetUnReadNotifications } from "@/lib/api/notification/notification";
import { useAdmin } from "@/context/adminContext";

interface NotificationType {
  title: string;
  messageContent: string;
  createdAt: string;
  messageType: string;
  read: boolean;
  userId: string;
}

const DesktopNotification: React.FC = () => {
  const { setNotificationCount } = useAdmin();
  const [permission, setPermission] = useState<string>("default");
  const [shownNotificationIds, setShownNotificationIds] = useState<Set<string>>(
    new Set()
  );

  // Function to fetch unread notifications and send them
  const fetchAndNotify = async () => {
    try {
      const data = await GetUnReadNotifications();
      const unread: NotificationType[] = data.userNotifications
        .filter((n: NotificationType) => !n.read)
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ); // newest first

      if (unread.length === 0) return;
      setNotificationCount(unread.length);

      if (!("Notification" in window)) {
        console.warn("This browser does not support desktop notifications.");
        return;
      }

      // Request permission if not granted
      if (Notification.permission !== "granted") {
        const result = await Notification.requestPermission();
        setPermission(result);
        if (result !== "granted") return;
      } else {
        setPermission(Notification.permission);
      }

      // Send desktop notifications only for **new notifications not shown before**
      unread.forEach((notif) => {
        if (shownNotificationIds.has(notif.createdAt)) return; // skip if already shown

        const notification = new Notification(notif.title || "New Notification", {
          body: notif.messageContent || "You have a new message.",
          icon: "/notification-icon.png",
        });

        notification.onclick = () => {
          window.open("/notifications", "_blank");
        };

        // Mark as shown
        setShownNotificationIds((prev) => new Set(prev).add(notif.createdAt));
      });
    } catch (error: any) {
      console.error("notification error:", error.message);
    }
  };

  // Fetch notifications immediately on mount
  useEffect(() => {
    fetchAndNotify();

    // Set interval to check every 60 seconds
    const interval = setInterval(fetchAndNotify, 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [shownNotificationIds]);

  return null; // no UI needed
};

export default DesktopNotification;
