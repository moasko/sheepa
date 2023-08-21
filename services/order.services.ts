import { API_BASE_URL } from "@/lib/helpers/constants"
import axios from "axios"


export async function getAllOrders() {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/order`);
        return data
    } catch (error) {
        throw new Error('Failed to fetch order');
    }
}

