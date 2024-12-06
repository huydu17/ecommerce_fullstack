import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/users";

export const getAll = async (signal) => {
  try {
    const response = await axiosInstance.get(`${API_URL}`, { signal });
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const updateUserByAdmin = async (userId, payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update-user-by-admin/${userId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getMe = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/get-me`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const updateInfo = async (userId, payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update-user-by-admin/${userId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};
