import { useFormatCurrency, useFormatPercentage } from "@/utils/use-format";
import { Cart, CartProduct } from "@/types";

export function TransformCartData(carts: Cart[]) {
    const formatCurrency = useFormatCurrency

    const formattedData = carts?.map((cart) => ({
        ...cart,
        total: formatCurrency(cart.total),
        discountedTotal: formatCurrency(cart.discountedTotal)
    }))

    return formattedData
}

export function TransformCartProductsData(products: CartProduct[]) {
    const formatCurrency = useFormatCurrency
    const formatPercentage = useFormatPercentage

    const formattedData = products?.map((product) => ({
        ...product,
        total: formatCurrency(product.total),
        discountedPrice: formatCurrency(product.discountedPrice),
        discountPercentage: formatPercentage(product.discountPercentage)
    }))

    return formattedData
}