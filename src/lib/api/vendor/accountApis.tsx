import axiosInstance from "../axiosInstance";

export const PublishAccount = async (id: number) => {
  try {
    const { data } = await axiosInstance.put(`/foodTrucks/publishProfile`, {
      id,
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to publish account";
    throw new Error(message);
  }
};

export const DenyRequest = async (body: {
  id: number;
  denialReasonPicture: boolean;
  denialReasonMenuDescription: boolean;
  denialReasonMenuTypo: boolean;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/foodTrucks/denypublishRequest`,
      body
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to deny publish request";
    throw new Error(message);
  }
};

export const RevokeAccount = async (id: number) => {
  try {
    const { data } = await axiosInstance.put(`/foodTrucks/revoke`, {
      id,
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to revoke account";
    throw new Error(message);
  }
};

export const ActivateDevice = async (
  trackerSerialNumber: string,
  foodTruckId: any,
) => {
  try {
    const { data } = await axiosInstance.post(`/foodTrucks/device/activate`, {
      foodTruckId,
      trackerSerialNumber,
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.error[0].error ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to activate device";
    throw new Error(message);
  }
};

export const GetActivateDevice = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(
      `foodTrucks/device/active/${userId}`
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.error[0].error ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to get active devices";
    throw new Error(message);
  }
};

export const DeActivateDevice = async (body: { foodTruckId: string }) => {
  try {
    const { data } = await axiosInstance.put(
      `foodTrucks/device/deactivate`,
      body
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.error[0].error ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to deactivate device";
    throw new Error(message);
  }
};

export const CreateCoupon = async (body: {
  userId: number;
  promo_code: string;
  coupon_type: string;
  expiry_date: string | Date;
}) => {
  try {
    const { data } = await axiosInstance.post(
      `/foodTrucks/coupon/create`,
      body
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.error[0].error ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to create coupon";
    throw new Error(message);
  }
};

export const GetVendorCoupons = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(`foodTrucks/coupon/${userId}`);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.error[0].error ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.error?.message ||
      "Failed to get coupon";
    throw new Error(message);
  }
};
