"use client";

import { useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Bar } from "react-chartjs-2";

import { useProducts } from "../hooks/use-products";
import { ChartSkeleton } from "./chart-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, TrendingUp, TrendingDown, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export function CategoryChart() {
  const { categoryRecords, isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [minProducts, setMinProducts] = useState(0);
  const chartRef = useRef<any>(null);

  const filteredCategories = Object.entries(categoryRecords)
    .filter(
      ([category, count]) =>
        category.toLowerCase().includes(searchTerm.toLowerCase()) &&
        count >= minProducts
    )
    .sort(([, a], [, b]) => (sortOrder === "desc" ? b - a : a - b));

  const filteredCategoryRecords = Object.fromEntries(filteredCategories);

  const handleBarClick = (event: ChartEvent, elements: ActiveElement[]) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const category = Object.keys(filteredCategoryRecords)[index];
      setSelectedCategory(selectedCategory === category ? null : category);
    }
  };

  const handleZoomIn = () => {
    if (chartRef.current) {
      chartRef.current.zoom(1.2);
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current) {
      chartRef.current.zoom(0.8);
    }
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  const totalProducts = Object.values(filteredCategoryRecords).reduce(
    (a: number, b: number) => a + b,
    0
  );
  const avgProducts = totalProducts / Object.keys(filteredCategoryRecords).length;

  const options = {
    indexAxis: "x" as const,
    maintainAspectRatio: false,
    responsive: true,
    onClick: handleBarClick,
    plugins: {
      title: {
        display: true,
        text: selectedCategory
          ? `Products by Category - ${selectedCategory} (${filteredCategoryRecords[selectedCategory]} products)`
          : "Products by Category (Click bars, scroll to zoom)",
        color: "#10b981",
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const count = context.parsed.y;
            const percentage = ((count / totalProducts) * 100).toFixed(1);
            const vsAvg = ((count / avgProducts - 1) * 100).toFixed(1);
            return [
              `Products: ${count}`,
              `Share: ${percentage}%`,
              `vs Avg: ${vsAvg > "0" ? "+" : ""}${vsAvg}%`,
            ];
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x" as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x" as const,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
          font: { size: 12 },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          color: "#374151",
          font: { size: 12 },
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  const data = {
    labels: Object.keys(filteredCategoryRecords),
    datasets: [
      {
        label: "Products",
        data: Object.values(filteredCategoryRecords),
        borderColor: Object.keys(filteredCategoryRecords).map((category) =>
          category === selectedCategory ? "rgb(5, 150, 105)" : "rgb(34, 197, 94)"
        ),
        backgroundColor: Object.keys(filteredCategoryRecords).map((category) =>
          category === selectedCategory
            ? "rgba(5, 150, 105, 0.8)"
            : "rgba(34, 197, 94, 0.6)"
        ),
        borderWidth: Object.keys(filteredCategoryRecords).map((category) =>
          category === selectedCategory ? 3 : 1
        ),
      },
    ],
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      {isLoading || isError ? (
        <ChartSkeleton name="Category" />
      ) : (
        <>
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 px-2"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant={sortOrder === "desc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOrder("desc")}
                >
                  <TrendingDown className="w-4 h-4 mr-1" />
                  High
                </Button>
                <Button
                  variant={sortOrder === "asc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOrder("asc")}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Low
                </Button>
                {selectedCategory && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground whitespace-nowrap">
                Min Products:
              </label>
              <Input
                type="number"
                min="0"
                value={minProducts}
                onChange={(e) => setMinProducts(parseInt(e.target.value) || 0)}
                className="w-24 h-8"
              />
              {minProducts > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMinProducts(0)}
                  className="h-8"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
          <div className="w-full" style={{ height: "500px" }}>
            <Bar ref={chartRef} options={options} data={data} />
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-muted-foreground">Categories</div>
              <div className="text-lg font-semibold">
                {Object.keys(filteredCategoryRecords).length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Total Products</div>
              <div className="text-lg font-semibold">{totalProducts}</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Average</div>
              <div className="text-lg font-semibold">{avgProducts.toFixed(1)}</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Top Category</div>
              <div className="text-lg font-semibold truncate">
                {filteredCategories[0]?.[0] || "-"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
