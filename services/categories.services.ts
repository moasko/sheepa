import { API_BASE_URL } from "@/lib/helpers/constants"
import axios from "axios"
import { CategoryProps } from "@/lib/interfaces/modelsInterfaces"


export async function getAllCategories() {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/categories`);
        return data
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch categories');
    }
}

export async function createCategory(category: CategoryProps) {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/categories`, category)
        return data
    }
    catch (error) {
        console.log(error)
        throw new Error('Failed to create categories');
    }
}

export async function deleteCategory(id: number) {
    try {
        const { data } = await axios.delete(`${API_BASE_URL}/categories/category/${id}`)
        return data
    }
    catch (error) {
        console.log(error)
        throw new Error('Failed to delete categories');
    }
}


export async function updateCategory({ id, updatData }: { id: number, updatData: any }) {
    try {
        const { data } = await axios.put(`${API_BASE_URL}/categories/category/${id}`, updatData)
        return data
    } catch (error) {
        console.log(error)
        throw new Error('Failed to update categories')
    }
}


export async function getCategoryById(id:number){
    try{
        const {data}= await axios.get(`${API_BASE_URL}/categories/category/${id}`)
        return data
    }catch(error){
        console.log(error)
        throw new Error('Failed to get categories by id')
    }
}