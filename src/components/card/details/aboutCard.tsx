"use client";
import React, { useState } from "react";

interface AboutCardProps {
  text: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const isLong = text.length > 250;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        About the Business
      </h3>

      <div
        className={`text-sm leading-relaxed text-gray-700 transition-all duration-300 ${
          isExpanded
            ? "max-h-18 overflow-y-auto pr-2"
            : "max-h-15 overflow-hidden"
        }`}
      >
        {text}
      </div>

      {isLong && (
        <div className="flex justify-end">
          <button
            onClick={toggleExpand}
            className="text-purple-600 text-sm font-medium mt-2 hover:underline cursor-pointer"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutCard;
