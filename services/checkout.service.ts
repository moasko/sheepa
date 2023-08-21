import { API_BASE_URL } from "@/lib/helpers/constants"
import axios from "axios"
import { CheckOutDataProps } from "@/lib/interfaces/modelsInterfaces"


export async function createCheckOut(order: CheckOutDataProps) {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/order`, order)
        return data
    }
    catch (error) {
        console.log(error)
        throw new Error('Failed to create order');
    }
}