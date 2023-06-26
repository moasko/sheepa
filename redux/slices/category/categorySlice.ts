import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.data = action.payload;
    },
    getCategoriesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
}) ;

export const { getCategories, getCategoriesError } = categorySlice.actions;
export default categorySlice.reducer;
