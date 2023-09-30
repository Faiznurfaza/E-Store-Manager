import { DynamicLoaderProps } from "./dynamic-loader-types";

export default function DynamicLoaderTable({
  headers,
  isLoading,
  isError,
}: DynamicLoaderProps) {
  return (
    <div className="rounded-md mb-4 p-4 min-w-full">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2 border-b-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-8 text-center" colSpan={headers.length}>
                  <div className="text-gray-600">Loading...</div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td className="px-4 py-8 text-center" colSpan={headers.length}>
                  <div className="text-red-500">
                    Error occurred when fetching data, try again later.
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td className="px-4 py-8 text-center" colSpan={headers.length}>
                  <div className="text-gray-600">No data available.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
