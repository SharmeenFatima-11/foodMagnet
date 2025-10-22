"use client";
import React, { useState, useRef } from "react";
import DonutLogo from "../../components/donutLogo/DonutLogo";
import PasswordField from "../../components/textFields/passwordField";
import Button from "../../components/button/button";
import { useRouter } from "next/navigation";

const Page = () => {

      const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);

  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleConfirmPasswordChange = (val: string) => {
    setConfirmPassword(val);
    if (confirmPasswordError) setConfirmPasswordError("");
    if (apiError) setApiError("");
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError("");
    if (apiError) setApiError("");
  };

  const handleSubmit = (value: string) => {
    setConfirmPasswordError("");
    setPasswordError("");
    setApiError("");
    let hasError = false;

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("ConfirmPassword is required");
      hasError = true;
      confirmPasswordRef.current?.focus();
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      if (!hasError) passwordRef.current?.focus();
      hasError = true;
    }

    if (
      password.trim() &&
      confirmPassword.trim() &&
      password !== confirmPassword
    ) {
      setConfirmPasswordError("Passwords do not match");
      if (!hasError) confirmPasswordRef.current?.focus();
      hasError = true;
    }

    if (hasError) return;

    console.log("Login button clicked:", value);
    console.log("ConfirmPassword:", confirmPassword);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
    router.push("/create-password-confirmation");
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
            <h3 className="text-2xl font-bold mb-2">Create A New Account</h3>
            <p className="text-base font-normal leading-relaxed">
              Set a secure password to protect <br /> your account.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-y-4 w-full max-w-md mt-6">
          <PasswordField
            text="Create Password"
            field={password}
            setField={handlePasswordChange}
            placeholder=""
            type="password"
            error={passwordError}
            inputRef={passwordRef}
            onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
          />

          <PasswordField
            text="Confirm Password"
            field={confirmPassword}
            setField={handleConfirmPasswordChange}
            placeholder=""
            type="password"
            error={confirmPasswordError}
            inputRef={confirmPasswordRef}
            onKeyDown={(e) => handleKeyDown(e, buttonRef)}
          />

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <div className="mt-6">
            <Button
              text="Update Password"
              onClick={handleSubmit}
              buttonRef={buttonRef}
            />
          </div>
        </div>
      </div>
  );
};

export default Page;
