"use client";
import React, { useState, useRef } from "react";
import DonutLogo from "../../components/donutLogo/DonutLogo";
import TextField from "../../components/textFields/textField";
import Button from "../../components/button/button";
import { useRouter } from "next/navigation";
import { ResetPassword } from "../../lib/api/authApi";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const emailRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError("");
    if (apiError) setApiError("");
  };

  const handleSubmit = (value: string) => {
    setEmailError("");
    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
      emailRef.current?.focus();
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      hasError = true;
      emailRef.current?.focus();
    }

    if (hasError) return;

    ResetPassword({ email, isRegistrationEmail: false })
      .then((data) => {
        router.push("/forget-password-confirmation");
      })
      .catch((error) => {
        console.log("error", error)
        setEmailError(error.message ? error.message : "Api Failed")
        // setApiError(error.message ? error.message : "Api Failed");
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
      if (nextRef?.current) {
        nextRef.current.focus();
      } else {
        handleSubmit("Log In");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 p-6 md:p-10">
      <div className="flex flex-col items-center text-center mt-16">
        <DonutLogo />
        <div className="flex flex-col items-center gap-y-2 mt-2">
          <h3 className="text-2xl font-bold mb-2">Reset Password</h3>
          <p className="text-base font-normal leading-relaxed">
            Enter your email address and we’ll send you <br /> a link to create
            a new password.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-y-4 w-full max-w-md mt-10">
        <TextField
          text="Email Address"
          field={email}
          setField={handleEmailChange}
          placeholder=""
          type="email"
          error={emailError}
          inputRef={emailRef}
          onKeyDown={(e) => handleKeyDown(e, buttonRef)}
        />

        <div className="mt-16">
          <Button
            text="Reset Password"
            onClick={handleSubmit}
            buttonRef={buttonRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
