"use client";

import React from "react";

import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import Pagination from "@/components/pagination/pagination";
import DynamicTable from "@/components/table/dynamic-table";
import ProductFilters from "./product-filters";

import useProducts from "../hooks/use-products";
import { useFormatCurrency } from "@/utils/use-format";
import { useProductFilters } from "../hooks/use-products-filters";

export function ProductList() {
  const filterState = useProductFilters();
  const formatCurrency = useFormatCurrency;

  const {
    paginatedProducts,
    isLoading,
    isError,
    page,
    handlePageChange,
    maxPage,
    skip,
    limit,
    brandList,
    categoryList,
  } = useProducts({
    filteredBrands: filterState.filteredBrands || [],
    filteredCategories: filterState.filteredCategories || [],
    minPrice: filterState.minPrice,
    maxPrice: filterState.maxPrice,
  });

  const columns = [
    { key: "title", label: "Product Name" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "category", label: "Category" },
  ];

  const formattedData = paginatedProducts.map((product) => ({
    ...product,
    price: formatCurrency(product.price),
  }));

  return (
    <div className="rounded-md p-4 min-w-full">
      <ProductFilters
        brandList={brandList}
        categoryList={categoryList}
        {...filterState}
      />

      {isLoading || isError ? (
        <DynamicLoaderTable
          headers={["Product Name", "Brand", "Price", "Stock", "Category"]}
          isLoading={isLoading}
          isError={isError}
        />
      ) : (
        <div>
          <DynamicTable columns={columns} data={formattedData} />
          <Pagination
            page={page}
            maxPage={maxPage}
            handlePageChange={handlePageChange}
            skip={skip}
            limit={limit}
            totalRecords={formattedData.length}
          />
        </div>
      )}
    </div>
  );
}
