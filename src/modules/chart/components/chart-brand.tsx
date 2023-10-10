"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useProducts } from "../hooks/use-products";
import { ChartSkeleton } from "./chart-skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BrandChart() {
  const { brandRecords, isLoading, isError } = useProducts();

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Brand",
      },
    },
  };

  const data = {
    labels: Object.keys(brandRecords),
    datasets: [
      {
        label: "",
        data: Object.values(brandRecords),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div style={{ position: "relative", marginBottom: "36px" }}>
      {isLoading || isError ? (
        <ChartSkeleton name="Brand" />
      ) : (
        <Bar
          options={options}
          data={data}
          style={{ maxWidth: "600px", height: "800px" }}
        />
      )}
    </div>
  );
}
