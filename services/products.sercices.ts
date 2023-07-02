import axios from 'axios'
import { API_BASE_URL, PRODUCTS_SECTION_DEFAULT_LIMITE } from "@/lib/helpers/constants";

interface GetSectionsProducts {
    category?: string,
    limit?: number
}

export const getSectionsProducts = async ({ category, limit = PRODUCTS_SECTION_DEFAULT_LIMITE }: GetSectionsProducts) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/products`, {
            params: {
                category: category,
                prePage: limit
            }
        });
        return data
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch products");
    }
};


export const getProduct = async (slug: string) => {
    try {
        const product = await axios.get(`${API_BASE_URL}/products/${slug}`)
        return product
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch product");
    }
}