import axiosInstance from "../axiosInstance";

export const GetUsers = async () => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.get("admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to fetch admin users";
    throw new Error(message);
  }
};

export const AddUsers = async (body: {
  firstName: string;
  lastName: string;
  email: string;
  permission: string;
}) => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.post("admin/users", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to add admin.";
    throw new Error(message);
  }
};

export const UpdateUsers = async (body: {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}) => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.patch("admin/users", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to update admin.";
    throw new Error(message);
  }
};

export const DeleteUsers = async (userId: string) => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.put(`admin/users`,{userId}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to delete admin.";
    throw new Error(message);
  }
};
