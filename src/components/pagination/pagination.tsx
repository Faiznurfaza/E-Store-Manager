"use client";

import { PaginationProps } from "./pagination.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, KeyboardEvent } from "react";

export default function Pagination({
  page,
  maxPage,
  handlePageChange,
  skip,
  limit,
  totalRecords,
}: PaginationProps) {
  const [jumpToPage, setJumpToPage] = useState("");

  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPage) {
      handlePageChange(pageNum);
      setJumpToPage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJumpToPage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === "" || /^[1-9][0-9]*$/.test(value)) {
      setJumpToPage(value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3 w-full">
      {totalRecords === 0 ? (
        <span className="text-xs md:text-sm text-muted-foreground">No data</span>
      ) : (
        <>
          <span className="text-xs md:text-sm text-muted-foreground flex-shrink-0">
            {skip + 1} - {Math.min(skip + limit, skip + totalRecords)} of{" "}
            {skip + totalRecords}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-center">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
                aria-label="First Page"
                className="h-8 px-2"
              >
                <ChevronsLeft className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous Page"
                className="gap-1 text-xs md:text-sm h-8 px-2 md:px-3"
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Prev</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                Page {page} / {maxPage}
              </span>
              <div className="flex items-center gap-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={1}
                  max={maxPage}
                  value={jumpToPage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Go"
                  className="h-8 w-14 text-xs text-center px-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleJumpToPage}
                  disabled={!jumpToPage || parseInt(jumpToPage) > maxPage}
                  className="h-8 px-2 text-xs"
                >
                  Go
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= maxPage}
                aria-label="Next Page"
                className="gap-1 text-xs md:text-sm h-8 px-2 md:px-3"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(maxPage)}
                disabled={page >= maxPage}
                aria-label="Last Page"
                className="h-8 px-2"
              >
                <ChevronsRight className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
