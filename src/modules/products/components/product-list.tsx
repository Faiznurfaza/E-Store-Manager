"use client";

import React from "react";
import { useProductData } from "../hooks/useProductData";
import LoadingTable from "@/components/loading/loading-table";
import ErrorFetchTable from "@/components/error/error-fetch";

export function ProductList() {
  const { products, isLoading, isError, page, handlePageChange, maxPage } =
    useProductData();

  if (isLoading) {
    return <LoadingTable />;
  }

  if (isError) {
    return <ErrorFetchTable />;
  }

  return (
    <div className="rounded-md mb-4 p-4 min-w-full">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2">Product Name</th>
              <th className="px-4 py-2 border-b-2">Brand</th>
              <th className="px-4 py-2 border-b-2">Price</th>
              <th className="px-4 py-2 border-b-2">Stock</th>
              <th className="px-4 py-2 border-b-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="text-center capitalize">
                <td className="px-4 py-2 border-b-2">{product.title}</td>
                <td className="px-4 py-2 border-b-2">{product.brand}</td>
                <td className="px-4 py-2 border-b-2">${product.price}</td>
                <td className="px-4 py-2 border-b-2">{product.stock}</td>
                <td className="px-4 py-2 border-b-2">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-4">
          <button
            className="text-blue m-2"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="m-2">
            {page} / {maxPage}
          </span>
          <button
            className="text-blue m-2"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === maxPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
