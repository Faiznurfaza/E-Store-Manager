"use client";

import { PaginationProps } from "./pagination.types";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useDarkMode } from "@/utils/use-darkmode";
import { PaginationStyles } from "./pagination-styles";

export default function Pagination({
  page,
  maxPage,
  handlePageChange,
  skip,
  limit,
  totalRecords,
}: PaginationProps) {
  const { isDarkMode } = useDarkMode();
  const {
    PaginationContainer,
    PaginationText,
    PaginationPrevButton,
    PaginationNextButton,
  } = PaginationStyles(isDarkMode, page, maxPage);

  return (
    <div className={PaginationContainer}>
      {totalRecords === 0 ? (
        <span className={PaginationText}>No data</span>
      ) : (
        <>
          <span className={PaginationText}>
            {skip + 1} - {Math.min(skip + limit, skip + totalRecords)} of{" "}
            {skip + totalRecords}
          </span>
          <div className="space-y-2 lg:space-y-0 lg:space-x-2">
            <Button
              variant="outline"
              className={PaginationPrevButton}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className={PaginationText}>
              Page {page} / {maxPage}
            </span>
            <Button
              variant="outline"
              className={PaginationNextButton}
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= maxPage}
              aria-label="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
