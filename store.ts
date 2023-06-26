import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./redux/slices/products/productsSlice";
import editProductSlice from "./redux/slices/products/editProductSlice";

// category slices
import categorySlice from "./redux/slices/category/categorySlice";

const combineReducer = combineReducers({
  products: productsSlice,
  edit: editProductSlice,
  category: categorySlice,
});

const store = configureStore({
  reducer: combineReducer,
});

export default store;
