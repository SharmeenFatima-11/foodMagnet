import axiosInstance from "../axiosInstance";

export const SwitchToggle = async (body: {
  id: number;
  isVerified: boolean;
}) => {
  try {
    console.log("id", body.id, " isVerified", body.isVerified);
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.put("/foodTrucks/permittedToggle",body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to switch toggle";
    throw new Error(message);
  }
};

export const GetVerificationStatus = async (id: string) => {
  try {
    let token = localStorage.getItem("userData");
    token = token ? JSON.parse(token).idToken : null;
    const { data } = await axiosInstance.get(
      `/food-truck/verificationStatus/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      error.error ||
      "Failed to fetch verification status";

    throw new Error(message);
  }
};
