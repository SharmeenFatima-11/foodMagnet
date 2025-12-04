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
  let userData: any = localStorage.getItem("userData");

  if (userData) {
    userData = JSON.parse(userData);
    const refreshToken = userData.refreshToken;

    try {
      const { data } = await axiosInstance.post(
        "/token/accounts/refresh-token",
        {
          refreshToken,
        }
      );

      const newIdToken = data.idToken;

      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, idToken: newIdToken })
      );

      return data;
    } catch (error: any) {
      console.error("Refresh token error:", error.message);
      const credentials = localStorage.getItem("credentials");

      localStorage.clear();
      if (credentials) {
        localStorage.setItem("credentials", credentials);
      }

      // Redirect manually
      window.location.href = "/login";

      throw new Error("Session expired. Please login again.");
    }
  } else {
    window.location.href = "/login";
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
      error.response?.data?.error ||
      error.message ||
      error.error ||
      "Reset password failed. Please try again.";

    console.log("Reset Password error:", message, error);
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
