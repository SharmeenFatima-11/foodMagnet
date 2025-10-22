"use client";
import React, { useRef } from "react";
import DonutLogo from "../../components/donutLogo/DonutLogo";
import Button from "../../components/button/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (value: string) => {
    router.push("/login");
  };

  return (
      <div className="w-full flex flex-col items-center bg-gray-50 p-6 md:p-10">
        <div className="flex flex-col items-center text-center mt-16">
          <DonutLogo />
          <div className="flex flex-col items-center gap-y-2 mt-2">
            <h3 className="text-2xl font-bold mb-2">Reset Link Sent</h3>
            <p className="text-base font-normal leading-relaxed">
              We’ve sent a link to you email. Click the link <br /> to reset
              your password.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-y-4 w-full max-w-md mt-10">
          <img
            className="w-[50%] min-w-[150px] mx-auto"
            src="Padlock.svg"
            alt="Padlock"
          />
          <div className="mt-16">
            <Button
              text="Back To Login"
              onClick={handleSubmit}
              buttonRef={buttonRef}
            />
          </div>
        </div>
      </div>
  );
};

export default Page;
