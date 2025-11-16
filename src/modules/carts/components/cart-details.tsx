"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useOneCart } from "../hooks/use-cart";
import { TransformCartProductsData } from "../utils/cart-utils";
import { faker } from "@faker-js/faker";

import { Card, Space } from "antd";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicTable from "@/components/table/dynamic-table";
import { CartDetailsSkeleton } from "./cart-details-skeleton";
import { CartDetailsStyles } from "../styles/cart-details.styles";

export function CartDetails({ id }: { id: number }) {
  const router = useRouter();
  const { data, products, isLoading, isError } = useOneCart(id);

  const formattedData = TransformCartProductsData(products);
  const cardStyles = CartDetailsStyles();

  const columns = [
    { key: "title", label: "Product Name" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "total", label: "Total Price" },
    { key: "discountPercentage", label: "Discount" },
    { key: "discountedTotal", label: "Discounted Total" },
  ];

  const formattedDate = faker.date
    .recent({ days: 7 })
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className="rounded-md mb-4 p-4 md:p-6">
      <Button variant="outline" className="mb-6 gap-2" onClick={() => router.back()}>
        <MoveLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>
      {isLoading || isError ? (
        <CartDetailsSkeleton isLoading={isLoading} isError={isError} />
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6">Cart #{data?.id}</h2>
          <div className="grid gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Cart Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">User ID</p>
                  <p className="font-semibold text-lg">{data?.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Added on</p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Items</p>
                  <p className="font-semibold text-lg">{data?.totalQuantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                  <p className="font-bold text-2xl text-blue-500">
                    ${data?.total}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Cart Items</h3>
              <DynamicTable columns={columns} data={formattedData} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
