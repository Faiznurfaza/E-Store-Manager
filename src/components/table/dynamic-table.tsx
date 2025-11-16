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
import { Eye } from 'lucide-react';

export default function DynamicTable({ columns, data }: TableProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="px-2 md:px-4 py-3 font-semibold text-left text-foreground text-xs md:text-sm"
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={`px-2 md:px-4 py-3 text-left text-xs md:text-sm ${column.key === 'actions' ? '' : 'capitalize'}`}
                    >
                    {row[column.key] !== undefined && row[column.key] !== null ? row[column.key] : (
                      column.key === "actions" ? (
                        <Link 
                          href={`carts/${row.id}`}
                          className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium text-xs md:text-sm whitespace-nowrap"
                        >
                          <Eye className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span className="hidden sm:inline">View</span>
                        </Link>
                      ) : ''
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
