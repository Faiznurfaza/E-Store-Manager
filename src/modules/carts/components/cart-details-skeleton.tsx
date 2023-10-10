import { Space } from "antd";
import DynamicLoaderTable from "@/components/loading/dynamic-loader-table";
import { Skeleton } from "@/components/ui/skeleton";

export function CartDetailsSkeleton({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <main className="rounded-md mb-4 p-4">
      <h2 className="text-3xl font-semibold mb-4 ml-2">
        <Skeleton className="h-10 w-[150px]" />
      </h2>
      <div className="flex">
        <Space direction="horizontal" wrap={true} align="center" size={32}>
          <div style={{ width: "450px", height: "200px" }} className="border rounded-md">
            <div className="border p-4" style={{height: "50px"}}>Details</div>
            <div className="grid grid-cols-2 gap-4 text-justify p-4">
              <div className="col-span-1">
                <p className="mb-2">User</p>
                <span className="font-semibold">
                  <Skeleton className="h-4 w-[150px]" />
                </span>
              </div>
              <div className="col-span-1">
                <p className="mb-2 ">Added on</p>
                <span className="font-semibold">
                  <Skeleton className="h-4 w-[150px]" />
                </span>
              </div>

              <div className="col-span-1">
                <p className="mb-2 ">Total Items</p>
                <span className="font-semibold">
                  <Skeleton className="h-4 w-[150px]" />
                </span>
              </div>
              <div className="col-span-1">
                <p className="mb-2 ">Total Price</p>
                <span className="font-semibold text-lg">
                  <Skeleton className="h-4 w-[150px]" />
                </span>
              </div>
            </div>
          </div>
          <DynamicLoaderTable
            headers={[
              "Product Name",
              "Quantity",
              "Price",
              "Total Price",
              "Discount",
              "Discounted Total",
            ]}
            isLoading={isLoading}
            isError={isError}
          />
        </Space>
      </div>
    </main>
  );
}
