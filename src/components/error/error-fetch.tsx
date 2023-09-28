"use client";

export default function ErrorFetchTable() {
  return (
    <div className="rounded-md p-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2">Product Name</th>
              <th className="px-4 py-2 border-b-2">Brand</th>
              <th className="px-4 py-2 border-b-2">Price</th>
              <th className="px-4 py-2 border-b-2">Stock</th>
              <th className="px-4 py-2 border-b-2">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b-2" colSpan={5}>
                <div className="flex justify-center items-center h-full text-gray-600">
                  Loading...
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
