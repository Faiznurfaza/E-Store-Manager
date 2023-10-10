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

export function CategoryChart() {
  const { categoryRecords, isLoading, isError } = useProducts();

  const options = {
    indexAxis: "x" as const,
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Category",
      },
    },
  };

  const data = {
    labels: Object.keys(categoryRecords),
    datasets: [
      {
        label: "",
        data: Object.values(categoryRecords),
        borderColor: "rgb(96, 174, 247)",
        backgroundColor: "rgba(98, 203, 235, 0.753)",
      },
    ],
  };

  return (
    <div style={{ position: "relative" }}>
      {isLoading || isError ? (
        <ChartSkeleton name="Category" />
      ) : (
        <Bar
          options={options}
          data={data}
          style={{ maxWidth: "650px", height: "800px" }}
        />
      )}
    </div>
  );
}
