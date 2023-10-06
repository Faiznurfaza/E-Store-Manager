import { TableProps } from "./dynamic-table.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function DynamicTable({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full table-auto border-collapse border">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="px-4 py-2 border-b-2 font-bold text-left"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className="px-4 py-2 border-b capitalize text-left"
                  >
                    {column.key === "actions" ? (
                      <Link href={`carts/${row.id}`}>Details</Link>
                    ) : (
                      row[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-4 py-2 text-center"
              >
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
