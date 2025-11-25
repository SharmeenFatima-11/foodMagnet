"use client"; // make this a client component for next.js 13+

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"></div>
  );
}

