"use client";
import React, { useRef, useState } from "react";
import TextField from "../../textFields/textField";
import DropDownWithOneOption from "../../dropdown/dropDownWithOneSelection";
import DateField from "../../textFields/calenderField";
import CouponTable from "../../table/couponTable";

interface Coupon {
  code: string;
  status: string;
  expiration: string;
}

const ManualUpgradeCard = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [couponType, setCouponType] = useState<string[]>([]);
  const [couponTypeError, setCouponTypeError] = useState("");
  const [couponTypeDropdown, setCouponTypeDropDown] = useState([
    "Type 1",
    "Type 2",
    "Type 3",
  ]);
  const [expiryDateNumber, setExpiryDateNumber] = useState("");
  const [expiryDateNumberError, setExpiryDateNumberError] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const promoCodeRef = useRef<HTMLInputElement | null>(null);
  const couponTypeRef = useRef<HTMLInputElement | null>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null!);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const handlePromoChange = (value: string) => {
    setPromoCode(value);
    setPromoCodeError(value.length === 0 ? "Please add promo code" : "");
  };

  const handleCouponTypeChange = (value: string[]) => {
    setCouponType(value);
    setCouponTypeError(value.length === 0 ? "Please select coupon type" : "");
  };

  const handleExpiryDateChange = (value: string) => {
    setExpiryDateNumber(value);
    setExpiryDateNumberError(
      value.length === 0 ? "Please add expiry date" : ""
    );
  };

  const resetFields = () => {
    setPromoCode("");
    setPromoCodeError("");
    setCouponType([]);
    setCouponTypeError("");
    setExpiryDateNumber("");
    setExpiryDateNumberError("");
  };

  const handleSubmit = () => {
    console.log("in handle submit")
    // 🧩 Validate all fields before adding
    let valid = true;

    if (!promoCode.trim()) {
      setPromoCodeError("Please add promo code");
      valid = false;
    }

    if (couponType.length === 0) {
      setCouponTypeError("Please select coupon type");
      valid = false;
    }

    if (!expiryDateNumber.trim()) {
      setExpiryDateNumberError("Please add expiry date");
      valid = false;
    }

    if (!valid) return;

    // ✅ Add to coupons list
    const newCoupon: Coupon = {
      code: promoCode,
      status: "Not Used",
      expiration: expiryDateNumber,
    };

    setCoupons((prev) => [...prev, newCoupon]);
    resetFields();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<
      HTMLInputElement | HTMLButtonElement | null
    > | null
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        handleSubmit(); // last field triggers submit
      }
    }
  };

  return (
    <div className="flex flex-col gap-x-2 bg-white rounded-2xl shadow-lg p-6 my-6 transition-all gap-y-2">
      <span className="font-semibold">Manual Upgrade</span>
      <span className="text-[#343A40]">
        When you create a discount code, vendors must apply it themselves by
        upgrading their account in the Food Magnet app. To use the code, the
        vendor goes into the app, selects ‘Upgrade Account,’ and enters the code
        during checkout.
      </span>

      <div className="flex gap-x-6 justify-between">
        <TextField
          text="Create a promo code"
          field={promoCode}
          setField={handlePromoChange}
          placeholder="CSJOAQ"
          type="text"
          error={promoCodeError}
          inputRef={promoCodeRef}
          onKeyDown={(e) => handleKeyDown(e, couponTypeRef)}
        />
        <DropDownWithOneOption
          text="Coupon Type"
          field={couponType}
          options={couponTypeDropdown}
          setField={handleCouponTypeChange}
          placeholder="30 Days Trial"
          error={couponTypeError}
          inputRef={couponTypeRef}
          onKeyDown={(e) => handleKeyDown(e, expiryDateRef)}
        />
        <DateField
          text="Expiration Date"
          field={expiryDateNumber}
          setField={handleExpiryDateChange}
          placeholder="11/12/25"
          type="date"
          error={expiryDateNumberError}
          inputRef={expiryDateRef}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>

      <CouponTable data={coupons} />
    </div>
  );
};

export default ManualUpgradeCard;
