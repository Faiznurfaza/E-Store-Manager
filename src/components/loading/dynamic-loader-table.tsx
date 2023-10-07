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
    <div className="rounded-md mb-4 p-4 max-w-[950px]">
      <div className="overflow-x-auto">
        <Table className="w-full table-auto border-collapse border">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-2 border-b-2 font-bold"
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
                  className="px-4 py-8 text-justify"
                  colSpan={headers.length}
                >
                  <div className="space-y-2 flex justify-center items-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  className="px-4 py-8 text-center"
                  colSpan={headers.length}
                >
                  <div className="text-red-500">
                    Error occurred when fetching data, Try again later.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  className="px-4 py-8 text-center"
                  colSpan={headers.length}
                >
                  <div className="text-gray-600">No data available.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
