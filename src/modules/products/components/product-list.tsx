"use client";

import React from "react";

import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import Pagination from "@/components/pagination/pagination";
import DynamicTable from "@/components/table/dynamic-table";

import usePaginatedProductData  from "../hooks/useProductData";
import useFormatCurrency from "@/utils/useFormatCurrency";

export function ProductList() {
  const {
    paginatedProducts,
    isLoading,
    isError,
    page,
    handlePageChange,
    maxPage,
    skip,
    limit,
  } = usePaginatedProductData();

  const columns = [
    { key: "title", label: "Product Name" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "category", label: "Category" },
  ];
  if (isLoading || isError) {
    return (
      <DynamicLoaderTable
        headers={["Product Name", "Brand", "Price", "Stock", "Category"]}
        isLoading={isLoading}
        isError={isError}
      />
    );
  }

  const formattedData = paginatedProducts.map((product) => ({
    ...product,
    price: useFormatCurrency(product.price),
  }))

  return (
    <div className="rounded-md mb-4 p-4 min-w-full">
      <DynamicTable columns={columns} data={formattedData} />
      <Pagination
        page={page}
        maxPage={maxPage}
        handlePageChange={handlePageChange}
        skip={skip}
        limit={limit}
        totalRecords={paginatedProducts.length}
      />
    </div>
  );
}
