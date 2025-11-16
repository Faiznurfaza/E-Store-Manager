"use client";

import dynamic from "next/dynamic";

const BrandChart = dynamic(
  () => import("@/modules/chart/components/chart-brand").then((mod) => ({ default: mod.BrandChart })),
  { ssr: false }
);

const CategoryChart = dynamic(
  () => import("@/modules/chart/components/chart-category").then((mod) => ({ default: mod.CategoryChart })),
  { ssr: false }
);

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
