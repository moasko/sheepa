import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  // id: number;
  // name: string;
  // slug: string;
  // price: number;
  // reduction?: number | null;
  // isFeatured: boolean;
  // isActive: boolean;
  // sku?: string | null;
  // quantity: number;
  // description?: string | null;
  // seoTitle?: string | null;
  // seoDescription?: string | null;
  // images: ProductImage[];
  // variants: ProductVariant[];
  // categories: Category[];
  // tags: Tag[];
  // orders: Order[];
  // userId: number;
  // user: User;
  // productReview: ProductReview[];
  // createdAt: Date;
  // updatedAt: Date;
  // weight?: number | null;
  // dimensions?: string | null;
  // brand?: string | null;
  // manufacturer?: string | null;
  // warranty?: string | null;
  // features?: string | null;
}

interface ProductsState {
  products: Product[];
  page: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  page: 1,
  isLoading: false,
  error: null
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setProducts, setPage, setIsLoading, setError } =
  productsSlice.actions;

export default productsSlice.reducer;
