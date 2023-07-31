import axios from 'axios';
import { API_BASE_URL, PRODUCTS_SECTION_DEFAULT_LIMITE } from '@/lib/helpers/constants';
import { ProductProps } from "@/lib/interfaces/modelsInterfaces"
interface GetSectionsProducts {
  category?: string;
  limit?: number;
}

export const getSectionsProducts = async ({
  category,
  limit = PRODUCTS_SECTION_DEFAULT_LIMITE,
}: GetSectionsProducts) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/products`, {
      params: {
        category: category,
        prePage: limit,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch products');
  }
};

export const getProduct = async (slug: string) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/products/${slug}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch product');
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/products`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch products');
  }
};

export const createProduct = async (productData: ProductProps) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/products`, productData);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create product');
  }
};

export const updateProduct = async ({ id, productData }: { id: number; productData: ProductProps }) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/products/product/${id}`, productData);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/products`, {
      params: {
        id: id
      }
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete product');
  }
};

export const getProductById = async (id: number) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/products/product/${id}`)
    return data
  }
  catch (error) {
    console.log(error)
    throw new Error("failed to get Product By Id")
  }
}

// export const makeProductFeatured = async (id: number, isFeatured: boolean) => {
//   try {
//     const productData = { isFeatured };
//     const { data } = await updateProduct({id:id});
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to make product featured');
//   }
// };
