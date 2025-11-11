"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../../components/card/menu/card";
import { GetPopularItems, GetItems } from "../../../lib/api/vendor/menuApis";

interface Dish {
  name: string;
  description: string;
  image_url: string;
  banner_url: string;
}

interface ItemWithCategory {
  name: string;
  MenuItems: Dish[];
}

const Page = () => {
  const [popularDishes, setPopularDishes] = useState<Dish[]>([]);
  const [itemsWithCategory, setItemsWithCategory] = useState<
    ItemWithCategory[]
  >([]);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedVendor = sessionStorage.getItem("selectedVendor");
    if (storedVendor) {
      const parsedVendor = JSON.parse(storedVendor);
      if (!parsedVendor) return;
      if (parsedVendor?.id != null) {
        setVendorId(parsedVendor.id);
        GetPopularItems(parsedVendor.id.toString())
          .then((res) => {
            setPopularDishes(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching vendor details:", error.message);
            setLoading(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (!vendorId) return;
    GetItems(vendorId.toString())
      .then((res) => {
        console.log("Data fetched successfully:", res);
        setItemsWithCategory(res.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error.message);
      });
  }, [vendorId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // 🟣 Full remaining height minus header area
      className="flex flex-col flex-grow min-h-0 overflow-hidden bg-white rounded-md shadow-sm border border-gray-200"
    >
      <AnimatePresence mode="wait">
        {popularDishes.length == 0 &&  itemsWithCategory.length == 0? (
          // 🟢 Loading state
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center py-10 flex-grow"
          >
            <span className="font-bold text-lg mb-3">
              Waiting For Menu Details
            </span>
            <img
              src="/menu.svg"
              alt="Menu"
              className="w-40 h-40 md:w-64 md:h-64 object-contain"
            />
          </motion.div>
        ) : (
          // 🟣 Scrollable content container
          <motion.div
            key="menu"
            className="overflow-y-auto flex flex-col gap-y-3 scroll-smooth px-4 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              height: "calc(100vh - 165px)",
            }}
          >
            <span className="font-bold text-lg text-gray-800">
              Popular Dishes
            </span>
            {popularDishes.map((val, ind) => (
              <motion.div
                key={ind}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ind * 0.1, duration: 0.3 }}
              >
                <Card
                  name={val.name}
                  items={val.description}
                  image={val.image_url ? val.image_url : val.banner_url}
                />
              </motion.div>
            ))}
            {itemsWithCategory.map((category, catInd) => (
              <div key={catInd}>
                <div className="mb-6">
                  <span className="font-bold text-lg text-gray-800">
                  {category.name}
                </span>
                </div>
                
                {category &&category.MenuItems && category.MenuItems.length > 0 && category.MenuItems.map((val, ind) => (
                  <motion.div
                    key={`entree-${ind}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ind * 0.1, duration: 0.3 }}
                  >
                    <Card
                      name={val.name}
                      items={val.description}
                      image={val.image_url ? val.image_url : val.banner_url}
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;
