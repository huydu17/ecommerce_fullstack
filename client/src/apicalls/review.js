import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/reviews";

export const createReview = async (productId, payload) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/write-review/${productId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};
