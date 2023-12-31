import { BrandChart } from "@/modules/chart/components/chart-brand";
import { CategoryChart } from "@/modules/chart/components/chart-category";

export default function Home() {
  return (
    <main style={{ display: "flex", justifyContent: "center", width: "100vw"}}>
      <div>
        <BrandChart />
        <CategoryChart />
      </div>
    </main>
  );
}
