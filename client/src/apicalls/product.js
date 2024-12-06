import axios from "axios";
import axiosInstance from "./axiosInstance";
const API_URL = "/api/v1/products";

let filterUrl = "";
const proceedFilters = (filters) => {
  filterUrl = "";
  const { attrsFromFilter, ratingFromFilter, applyPriceRange, sortOptions } =
    filters;
  if (ratingFromFilter) {
    filterUrl += `&averageRating[gte]=${ratingFromFilter}`;
  } else if (applyPriceRange.min && applyPriceRange.max) {
    console.log("123");
    filterUrl += `&price[gte]=${applyPriceRange.min}&price[lte]=${applyPriceRange.max}`;
  } else if (applyPriceRange.min) {
    console.log("1234");

    filterUrl += `&price[gte]=${applyPriceRange.min}`;
  } else if (applyPriceRange.max) {
    console.log("12355");
    filterUrl += `&price[lte]=${applyPriceRange.max}`;
  } else if (sortOptions) {
    filterUrl += `&sort=${sortOptions}`;
  } else if (attrsFromFilter) {
    if (attrsFromFilter.length > 0) {
      let val = attrsFromFilter.reduce((acc, item) => {
        let key = encodeURIComponent(item.key);
        let values = item.values.join("-");
        console.log("acc", acc);
        return acc + key + "-" + values + ",";
      }, "");
      filterUrl += `&attributes=${val}`;
    }
  }
  return filterUrl;
};

//user
export const getAllProducts = async (
  page = null,
  searchQuery = "",
  attrsFromFilter = [],
  categoryFromFilter = "",
  ratingFromFilter = "",
  applyPriceRange = {},
  sortOptions = ""
) => {
  try {
    let filters = {
      attrsFromFilter,
      categoryFromFilter,
      ratingFromFilter,
      applyPriceRange,
      sortOptions,
    };
    let filtersQuery = proceedFilters(filters);
    const category = categoryFromFilter
      ? `/category/${encodeURIComponent(categoryFromFilter)}`
      : "";
    let search;
    if (searchQuery) {
      filtersQuery = "";
      search = `&search=${searchQuery}`;
    } else {
      search = "";
    }
    const url = `${API_URL}${category}?page=${page}${filtersQuery}${search}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const get = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

//admin
export const getAll = async (signal) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin/get-all`, {
      signal,
    });
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const createProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/create-product`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const updateProduct = async (productId, payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update-product/${productId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};

export const getBestSeller = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/list/best-seller`);
    return response.data;
  } catch (err) {
    return {
      error: err.response?.data.message || err.response?.data || err.message,
    };
  }
};
