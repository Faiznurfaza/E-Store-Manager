import axios from "axios";

export async function getAllProducts(skip: number = 0, limit: number = 0) {
    const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
    return response.data
}

export async function createProduct(productData: any) {
    const response = await axios.post('https://dummyjson.com/products/add', productData)
    return response.data
}

export async function updateProduct(id: number, productData: any) {
    const response = await axios.put(`https://dummyjson.com/products/${id}`, productData)
    return response.data
}

export async function deleteProduct(id: number) {
    const response = await axios.delete(`https://dummyjson.com/products/${id}`)
    return response.data
}