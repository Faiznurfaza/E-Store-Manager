"use client";

import React, { useState } from "react";

import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import Pagination from "@/components/pagination/pagination";
import DynamicTable from "@/components/table/dynamic-table";
import ProductFilters from "./product-filters";
import { ProductFormDialog } from "./product-form-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";

import { useProducts } from "../hooks/use-products";
import { useFormatCurrency } from "@/utils/use-format";
import { useProductFilters } from "../hooks/use-products-filters";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

export function ProductList() {
  const filterState = useProductFilters();
  const formatCurrency = useFormatCurrency;
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

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
    setSearchQuery,
  } = useProducts({
    filteredBrands: filterState.filteredBrands || [],
    filteredCategories: filterState.filteredCategories || [],
    minPrice: filterState.minPrice,
    maxPrice: filterState.maxPrice,
  });

  const handleCreateClick = () => {
    setFormMode("create");
    setSelectedProduct(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const columns = [
    { key: "title", label: "Product Name" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "category", label: "Category" },
    { key: "actions", label: "Actions" },
  ];

  const formattedData = paginatedProducts.map((product) => ({
    ...product,
    price: formatCurrency(product.price),
    actions: (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEditClick(product)}
          className="h-8 px-2"
        >
          <Pencil className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeleteClick(product)}
          className="h-8 px-2 text-destructive hover:text-destructive"
        >
          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>
    ),
  }));

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-0 max-w-md">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            onClick={handleCreateClick}
            className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Button>
          <ProductFilters
            brandList={brandList}
            categoryList={categoryList}
            {...filterState}
          />
        </div>
      </div>

      {isLoading || isError ? (
        <DynamicLoaderTable
          headers={[
            "Product Name",
            "Brand",
            "Price",
            "Stock",
            "Category",
            "Actions",
          ]}
          isLoading={isLoading}
          isError={isError}
        />
      ) : (
        <div className="w-full space-y-4">
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

      <ProductFormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        product={selectedProduct}
        mode={formMode}
        onProductCreated={() => handlePageChange(1)}
      />

      {selectedProduct && (
        <DeleteProductDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          productId={selectedProduct.id}
          productTitle={selectedProduct.title}
        />
      )}
    </div>
  );
}
