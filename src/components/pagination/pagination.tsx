"use client";

import { PaginationProps } from "./pagination.types";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PaginationStyles } from "./paginations.styles";

export default function Pagination({
  page,
  maxPage,
  handlePageChange,
  skip,
  limit,
  totalRecords,
}: PaginationProps) {
  const paginationStyles = PaginationStyles(page, maxPage);

  return (
    <div className={paginationStyles.Container}>
      {totalRecords === 0 ? (
        <span className={paginationStyles.Text}>No data</span>
      ) : (
        <>
          <span className={paginationStyles.Text}>
            {skip + 1} - {Math.min(skip + limit, skip + totalRecords)} of{" "}
            {skip + totalRecords}
          </span>
          <div className={paginationStyles.ButtonContainer}>
            <Button
              variant="outline"
              className={paginationStyles.PrevButton}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              aria-label="Previous Page"
            >
              <ChevronLeft className={paginationStyles.Icon} />
            </Button>
            <span className={paginationStyles.Text}>
              Page {page} / {maxPage}
            </span>
            <Button
              variant="outline"
              className={paginationStyles.NextButton}
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= maxPage}
              aria-label="Next Page"
            >
              <ChevronRight className={paginationStyles.Icon} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
