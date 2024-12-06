import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/categories";

export const createCategory = async (payload) => {
  try {
    const response = await axiosInstance.post(`${API_URL}`, payload);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getAllCategories = async (signal) => {
  try {
    const response = await axios.get(`${API_URL}/getAll`, { signal });
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};
export const saveAttr = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update/save-attrs`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const updateCategory = async (categoryId, payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/${categoryId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${categoryId}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/${categoryId}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};
