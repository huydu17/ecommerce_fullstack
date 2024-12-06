import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories, saveAttr } from "../../apicalls/category";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveAttribute = createAsyncThunk(
  "category/saveAttr",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await saveAttr(payload);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addAttributeToTable: (state, action) => {
      state.categories = state.categories.map((category) => {
        if (category.name === action.payload.categoryName) {
          return {
            ...category,
            attributes: [...category.attributes, action.payload.attribute],
          };
        }
        return category;
      });
    },
  },
  extraReducers: (builder) => {
    //Fetch data
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch categories";
    });

    // Save attribute
    builder.addCase(saveAttribute.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveAttribute.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = state.categories.map((category) => {
        if (category?.name === action.payload?.name) {
          return {
            ...category,
            attributes: action.payload.attributes,
          };
        }
        return category;
      });
    });
    builder.addCase(saveAttribute.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to save attribute";
    });
  },
});

export const { clearError, addAttributeToTable } = categorySlice.actions;
export default categorySlice.reducer;
