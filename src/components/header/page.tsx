"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShowNotification from "../form/notifications";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState("/logo.svg");
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
     let userData = localStorage.getItem("userData");
     let parsedData = userData ? JSON.parse(userData) : null;
     console.log("parsedData in header:", parsedData);
     if (parsedData) {
       setName(parsedData.username || "Admin");
     }
  }, []);
  // Compute title
  const title = useMemo(() => {
    if (pathname.includes("vendor")) return "Vendors";
    if (pathname.includes("grubgov")) return "GrubGov";
    if (pathname.includes("profile")) return "User Management";
    return "Header";
  }, [pathname]);

  // Common transition config
  const smoothTransition = {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1] as any,
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={smoothTransition}
      className={`
        flex justify-between items-center bg-white shadow-sm 
        px-4 md:px-6 py-4 border-b border-gray-200 relative
        md:pl-4 pl-16    /* 🟣 Add left margin on small screens */
      `}
    >
      {/* Left: Page Title */}
      <motion.h1
        key={title}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-lg sm:text-xl font-semibold text-[#441372]"
      >
        {title}
      </motion.h1>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        {/* Bell Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
          className="relative cursor-pointer"
          onClick={() => setShowNotificationModal(true)}
        >
          <Bell className="w-6 h-6 text-[#441372]" />
          {/* <motion.span
            layout
            className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
          /> */}
        </motion.div>

        {/* User Avatar + Dropdown */}
        <div className="relative">
          <motion.div
            className="flex items-center gap-3 cursor-pointer select-none transition-all duration-300 hover:opacity-80"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen((prev) => !prev)}
          >
            <motion.img
              key={image}
              src={image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={smoothTransition}
            />
            <motion.span
              key={name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={smoothTransition}
              className="text-[#441372] font-medium hidden sm:inline"
            >
              {name}
            </motion.span>
          </motion.div>

          {/* Animated Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 backdrop-blur-md"
              >
                {/* User Info */}
                <motion.div
                  className="p-4 text-center border-b border-gray-200"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.img
                    src={image}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full mx-auto mb-2 border border-gray-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.h2
                    className="text-sm font-semibold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.25 }}
                  >
                    {name}
                  </motion.h2>
                  <motion.p
                    className="text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    Admin
                  </motion.p>
                </motion.div>

                {/* Menu Options */}
                <motion.div
                  className="flex flex-col py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <button
                    className="flex items-center justify-start gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => {
                      setOpen(false);
                      router.push("/profile");
                    }}
                  >
                    User Management
                  </button>

                  <button
                    className="flex items-center justify-start gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => {
                      setOpen(false);
                      const credentials = localStorage.getItem("credentials");

                      localStorage.clear();
                      if (credentials) {
                        localStorage.setItem("credentials", credentials);
                      }
                      router.push("/login");
                    }}
                  >
                    Logout
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🧩 show Notification Modal */}
      <AnimatePresence>
        {showNotificationModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotificationModal(false)}
            />
            <ShowNotification
              showModel={showNotificationModal}
              setModel={setShowNotificationModal}
            />
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
