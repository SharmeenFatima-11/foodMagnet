import axiosInstance from "../axiosInstance";

export const GetPopularItems = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(`items/popular/${userId}`);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.error[0].error ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to get items";
    throw new Error(message);
  }
};

export const GetItems = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(`items/${userId}`);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.error[0].error ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to get items";
    throw new Error(message);
  }
};
