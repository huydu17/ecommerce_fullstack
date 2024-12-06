import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/orders";
export const createOrder = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/create-order`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/get-order/${orderId}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getAllOrders = async (signal) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin-get-all`, {
      signal,
    });
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getMyOrders = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/my-orders`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const confirmOrder = async (orderId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/confirm-order/${orderId}`
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const transitOrder = async (orderId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/transit-order/${orderId}`
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const confirmDeliverd = async (orderId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/confirm-delivered/${orderId}`
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const analyticForFirstDate = async (date) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/analysis/${date}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const analyticForSecondDate = async (date) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/analysis/${date}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getStats = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/stats`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};
