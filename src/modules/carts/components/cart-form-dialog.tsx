"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createCart, updateCart } from "@/services/carts-services";
import { Cart } from "@/types";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
}

interface CartFormDialogProps {
  open: boolean;
  onClose: () => void;
  cart: Cart | null;
  mode: "create" | "edit";
  onCartCreated?: () => void;
}

export function CartFormDialog({
  open,
  onClose,
  cart,
  mode,
  onCartCreated,
}: CartFormDialogProps) {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());

  const toggleProduct = (index: number) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProducts(newExpanded);
  };

  const addEmptyProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now(),
        title: "",
        price: 0,
        quantity: 1,
        total: 0,
        discountPercentage: 0,
        discountedTotal: 0,
      },
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof CartProduct, value: any) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-calculate totals
    const price = parseFloat(updated[index].price.toString()) || 0;
    const quantity = parseInt(updated[index].quantity.toString()) || 0;
    const discount = parseFloat(updated[index].discountPercentage.toString()) || 0;

    updated[index].total = price * quantity;
    updated[index].discountedTotal = updated[index].total * (1 - discount / 100);

    setProducts(updated);
  };

  console.log('Products:', products);
  useEffect(() => {
    if (mode === "edit" && cart) {
      setUserId(cart.userId.toString());
      if (cart.products && cart.products.length > 0) {
        setProducts(
          cart.products.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            quantity: p.quantity,
            total: p.total,
            discountPercentage: p.discountPercentage,
            discountedTotal: p.discountedPrice || (p.total * (1 - p.discountPercentage / 100)),
          }))
        );
      } else {
        setProducts([]);
      }
    } else {
      setUserId("");
      setProducts([
        {
          id: 1,
          title: "iPhone 9",
          price: 549,
          quantity: 1,
          total: 549,
          discountPercentage: 12.96,
          discountedTotal: 478,
        },
      ]);
    }
  }, [mode, cart, open]);

  const createMutation = useMutation({
    mutationFn: createCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      toast.success(
        <div>
          <p className="font-semibold">Cart created successfully!</p>
          <p className="text-sm mt-1">Cart ID: {data.id} | User ID: {data.userId}</p>
          <p className="text-xs text-muted-foreground">
            {data.totalProducts} products | Total: ${data.total}
          </p>
        </div>
      );
      if (onCartCreated) onCartCreated();
      onClose();
      setUserId("");
      setProducts([]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create cart");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateCart(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      toast.success(
        <div>
          <p className="font-semibold">Cart updated successfully!</p>
          <p className="text-sm mt-1">Cart ID: {data.id}</p>
        </div>
      );
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update cart");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId.trim()) {
      toast.error("User ID is required");
      return;
    }

    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum) || userIdNum <= 0) {
      toast.error("User ID must be a valid positive number");
      return;
    }

    if (products.length === 0) {
      toast.error("At least one product is required");
      return;
    }

    // Validate products
    for (const product of products) {
      if (!product.title.trim()) {
        toast.error("Product name is required for all products");
        return;
      }
      if (product.price <= 0) {
        toast.error("Price must be greater than 0");
        return;
      }
      if (product.quantity <= 0) {
        toast.error("Quantity must be greater than 0");
        return;
      }
    }

    const productsPayload = products.map((p) => ({
      id: p.id,
      quantity: p.quantity,
    }));

    if (mode === "create") {
      createMutation.mutate({
        userId: userIdNum,
        products: productsPayload,
      });
    } else if (cart) {
      updateMutation.mutate({
        id: cart.id,
        data: {
          userId: userIdNum,
          products: productsPayload,
        },
      });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Cart" : "Edit Cart"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new cart for a user with products."
              : "Update the cart information."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
                required
                min="1"
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label>Products</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEmptyProduct}
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>

              {products.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4 border rounded-md">
                  No products added yet. Click <strong>Add Product</strong> to get started.
                </p>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {products.map((product, index) => {
                    const isExpanded = expandedProducts.has(index);
                    return (
                      <div
                        key={index}
                        className="border rounded-lg bg-muted/20 overflow-hidden"
                      >
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/40 transition-colors"
                          onClick={() => toggleProduct(index)}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">
                                  Product #{index + 1}
                                </span>
                                {product.title && (
                                  <span className="text-xs text-muted-foreground">
                                    - {product.title}
                                  </span>
                                )}
                              </div>
                              {!isExpanded && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  ${product.discountedTotal.toFixed(2)} ({product.quantity}x @ ${product.price.toFixed(2)})
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeProduct(index);
                            }}
                            className="h-7 px-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {isExpanded && (
                          <div className="p-3 pt-0 space-y-2 border-t">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="col-span-2">
                                <Label className="text-xs">Product ID</Label>
                                <Input
                                  type="number"
                                  value={product.id}
                                  onChange={(e) =>
                                    updateProduct(index, "id", parseInt(e.target.value) || 0)
                                  }
                                  placeholder="Product ID"
                                  min="1"
                                  className="h-8"
                                />
                              </div>

                              <div className="col-span-2">
                                <Label className="text-xs">Product Name</Label>
                                <Input
                                  type="text"
                                  value={product.title}
                                  onChange={(e) =>
                                    updateProduct(index, "title", e.target.value)
                                  }
                                  placeholder="e.g. iPhone 9"
                                  className="h-8"
                                />
                              </div>

                              <div>
                                <Label className="text-xs">Price ($)</Label>
                                <Input
                                  type="number"
                                  value={product.price}
                                  onChange={(e) =>
                                    updateProduct(index, "price", parseFloat(e.target.value) || 0)
                                  }
                                  placeholder="0.00"
                                  min="0"
                                  step="0.01"
                                  className="h-8"
                                />
                              </div>

                              <div>
                                <Label className="text-xs">Quantity</Label>
                                <Input
                                  type="number"
                                  value={product.quantity}
                                  onChange={(e) =>
                                    updateProduct(index, "quantity", parseInt(e.target.value) || 1)
                                  }
                                  placeholder="1"
                                  min="1"
                                  className="h-8"
                                />
                              </div>

                              <div>
                                <Label className="text-xs">Discount (%)</Label>
                                <Input
                                  type="number"
                                  value={product.discountPercentage}
                                  onChange={(e) =>
                                    updateProduct(
                                      index,
                                      "discountPercentage",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  placeholder="0"
                                  min="0"
                                  max="100"
                                  step="0.01"
                                  className="h-8"
                                />
                              </div>

                              <div>
                                <Label className="text-xs">Total ($)</Label>
                                <Input
                                  type="number"
                                  value={product.total.toFixed(2) || 0}
                                  disabled
                                  className="h-8 bg-muted"
                                />
                              </div>

                              <div className="col-span-2">
                                <Label className="text-xs">Discounted Total ($)</Label>
                                <Input
                                  type="number"
                                  value={product.discountedTotal.toFixed(2) || 0}
                                  disabled
                                  className="h-8 bg-muted font-semibold"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {products?.length > 0 && (
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Cart Total:</span>
                    <span className="font-bold">
                      $
                      {products
                        .reduce(
                          (sum, p) => sum + (parseFloat(p?.discountedTotal?.toString()) || 0),
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Cart"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
