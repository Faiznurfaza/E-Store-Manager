import axios from "axios";

export default async function getAllProducts() {
    const response = await axios.get(`http://dummyjson.com/products?limit=0`)
    return response.data
}