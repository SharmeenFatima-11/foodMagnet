import axiosInstance from "./axiosInstance";

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
