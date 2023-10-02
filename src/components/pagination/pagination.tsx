"use client";

import { PaginationProps } from "./pagination.types";

import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Pagination({
  page,
  maxPage,
  handlePageChange,
  skip,
  limit,
  totalRecords,
}: PaginationProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mt-4">
      <span className="text-gray-600 text-sm mb-2 lg:mb-0">
        {skip + 1} - {Math.min(skip + limit, skip + totalRecords)} of{" "}
        {skip + totalRecords}
      </span>
      <div className="space-y-2 lg:space-y-0 lg:space-x-2">
        <Button
          variant="outline"
          
          className={`px-4 py-2 text-blue-500 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-gray-600">
          Page {page} / {maxPage}
        </span>
        <Button
          variant="outline"
          className={`px-4 py-2 text-blue-500 ${
            page === maxPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === maxPage}
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
