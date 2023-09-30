'use client'

import axios from "axios"

export default async function getAllCarts() {
    const response = await axios.get(`https://dummyjson.com/carts`)
    return response.data
}