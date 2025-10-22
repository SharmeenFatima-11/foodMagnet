"use client";
import React, { useEffect, useState } from "react";
import AboutCard from "../../../components/card/details/aboutCard";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  UtensilsCrossed,
  CreditCard,
  Building,
  PlugZap,
  CalendarDays,
} from "lucide-react";

interface Vendor {
  id: number;
  firstName: string;
  lastName: string;
  businessName: string;
  activeStatus: boolean;
  city: string;
  state: string;
  subscriptionTitle: string;
  permitExpiration: string;
}

interface InfoCard {
  name: string;
  icon: React.ReactNode;
  data: string;
}

const Page = () => {
  const [vendorData] = useState({
    image: "https://i.pravatar.cc/100",
    email: "abc@gmail.com",
    phoneNumber: { code: "+92", number: 3144444 },
    businessHours: [
      { day: "Monday", hours: "1 - 2" },
      { day: "Tuesday", hours: "1 - 2" },
      { day: "Wednesday", hours: "1 - 2" },
      { day: "Thursday", hours: "1 - 2" },
      { day: "Friday", hours: "1 - 2" },
    ],
  });

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<InfoCard[]>([]);

  const [about] = useState(
    "This is a delicious food truck. You won’t find a better chef in Dallas..."
  );
  const [cuisines] = useState(["Thai", "Asian", "Fusion"]);
  const [diningArea] = useState("There is outdoor seating available");
  const [paymentMethod] = useState(["AMEX", "Debit", "Visa", "Apple Pay"]);
  const [availability] = useState("Available for events only");
  const [electricalRequirements] = useState("No electrical requirements");

  // ✅ 1st effect: load vendor from sessionStorage
  useEffect(() => {
    const storedVendorString = sessionStorage.getItem("selectedVendor");

    if (storedVendorString) {
      try {
        const parsedVendor = JSON.parse(storedVendorString);
        parsedVendor.phoneNumber = { code: "+92", number: 314444 };
        setVendor(parsedVendor);
      } catch (error) {
        console.error("Failed to parse selectedVendor:", error);
      }
    }

    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ 2nd effect: build cards when vendor changes
  useEffect(() => {
    if (!vendor) return;

    setCards([
      { name: "Cuisine", icon: <UtensilsCrossed size={18} />, data: cuisines.join(", ") },
      { name: "Location", icon: <MapPin size={18} />, data: `${vendor.city} ${vendor.state}` },
      {
        name: "Business Hours",
        icon: <Clock size={18} />,
        data: vendorData.businessHours.map((b) => `${b.day}: ${b.hours}`).join(", "),
      },
      {
        name: "Phone",
        icon: <Phone size={18} />,
        data: `${vendorData.phoneNumber?.code ?? ""} ${vendorData.phoneNumber?.number ?? ""}`,
      },
      { name: "Dining Areas", icon: <Building size={18} />, data: diningArea },
      { name: "Payment Method", icon: <CreditCard size={18} />, data: paymentMethod.join(", ") },
      { name: "Availability", icon: <CalendarDays size={18} />, data: availability },
      { name: "Electrical Requirement", icon: <PlugZap size={18} />, data: electricalRequirements },
    ]);
  }, [vendor]);

  // ✅ Return UI conditionally inside JSX, not before hooks
  return (
    <motion.div
      className="flex flex-col gap-6 my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg animate-pulse">
          Loading vendor data...
        </div>
      ) : !vendor ? (
        <div className="flex justify-center items-center h-[70vh] text-gray-500">
          No vendor data found.
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AboutCard text={about} />
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 max-h-[510px] overflow-y-auto scroll-smooth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {cards?.map((card, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-start gap-3 py-3 border-b last:border-none border-gray-100"
              >
                <div className="text-gray-700 flex-shrink-0">{card.icon}</div>
                <div className="flex flex-col gap-y-1">
                  <p className="font-semibold text-sm sm:text-base text-gray-900">{card.name}</p>
                  <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed break-words">
                    {card.data}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Page;
