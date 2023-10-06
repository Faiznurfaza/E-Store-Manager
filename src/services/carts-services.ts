'use client'

import axios from "axios"

export async function getAllCarts() {
    const response = await axios.get(`https://dummyjson.com/carts`)
    return response.data
}

export async function getCartById(id: number) {
    const response = await axios.get(`https://dummyjson.com/carts/${id}`)
    return response.data
}
