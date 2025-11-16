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
import { Search, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export function BrandChart() {
  const { brandRecords, isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const chartRef = useRef<any>(null);

  const filteredBrands = Object.entries(brandRecords)
    .filter(([brand]) =>
      brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(([, a], [, b]) => (sortOrder === "desc" ? b - a : a - b));

  const filteredBrandRecords = Object.fromEntries(filteredBrands);

  const handleBarClick = (event: ChartEvent, elements: ActiveElement[]) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const brand = Object.keys(filteredBrandRecords)[index];
      setSelectedBrand(selectedBrand === brand ? null : brand);
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

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    responsive: true,
    onClick: handleBarClick,
    plugins: {
      title: {
        display: true,
        text: selectedBrand
          ? `Products by Brand - ${selectedBrand} (${filteredBrandRecords[selectedBrand]} products)`
          : "Products by Brand (Click bars, scroll to zoom)",
        color: "#3b82f6",
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
            const brand = context.label;
            const count = context.parsed.x;
            const total = Object.values(filteredBrandRecords).reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((count / total) * 100).toFixed(1);
            return [`Products: ${count}`, `Market Share: ${percentage}%`];
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "y" as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "y" as const,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
        },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          color: "#374151",
          font: { size: 12, weight: "500" as const },
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  const data = {
    labels: Object.keys(filteredBrandRecords),
    datasets: [
      {
        label: "Products",
        data: Object.values(filteredBrandRecords),
        borderColor: Object.keys(filteredBrandRecords).map((brand) =>
          brand === selectedBrand ? "rgb(37, 99, 235)" : "rgb(59, 130, 246)"
        ),
        backgroundColor: Object.keys(filteredBrandRecords).map((brand) =>
          brand === selectedBrand ? "rgba(37, 99, 235, 0.8)" : "rgba(59, 130, 246, 0.6)"
        ),
        borderWidth: Object.keys(filteredBrandRecords).map((brand) =>
          brand === selectedBrand ? 3 : 1
        ),
      },
    ],
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      {isLoading || isError ? (
        <ChartSkeleton name="Brand" />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search brands..."
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
                Highest
              </Button>
              <Button
                variant={sortOrder === "asc" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("asc")}
              >
                Lowest
              </Button>
              {selectedBrand && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setSelectedBrand(null)}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          <div className="w-full" style={{ height: "600px" }}>
            <Bar ref={chartRef} options={options} data={data} />
          </div>
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Showing {Object.keys(filteredBrandRecords).length} of{" "}
            {Object.keys(brandRecords).length} brands •{" "}
            {Object.values(filteredBrandRecords).reduce(
              (a: number, b: number) => a + b,
              0
            )}{" "}
            total products
          </div>
        </>
      )}
    </div>
  );
}
