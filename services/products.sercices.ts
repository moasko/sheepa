import axios from 'axios';
import { API_BASE_URL, PRODUCTS_SECTION_DEFAULT_LIMITE } from '@/lib/helpers/constants';
import { ProductProps } from "@/lib/interfaces/modelsInterfaces"
import { useQuery } from '@tanstack/react-query';

interface GetSectionsProducts {
  category?: string;
  limit?: number;
}

export const getSectionsProducts = async ({
  category,
  limit = PRODUCTS_SECTION_DEFAULT_LIMITE,
}: GetSectionsProducts) => {
  try {
    const url = `${API_BASE_URL}/products`;
    const params = {
      category: category,
      perPage: limit,
    };
    const { data } = await axios.get(url, { params });
    return data;

  } catch (error) {
    console.error('Error while fetching products:', error);
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
interface GetAllProductsProps {
  perPage?: number,
  page?: number,
  minPrice?: number,
  maxPrice?: number,
  category?:string
}
export const getAllProducts = async ({ perPage, page, minPrice, maxPrice,category }: GetAllProductsProps) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/products`, {
      params: {
        perPage,
        page,
        maxPrice,
        minPrice,
        category
      }
    });
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
