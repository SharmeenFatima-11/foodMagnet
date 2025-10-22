import axiosInstance from "./axiosInstance";

export const GetVendors = async () => {
  try {
    const token = localStorage.getItem("userData");
    const { data } = await axiosInstance.get("/foodTrucks");
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      "Failed to fetch vendors";

    console.log("Login error:", message);
    throw new Error(message);
  }
};
