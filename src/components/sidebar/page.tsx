"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Vendors", href: "/vendor" },
    { name: "GrubGov", href: "/grubgov" },
  ];

  const isActiveLink = (href: string) =>
    (href === "/vendor" &&
      (pathname.startsWith("/vendor") || pathname.startsWith("/profile"))) ||
    pathname === href;

  return (
    <>
      {/* 🟣 Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#441372] text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 🟣 Sidebar for desktop */}
      <div className="hidden md:flex h-screen w-64 bg-[#441372] text-white flex-col justify-between">
        <div>
          <div className="p-6 flex justify-center">
            <img
              src="/FoodMagnetLogo.svg"
              alt="Food Magnet Logo"
              className="w-[120px]"
            />
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center justify-center text-center gap-3 p-3 rounded-l-xl font-medium transition-colors duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActiveLink(item.href)
                    ? "bg-white text-[#441372] shadow-lg text-lg"
                    : "bg-transparent text-white hover:bg-[#3c096c] text-lg"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 🟣 Mobile Sidebar (animated) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim Background */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-[#441372] text-white flex flex-col justify-between z-50 md:hidden shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              <div>
                <div className="p-6 flex justify-center">
                  <img
                    src="/FoodMagnetLogo.svg"
                    alt="Food Magnet Logo"
                    className="w-[120px]"
                  />
                </div>

                <nav className="flex flex-col gap-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-center text-center gap-3 p-3 rounded-l-xl font-medium transition-colors duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isActiveLink(item.href)
                          ? "bg-white text-[#441372] shadow-lg text-lg"
                          : "bg-transparent text-white hover:bg-[#3c096c] text-lg"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
