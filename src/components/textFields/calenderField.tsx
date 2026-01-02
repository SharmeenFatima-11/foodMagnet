"use client";
import React, { useRef, useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";

interface TextFieldProps {
  text: string;
  field: string | Date;
  setField: (value: string | Date) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement>; // must be a RefObject for focus tracking
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  text,
  field,
  setField,
  placeholder = "",
  type = "text",
  error = "",
  inputRef,
  onKeyDown,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [pendingEnter, setPendingEnter] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputLocalRef = useRef<HTMLInputElement>(null);
  const isDateField = type === "date";

  //   const handleDateChange = (date: Date | null) => {
  //   if (date) {
  //     const formatted = date.toISOString().split("T")[0];
  //     setField(formatted);

  //     // Immediately close calendar for smooth UX
  //     setTimeout(() => setShowCalendar(false), 120);

  //     // ✅ Trigger Enter behavior manually (always, even if same date)
  //     if (onKeyDown) {
  //       const fakeEvent = {
  //         key: "Enter",
  //         preventDefault: () => {},
  //       } as React.KeyboardEvent<HTMLInputElement>;

  //       // Run slightly after React finishes updating state
  //       setTimeout(() => onKeyDown(fakeEvent), 150);
  //     }
  //   } else {
  //     setField("");
  //   }
  // };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      // const formatted = date.toISOString().split("T")[0];
      console.log("date", date);
      setField(date);

      // Close calendar smoothly
      setTimeout(() => setShowCalendar(false), 120);

      // Mark that we need to trigger Enter *after state updates*
      setPendingEnter(true);
    } else {
      setField("");
    }
  };

  // 🧩 This effect ensures Enter triggers after field updates
  useEffect(() => {
    if (pendingEnter && onKeyDown) {
      const fakeEvent = {
        key: "Enter",
        preventDefault: () => {},
      } as React.KeyboardEvent<HTMLInputElement>;

      // Run immediately after React has committed the new field value
      requestAnimationFrame(() => {
        onKeyDown(fakeEvent);
        setPendingEnter(false);
      });
    }
  }, [pendingEnter, onKeyDown]);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCalendar((prev) => !prev);
  };

  const handleFocus = () => {
    setShowCalendar(true);
  };

  // ✅ Close when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !inputLocalRef.current?.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  // ✅ Automatically open when inputRef is focused, close otherwise
  useEffect(() => {
    if (inputRef?.current) {
      const handleFocus = () => setShowCalendar(true);
      const handleBlur = () => setShowCalendar(false);
      const el = inputRef.current;

      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);

      return () => {
        el.removeEventListener("focus", handleFocus);
        el.removeEventListener("blur", handleBlur);
      };
    }
  }, [inputRef]);

  return (
    <div className="w-full flex flex-col relative overflow-visible">
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          {text}
        </label>
      )}

      <div
        className={`relative rounded-xl border-2 transition-all duration-300 ${
          error
            ? "border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
            : "border-gray-200 hover:shadow-sm"
        }`}
      >
        {isDateField ? (
          <div className="relative overflow-visible" ref={calendarRef}>
            <input
              type="text"
              ref={(el) => {
                inputLocalRef.current = el;
                if (inputRef)
                  (
                    inputRef as React.MutableRefObject<HTMLInputElement | null>
                  ).current = el;
              }}
              value={
                field instanceof Date
                  ? field.toLocaleDateString("en-CA") // YYYY-MM-DD
                  : field
              }
              readOnly
              placeholder={placeholder}
              onFocus={handleFocus}
              className="w-full px-4 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400 
              font-mono tracking-wide cursor-pointer outline-none focus:outline-none pr-12"
            />

            {field && (
              <X
                size={18}
                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer transition-all"
                onClick={() => setField("")}
              />
            )}

            <Calendar
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8B4DC5] cursor-pointer transition-all"
              onClick={handleIconClick}
            />

            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                    transition: {
                      duration: 0.25,
                      ease: "easeInOut",
                    },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-50 bottom-full mb-2 left-0 bg-white border border-gray-200 
  rounded-xl shadow-2xl overflow-hidden max-w-[calc(100vw-32px)] sm:w-auto"
                  style={{ transform: "translateX(-20px)" }} // Adjust horizontal position if needed
                >
                  <DatePicker
                    selected={field ? new Date(field) : null}
                    onChange={handleDateChange}
                    inline
                    minDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Select date"
                    calendarClassName="bg-white rounded-xl p-2"
                    renderCustomHeader={({
                      date,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div className="flex items-center justify-between px-3 py-2 mb-1 border-b border-gray-200">
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className="p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <span className="text-md font-semibold text-gray-800">
                          {date.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          className="p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    dayClassName={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isSelected =
                        field &&
                        date.toDateString() === new Date(field).toDateString();
                      const isDisabled = date < today;

                      return `m-1 rounded-lg transition-colors duration-200 ${
                        isSelected
                          ? "bg-[#8B4DC5] text-white hover:bg-[#7a3db4]"
                          : isDisabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:bg-purple-100"
                      }`;
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <input
            type={type}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={
              field instanceof Date ? field.toISOString().split("T")[0] : field
            }
            onChange={(e) => setField(e.target.value)}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className="w-full px-4 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400 font-mono tracking-wide outline-none focus:outline-none"
          />
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default TextField;
