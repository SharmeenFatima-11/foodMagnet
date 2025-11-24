"use client";
import React, { useEffect, useState } from "react";
import AboutCard from "../../../components/card/details/aboutCard";
import { motion } from "framer-motion";
import { GetVendorDetails } from "../../../lib/api/vendor/vendorApi";
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
  businessAddress: string;
  subscriptionTitle: string;
  permitExpiration: string;
}

interface InfoCard {
  name: string;
  icon: React.ReactNode;
  data: string;
}

const Page = () => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<InfoCard[]>([]);

  const [about, setAbout] = useState("");

  useEffect(() => {
    setLoading(true);
    const storedVendorString = sessionStorage.getItem("selectedVendor");

    if (storedVendorString) {
      const parsedVendor = JSON.parse(storedVendorString);
      if (!parsedVendor) return;
      setVendor(parsedVendor);
      if (parsedVendor?.id != null) {
        GetVendorDetails(parsedVendor.id.toString())
          .then((res) => {
            setAbout(
              res.foodTruckData.description || "No description available."
            );
            setCards([
              {
                name: "Cuisine",
                icon: <UtensilsCrossed size={18} />,
                data: res.foodTruckData.foodCategory,
              },
              {
                name: "Location",
                icon: <MapPin size={18} />,
                data: res.foodTruckData.location,
              }, 
              {
                name: "Business Hours",
                icon: <Clock size={18} />,
                data:
                  res?.foodTruckData &&
                  res?.foodTruckData?.businessHours.length > 0
                    ? res?.foodTruckData?.businessHours
                        .map(
                          (b: { day: string; hours: string }) =>
                            `${b.day}: ${b.hours}`
                        )
                        .join(", ")
                    : "Not specified",
              },
              {
                name: "Business Phone Number",
                icon: <Phone size={18} />,
                data: res.foodTruckData.businessPhoneNumber,
              },
              {
                name: "Dining Areas",
                icon: <Building size={18} />,
                data: res.foodTruckData.hasSeating
                  ? "There is outdoor seating available"
                  : "No seating available",
              },
              {
                name: "Payment Method",
                icon: <CreditCard size={18} />,
                data: res.foodTruckData.paymentOptions,
              },
              {
                name: "Availability",
                icon: <CalendarDays size={18} />,
                data: `Available for ${res.foodTruckData.availability} only`,
              },
              {
                name: "Electrical Requirement",
                icon: <PlugZap size={18} />,
                data: res.foodTruckData.hasGenerator
                  ? "Generator is available"
                  : "No electrical requirements",
              },
            ]);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching vendor details:", error.message);
            setLoading(false);
          });
      }
    }
  }, []);

  // ✅ Return UI conditionally inside JSX, not before hooks
  return (
    <motion.div
      className="flex flex-col gap-6 my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        height: "calc(100vh - 200px)",
      }}
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
                  <p className="font-semibold text-sm sm:text-base text-gray-900">
                    {card.name}
                  </p>
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
