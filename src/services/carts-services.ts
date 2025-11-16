'use client'

import axios from "axios"

export async function getAllCarts(skip: number = 0, limit: number = 10) {
    const response = await axios.get(`https://dummyjson.com/carts?skip=${skip}&limit=${limit}`)
    return response.data
}

export async function getCartById(id: number) {
    const response = await axios.get(`https://dummyjson.com/carts/${id}`)
    return response.data
}

export async function createCart(cartData: any) {
    const response = await axios.post('https://dummyjson.com/carts/add', cartData)
    return response.data
}

export async function updateCart(id: number, cartData: any) {
    const response = await axios.put(`https://dummyjson.com/carts/${id}`, cartData)
    return response.data
}

export async function deleteCart(id: number) {
    const response = await axios.delete(`https://dummyjson.com/carts/${id}`)
    return response.data
}
