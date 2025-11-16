"use client";

import React from "react";
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
import { toast } from "sonner";
import { deleteCart } from "@/services/carts-services";

interface DeleteCartDialogProps {
  open: boolean;
  onClose: () => void;
  cartId: number;
}

export function DeleteCartDialog({
  open,
  onClose,
  cartId,
}: DeleteCartDialogProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      toast.success(
        <div>
          <p className="font-semibold">Cart deleted successfully!</p>
          <p className="text-sm mt-1">Cart ID: {data.id || cartId}</p>
        </div>
      );
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete cart");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(cartId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Cart</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete cart #{cartId}? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
