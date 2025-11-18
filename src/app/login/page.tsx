"use client";
import React, { useState, useRef, useEffect } from "react";
import DonutLogo from "../../components/donutLogo/DonutLogo";
import TextField from "../../components/textFields/textField";
import PasswordField from "../../components/textFields/passwordField";
import Button from "../../components/button/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Login } from "../../lib/api/authApi";

const Page = () => {
  const router = useRouter();
  // const [email, setEmail] = useState<string>("adminuser@foodmagnet.app");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [password, setPassword] = useState<string>("6glrX^NP*@pWKvI");
  const [passwordError, setPasswordError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Check if userData exists in localStorage
    const userDataString = localStorage.getItem("userData");
    const rememberMe = localStorage.getItem("rememberMe");
    if (userDataString && rememberMe) {
      // Optionally, you can parse and check refreshToken or idToken
      router.push("/vendor");
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError("");
    if (apiError) setApiError("");
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError("");
    if (apiError) setApiError("");
  };

  const handleSubmit = async (value: string) => {
    setEmailError("");
    setPasswordError("");
    setApiError("");
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

    if (!password.trim()) {
      setPasswordError("Password is required");
      if (!hasError) passwordRef.current?.focus();
      hasError = true;
    }

    if (hasError) return;

    Login({ email, password })
      .then((data) => {
        console.log("Login successful:", data);
        if (rememberMe == true) {
          localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
        }
        localStorage.setItem("userData", JSON.stringify(data));
        router.push("/vendor");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        setApiError(error.message ? error.message : "Failed to login");
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
    <div className="w-full flex flex-col items-center bg-gray-50 p-6 md:p-8">
      <div className="flex flex-col items-center text-center mt-16">
        <DonutLogo />
        <div className="flex flex-col items-center gap-y-2 mt-2">
          <h3 className="text-2xl font-bold mb-2">Hello again!</h3>
          <p className="text-base font-normal leading-relaxed">
            Be yourself because an original <br /> is worth more than a copy
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-y-4 w-full max-w-md mt-6">
        <TextField
          text="Email"
          field={email}
          setField={handleEmailChange}
          placeholder=""
          type="email"
          error={emailError}
          inputRef={emailRef}
          onKeyDown={(e) => handleKeyDown(e, passwordRef)}
        />

        <PasswordField
          text="Password"
          field={password}
          setField={handlePasswordChange}
          placeholder=""
          type="password"
          error={passwordError}
          inputRef={passwordRef}
          onKeyDown={(e) => handleKeyDown(e, buttonRef)}
        />

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-[#3C096C] border-gray-300 rounded cursor-pointer transition-all duration-200"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-[#3C096C] text-sm font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6">
          <Button text="Log In" onClick={handleSubmit} buttonRef={buttonRef} />
        </div>
      </div>
    </div>
  );
};

export default Page;
