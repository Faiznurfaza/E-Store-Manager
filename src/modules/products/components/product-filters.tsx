"use client";

import React, { useState } from "react";

import { InputNumber, Select, Space } from "antd";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

import { useProductFilters } from "../hooks/use-products-filters";

const { Option } = Select;

type ProductFiltersProps = {
  brandList: string[];
  categoryList: string[];
  filteredBrands: string[] | null;
  filteredCategories: string[] | null;
  minPrice: number;
  maxPrice: number;
};

export default function ProductFilters({
  brandList,
  categoryList,
  minPrice,
  maxPrice,
}: ProductFiltersProps) {
  const { filteredBrands, filteredCategories, setFilters } =
    useProductFilters();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);

  const [selectKey, setSelectKey] = useState<number>(0); // state to re-render the component

  const handleSubmit = () => {
    setFilters({
      brand: selectedBrands || filteredBrands,
      category: selectedCategories || filteredCategories,
      minPrice: minPrice || selectedMinPrice,
      maxPrice: maxPrice || selectedMaxPrice,
    });
  };

  const handleMultiSelectChange = (
    value: { value: string; label: React.ReactNode }[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const selectedValues = value.map((item) => item.value);
    setSelectedValues(selectedValues);
  };

  const handleInputChange = (
    value: number | null,
    setSelectedValues: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setSelectedValues(value || 0);
  };

  const handleReset = () => {
    setFilters({
      brand: null,
      category: null,
      minPrice: null,
      maxPrice: null,
    });
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedMaxPrice(0);
    setSelectedMinPrice(0);
    setSelectKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="flex">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="text-white tracking-wider rounded-md px-4 py-2 mb-2 bg-blue-500 flex items-center"
          >
            <span className="mr-2">
              <ListFilter />
            </span>
            Filters
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-100">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
            </div>

            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
              key={selectKey} // key to re-render the components
            >
              <Select
                allowClear
                labelInValue
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select brands"
                optionLabelProp="label"
                onChange={(value) =>
                  handleMultiSelectChange(value, setSelectedBrands)
                }
                defaultValue={filteredBrands.map((brand) => ({
                  value: brand,
                  label: brand,
                }))}
              >
                {brandList.map((brand) => (
                  <Option key={brand} value={brand} label={brand}>
                    <Space>
                      <span>{brand}</span>
                    </Space>
                  </Option>
                ))}
              </Select>
              <Select
                allowClear
                labelInValue
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select category"
                optionLabelProp="label"
                onChange={(value) =>
                  handleMultiSelectChange(value, setSelectedCategories)
                }
                defaultValue={filteredCategories.map((category) => ({
                  value: category,
                  label: category,
                }))}
              >
                {categoryList.map((category) => (
                  <Option key={category} value={category} label={category}>
                    <Space.Compact block>
                      <span className="capitalize">{category}</span>
                    </Space.Compact>
                  </Option>
                ))}
              </Select>
              <Space.Compact
                block
                className="flex items-center justify-between flex-nowrap"
              >
                <span className="mt-2 mr-1">Price Range</span>
                <InputNumber
                  min={0}
                  placeholder="$"
                  value={selectedMinPrice || minPrice}
                  onChange={(value) =>
                    handleInputChange(value, setSelectedMinPrice)
                  }
                />
                <span>—</span>
                <InputNumber
                  min={0}
                  placeholder="$"
                  value={selectedMaxPrice || maxPrice}
                  onChange={(value) =>
                    handleInputChange(value, setSelectedMaxPrice)
                  }
                />
              </Space.Compact>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="text-white bg-blue-500"
                  onClick={handleSubmit}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  className="text-white bg-gray-900"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </Space>
          </div>
        </PopoverContent>
      </Popover>
    </main>
  );
}
