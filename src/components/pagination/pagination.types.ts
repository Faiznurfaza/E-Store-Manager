export type PaginationProps = {
    page: number;
    maxPage: number;
    handlePageChange: (newPage: number) => void
    skip: number;
    limit: number;
    totalRecords: number;
}