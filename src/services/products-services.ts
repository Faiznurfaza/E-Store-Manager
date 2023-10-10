import axios from "axios";

export async function getAllProducts() {
    const response = await axios.get(`https://dummyjson.com/products?limit=0`)
    return response.data
}