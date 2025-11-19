import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/payments";

export const createVNPayPayment = async (payload) => {
  try {
    const res = await axiosInstance.post(`${API_URL}/vnpay/create`, payload);
    return res.data;
  } catch (err) {
    return {
      error: err.response?.data?.message || err.message,
    };
  }
};


