import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1";

export const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const loginWithGoogle = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/login-with-google`, payload);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const changePassword = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/change-password`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const changePasswordWithGoogle = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/change-password-with-google`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const resetPassword = async (token, payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/reset-password/${token}`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};
