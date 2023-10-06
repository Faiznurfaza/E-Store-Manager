import { CartDetails } from "@/modules/carts/components/cart-details";

export default function CartDetailsPage({ params }: { params: { id: number } }) {
  return (
    <CartDetails id={params.id} />
  )
}
