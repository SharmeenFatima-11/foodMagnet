import axiosInstance from "../axiosInstance";

export const GetCuisines = async () => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.get("/foodCategories", {
      headers: { Authorization: `Bearer ${token}` },
    });
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

export const GetStates = async () => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.get("/states", {
      headers: { Authorization: `Bearer ${token}` },
    });
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

export const GetCities = async () => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.get("/cities", {
      headers: { Authorization: `Bearer ${token}` },
    });
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

export const AddVendor = async (body: {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  phoneNumber: string;
  businessDescription: string;
  foodCategoryId: string;
  movementType: string;
  businessAddress: string;
  city: string;
  state: string;
  zipcode: string;
  travelDistance: string;
  isPremium: boolean;
}) => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.post("/foodTrucks", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
