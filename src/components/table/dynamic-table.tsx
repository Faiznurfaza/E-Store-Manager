import { TableProps } from "./dynamic-table.types";

export default function DynamicTable({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-2 border-b-2">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 border-b capitalize">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
