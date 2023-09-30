"use client";

import { PaginationProps } from "./pagination.types";

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
        <button
          className={`px-4 py-2 text-blue-500 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          Prev
        </button>
        <span className="text-gray-600">
          Page {page} / {maxPage}
        </span>
        <button
          className={`px-4 py-2 text-blue-500 ${
            page === maxPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === maxPage}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
}
