"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useOneCart } from "../hooks/use-cart";
import { TransformCartProductsData } from "../utils/cart-utils";
import { faker } from "@faker-js/faker";

import { Card, Space } from "antd";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import DynamicTable from "@/components/table/dynamic-table";
import { CartDetailsStyles } from "../styles/cart-details.styles";

export function CartDetails({ id }: { id: number }) {
  const router = useRouter();
  const { data, products, isLoading, isError } = useOneCart(id);

  const formattedData = TransformCartProductsData(products);
  const cardStyles = CartDetailsStyles()

  const columns = [
    { key: "title", label: "Product Name" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "total", label: "Total Price" },
    { key: "discountPercentage", label: "Discount" },
    { key: "discountedPrice", label: "Discounted Total" },
  ];

  if (isLoading || isError) {
    return (
      <DynamicLoaderTable
        headers={[
          "Product Name",
          "Quantity",
          "Price",
          "Total Price",
          "Discount",
          "Discounted Total",
        ]}
        isLoading={isLoading}
        isError={isError}
      />
    );
  }

  const formattedDate = faker.date
    .recent({ days: 7 })
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className="mt-2 ml-4">
      <Button variant="outline" className="mb-8" onClick={() => router.back()}>
        <MoveLeft />
      </Button>
      <h2 className="text-3xl font-semibold mb-4 ml-2">Cart {data.id}</h2>
      <div className="flex">
        <Space direction="horizontal" wrap={true} align="center" size={32}>
          <Card
            title="Details"
            headStyle={cardStyles.Head}
            style={cardStyles.Body}
            className={cardStyles.Content}
          >
            <div className="grid grid-cols-2 gap-4 text-justify">
              <div className="col-span-1">
                <p className="mb-2 ">User</p>
                <span className="font-semibold">{data.userId}</span>
              </div>
              <div className="col-span-1">
                <p className="mb-2 ">Added on</p>
                <span className="font-semibold">{formattedDate}</span>
              </div>

              <div className="col-span-1">
                <p className="mb-2 ">Total Items</p>
                <span className="font-semibold">{data.totalQuantity}</span>
              </div>
              <div className="col-span-1">
                <p className="mb-2 ">Total Price</p>
                <span className="font-semibold text-lg">${data.total}</span>
              </div>
            </div>
          </Card>
          <DynamicTable columns={columns} data={formattedData} />
        </Space>
      </div>
    </main>
  );
}
