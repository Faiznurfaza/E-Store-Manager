export type TableColumn = {
    key: string;
    label: string;
}

export type TableProps = {
    columns: TableColumn[];
    data: Record<string, any>[];
}