import axiosInstance from "../axiosInstance";

export const GetVendors = async () => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.get("/foodTrucks", {headers: { Authorization: `Bearer ${token}` }});
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to fetch vendors";

    console.log("Login error:", message);
    throw new Error(message);
  }
};

export const GetVendorDetails = async (id: string) => {
  try {
    const vendorId = id;
    const { data } = await axiosInstance.get(`/vendorDetails/${vendorId}`);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to fetch vendors";

    console.log("Login error:", message);
    throw new Error(message);
  }
};
