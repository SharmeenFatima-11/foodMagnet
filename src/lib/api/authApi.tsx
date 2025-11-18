import axiosInstance from "./axiosInstance";
import { useRouter } from "next/navigation";

export const Login = async (user: { email: string; password: string }) => {
  try {
    const { data } = await axiosInstance.post("/login", user);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Login failed. Please try again.";

    console.log("Login error:", message);
    throw new Error(message);
  }
};

export const RefreshToken = async () => {
  const router = useRouter();
  let userData: any = localStorage.getItem("userData");
  if (userData) {
    userData = JSON.parse(userData);
    const refreshToken = userData.refreshToken;

    try {
      const { data } = await axiosInstance.post("/app/accounts/refresh-token", {
        refreshToken,
      });
      const newIdToken = data.idToken;
      console.log("newIdToken", newIdToken);
      // Update only idToken in localStorage
      const updatedUserData = {
        ...userData,
        idToken: newIdToken,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      return data;
    } catch (error: any) {
      console.error("Refresh token error:", error.message);
      localStorage.clear();
      router.push("/login");
      // Optionally, you can also throw again if needed
      throw new Error("Session expired. Please login again.");
    }
  } else {
    // No userData in storage, redirect to login
    router.push("/login");
  }
};

export const ResetPassword = async (body: { email: string }) => {
  try {
    const { data } = await axiosInstance.post(
      "/admin/users/sendPasswordReset",
      body
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Reset password failed. Please try again.";

    console.log("Reset Password error:", message);
    throw new Error(message);
  }
};

export const ValidateResetPassword = async (body: {
  userId: string;
  resetCode: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      "/admin/users/validatePasswordReset",
      body
    );
    localStorage.setItem("userData", JSON.stringify(data));
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Reset password failed. Please try again.";

    console.log("Reset Password error:", message);
    throw new Error(message);
  }
};
