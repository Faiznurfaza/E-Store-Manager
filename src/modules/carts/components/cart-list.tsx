"use client";

import React from "react";

import Pagination from "@/components/pagination/pagination";
import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import DynamicTable from "@/components/table/dynamic-table";

import usePaginatedCartData from "../hooks/use-cart";
import useFormatCurrency from "@/utils/useFormatCurrency";

export default function CartList() {
  const {
    paginatedCarts,
    isLoading,
    isError,
    page,
    limit,
    maxPage,
    skip,
    handlePageChange,
  } = usePaginatedCartData();

  const columns = [
    { key: "id", label: "No" },
    { key: "userId", label: "User" },
    { key: "totalProducts", label: "Total Products" },
    { key: "totalQuantity", label: "Total Quantity" },
    { key: "total", label: "Total Price" },
    { key: "discountedTotal", label: "Discounted Total" },
  ];

  if (isLoading || isError) {
    return (
      <DynamicLoaderTable
        headers={[
          "No",
          "User",
          "Total Products",
          "Total Quantity",
          "Total Price",
          "Discounted Total",
        ]}
        isLoading={isLoading}
        isError={isError}
      />
    );
  }

  const formattedData = paginatedCarts.map((cart) => ({
    ...cart,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    total: useFormatCurrency(cart.total),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    discountedTotal: useFormatCurrency(cart.discountedTotal),
  }));

  return (
    <div className="rounded-md mb-4 p-4 min-w-full">
      <DynamicTable columns={columns} data={formattedData} />
      <Pagination
        page={page}
        maxPage={maxPage}
        handlePageChange={handlePageChange}
        skip={skip}
        limit={limit}
        totalRecords={paginatedCarts.length}
      />
    </div>
  );
}
