"use client";

import React, { useState } from "react";

import Pagination from "@/components/pagination/pagination";
import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import DynamicTable from "@/components/table/dynamic-table";
import { CartFormDialog } from "./cart-form-dialog";
import { DeleteCartDialog } from "./delete-cart-dialog";

import { useCarts } from "../hooks/use-cart";
import { useFormatCurrency, useFormatPercentage } from "@/utils/use-format";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Cart } from "@/types";
import Link from "next/link";

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
  } = useCarts();

  const formatCurrency = useFormatCurrency;
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const handleCreateClick = () => {
    setFormMode("create");
    setSelectedCart(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (cart: Cart) => {
    setFormMode("edit");
    setSelectedCart(cart);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (cart: Cart) => {
    setSelectedCart(cart);
    setDeleteDialogOpen(true);
  };

  const columns = [
    { key: "id", label: "No" },
    { key: "userId", label: "User ID" },
    { key: "totalProducts", label: "Total Products" },
    { key: "totalQuantity", label: "Total Quantity" },
    { key: "total", label: "Total Price" },
    { key: "discountedTotal", label: "Discounted Total" },
    { key: "actions", label: "Actions" },
  ];

  if (isLoading || isError) {
    return (
      <DynamicLoaderTable
        headers={[
          "No",
          "User ID",
          "Total Products",
          "Total Quantity",
          "Total Price",
          "Discounted Total",
          "Actions",
        ]}
        isLoading={isLoading}
        isError={isError}
      />
    );
  }

  const formattedData = paginatedCarts.map((cart) => ({
    ...cart,
    total: formatCurrency(cart.total),
    discountedTotal: formatCurrency(cart.discountedTotal),
    actions: (
      <div className="flex items-center gap-1">
        <Link href={`/carts/${cart.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <Eye className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEditClick(cart)}
          className="h-8 px-2"
        >
          <Pencil className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeleteClick(cart)}
          className="h-8 px-2 text-destructive hover:text-destructive"
        >
          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>
    ),
  }));

  return (
    <div className="w-full mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Shopping Carts</h2>
        <Button
          onClick={handleCreateClick}
          className="bg-blue-500 hover:bg-blue-600 text-white gap-2 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Cart</span>
        </Button>
      </div>
      <div className="space-y-4">
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

      <CartFormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        cart={selectedCart}
        mode={formMode}
        onCartCreated={() => handlePageChange(1)}
      />

      {selectedCart && (
        <DeleteCartDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          cartId={selectedCart.id}
        />
      )}
    </div>
  );
}
