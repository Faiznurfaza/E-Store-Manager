import { BrandChart } from "@/modules/chart/components/chart-brand";
import { CategoryChart } from "@/modules/chart/components/chart-category";

export default function Home() {
  return (
    <main className="flex justify-center w-full p-4 md:p-6">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid gap-8">
          <BrandChart />
          <CategoryChart />
        </div>
      </div>
    </main>
  );
}
