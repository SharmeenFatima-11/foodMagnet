import axiosInstance from "../axiosInstance";

export const GetNotifications = async () => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.get("/admin/users/notifications", {headers: { Authorization: `Bearer ${token}` }});
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to fetch notifications";
    throw new Error(message);
  }
};

