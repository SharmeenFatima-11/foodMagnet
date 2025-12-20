"use client";
import React, { useEffect, useRef, useState } from "react";
import TextField from "../../textFields/textField";
import DropDownWithOneOption from "../../dropdown/dropDownWithOneSelection";
import DateField from "../../textFields/calenderField";
import CouponTable from "../../table/couponTable";
import WhiteSquareButton from "../../button/whiteSquareButton";
import {
  GetCouponsAndTrials,
  CreateCoupon,
  GetVendorCoupons,
} from "../../../lib/api/vendor/accountApis";
import Swal from "sweetalert2";

export interface Coupon {
  promo_code: string; // or number if you prefer, but keep it consistent
  is_used: boolean;
  expiry_date: string | Date;
}

interface VendorSidebarCardProps {
  id: number;
}

const ManualUpgradeCard: React.FC<VendorSidebarCardProps> = ({ id }) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [couponType, setCouponType] = useState<string[]>([]);
  const [couponTypeError, setCouponTypeError] = useState("");
  const [couponTypeDropdown, setCouponTypeDropDown] = useState<any[]>([]);
  const [expiryDateNumber, setExpiryDateNumber] = useState<string | Date>("");

  const [expiryDateNumberError, setExpiryDateNumberError] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const promoCodeRef = useRef<HTMLInputElement | null>(null);
  const couponTypeRef = useRef<HTMLInputElement | null>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null!);
  const [isPublishedCalled, setIsPublishedCalled] = useState(false);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const handlePromoChange = (value: string) => {
    setPromoCode(value);
    setPromoCodeError(value.length === 0 ? "Please add promo code" : "");
  };

  const handleCouponTypeChange = (value: string[]) => {
    setCouponType(value);
    setCouponTypeError(value.length === 0 ? "Please select coupon type" : "");
  };

  const handleExpiryDateChange = (value: string | Date) => {
    setExpiryDateNumber(value);
    setExpiryDateNumberError(value == "" ? "Please add expiry date" : "");
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
    let valid = true;

    if (!promoCode.trim()) {
      setPromoCodeError("Please add promo code");
      valid = false;
    }

    if (couponType.length === 0) {
      setCouponTypeError("Please select coupon type");
      valid = false;
    }

    if (!expiryDateNumber) {
      setExpiryDateNumberError("Please add expiry date");
      valid = false;
    }

    if (!valid) return;
    // Find the matching coupon
    console.log("couponTypeDropdown", couponTypeDropdown)
    console.log("couponType[0]", couponType[0])
    const matchedCoupon: any = couponTypeDropdown.find(
      (item: any) => item.id === couponType[0]
    );
    console.log("coupon_type", matchedCoupon);

    // ✅ Add to coupons list
    const newCoupon: Coupon = {
      promo_code: promoCode,
      is_used: false,
      expiry_date: expiryDateNumber,
    };
    setIsPublishedCalled(true);

    CreateCoupon({
      userId: id,
      promo_code: promoCode,
      coupon_type: matchedCoupon.name,
      expiry_date: expiryDateNumber,
      is_trial: matchedCoupon.is_trial,
      is_coupon: matchedCoupon.is_coupon,
      couponId: matchedCoupon.id,
    })
      .then((data) => {
        if (coupons.length == 0) {
          setCoupons([newCoupon]);
        } else {
          setCoupons((prev) => [...prev, newCoupon]);
        }
        resetFields();
        setIsPublishedCalled(false);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to create coupon.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setIsPublishedCalled(false);
      });
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
        // handleSubmit(); // last field triggers submit
      }
    }
  };

  useEffect(() => {
    GetCouponsAndTrials()
      .then((data) => {
        console.log("data", data);
        setCouponTypeDropDown(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to get coupons and trials.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
      });
  }, [id]);

  useEffect(() => {
    GetVendorCoupons(id)
      .then((data) => {
        console.log("data", data);
        setCoupons(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to get coupons.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
      });
  }, [id]);

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
          placeholder=""
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
      <div className="my-3">
        <WhiteSquareButton
          text="Create Promo Code"
          onClick={handleSubmit}
          isTriggered={isPublishedCalled}
        />
      </div>

      <CouponTable data={coupons} />
    </div>
  );
};

export default ManualUpgradeCard;
