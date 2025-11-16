import { DynamicLoaderProps } from "./dynamic-loader-types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function DynamicLoaderTable({
  headers,
  isLoading,
  isError,
}: DynamicLoaderProps) {
  return (
    <div className="rounded-lg border bg-card mb-4">
      <div className="overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-3 font-semibold text-foreground"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  className="px-4 py-16 text-center"
                  colSpan={headers.length}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                    <p className="text-muted-foreground">Loading data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  className="px-4 py-16 text-center"
                  colSpan={headers.length}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-destructive font-medium">
                      Error occurred when fetching data
                    </p>
                    <p className="text-muted-foreground text-sm">Please try again later</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  className="px-4 py-16 text-center"
                  colSpan={headers.length}
                >
                  <p className="text-muted-foreground">No data available</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
