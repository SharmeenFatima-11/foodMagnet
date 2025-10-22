"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../../components/card/menu/card";

interface Dish {
  name: string;
  deal: string[];
  calories: string;
  image: string;
}
const Page = () => {
  const [popularDishes, setPopularDishes] = useState<Dish[]>([]);

  // Simulate loading delay for smooth entry
  useEffect(() => {
    setTimeout(() => {
      setPopularDishes([
        {
          name: "The Box Combo",
          deal: [
            "4 Chicken Fingers",
            "Crinkle-Cut Fries",
            "One Cane’s Sauce",
            "Texas Toast",
            "Coleslaw",
            "Regular Fountain Drink/Tea (22 oz.)",
          ],
          calories: "1250 - 1440 Cal",
          image: "/foodImage.svg",
        },
        {
          name: "The Caniac Combo",
          deal: [
            "6 Chicken Fingers",
            "Crinkle-Cut Fries",
            "Two Cane’s Sauce",
            "Texas Toast",
            "Coleslaw",
            "Large Fountain Drink/Tea (32 oz.)",
          ],
          calories: "1500 - 1650 Cal",
          image: "/foodImage.svg",
        },
        {
          name: "The 3 Finger Combo",
          deal: [
            "3 Chicken Fingers",
            "Crinkle-Cut Fries",
            "One Cane’s Sauce",
            "Texas Toast",
            "Regular Fountain Drink/Tea (22 oz.)",
          ],
          calories: "1025 - 1215 Cal",
          image: "/foodImage.svg",
        },
        
      ]);
    }, 500); // half-second delay
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col h-full gap-4 my-6 p-4 bg-white rounded-md shadow-sm border border-gray-200"
    >
      <AnimatePresence mode="wait">
        {!popularDishes || popularDishes.length === 0 ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center py-8 h-full"
          >
            <span className="font-bold text-lg mb-3">Waiting For Menu Details</span>
            <img
              src="/menu.svg"
              alt="Menu"
              className="w-40 h-40 md:w-64 md:h-64 object-contain"
            />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            className="overflow-y-auto flex flex-col gap-y-3 pr-2 scroll-smooth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="font-bold text-lg text-gray-800">Popular Dishes</span>
            {popularDishes.map((val, ind) => (
              <motion.div
                key={ind}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ind * 0.1, duration: 0.3 }}
              >
                <Card
                  name={val.name}
                  items={val.deal}
                  calories={val.calories}
                  image={val.image}
                />
              </motion.div>
            ))}

            <span className="font-bold text-lg text-gray-800">Entrees</span>
            {popularDishes.map((val, ind) => (
              <motion.div
                key={ind}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ind * 0.1, duration: 0.3 }}
              >
                <Card
                  name={val.name}
                  items={val.deal}
                  calories={val.calories}
                  image={val.image}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;
