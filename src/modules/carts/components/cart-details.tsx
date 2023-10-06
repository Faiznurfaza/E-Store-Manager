"use client";

import React from "react";
import { CartProduct } from "@/types";
import { useOneCart } from "../hooks/use-cart";
import { getCartById } from "@/services/carts-services";
import { useFormatCurrency, useFormatPercentage } from "@/utils/use-format";
import { faker } from "@faker-js/faker";

import { Card, Space } from "antd";
import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import DynamicTable from "@/components/table/dynamic-table";

export function CartDetails({ id }: { id: number }) {
  const { data, products, isLoading, isError } = useOneCart(id);

  const formatCurrency = useFormatCurrency;
  const formatPercentage = useFormatPercentage;

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

  const formattedData = products?.map((product) => ({
    ...product,
    total: formatCurrency(product.total),
    discountedPrice: formatCurrency(product.discountedPrice),
    discountPercentage: formatPercentage(product.discountPercentage),
  }));

  return (
    <main className="mt-2 ml-4">
      <h2 className="text-3xl font-semibold mb-4 text-blue-600">
        Cart {data.id}
      </h2>
      <div className="flex">
        <Space direction="vertical" size={32}>
          <Card title="Details" style={{ width: 500 }} className="bg-gray-100">
            <div className="grid grid-cols-2 gap-4 text-justify">
              <div className="col-span-1">
                <p className="mb-2 text-gray-600">User</p>
                <span className="font-semibold">{data.userId}</span>
              </div>
              <div className="col-span-1">
                <p className="mb-2 text-gray-600">Added on</p>
                <span className="font-semibold">{formattedDate}</span>
              </div>

              <div className="col-span-1">
                <p className="mb-2 text-gray-600">Total Items</p>
                <span className="font-semibold">{data.totalQuantity}</span>
              </div>
              <div className="col-span-1">
                <p className="mb-2 text-gray-600">Total Price</p>
                <span className="font-semibold text-lg text-blue-600">
                  ${data.total}
                </span>
              </div>
            </div>
          </Card>
          <DynamicTable columns={columns} data={formattedData} />
        </Space>
      </div>
    </main>
  );
}
