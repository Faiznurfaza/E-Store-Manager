"use client";

import React, { useState } from "react";

import { InputNumber, Select, Space } from "antd";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import useProductFilters from "../hooks/use-products-filters";

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

  const handleSubmit = () => {
    setFilters({
      brand: selectedBrands || filteredBrands,
      category: selectedCategories || filteredCategories,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
    });
  };

  const handleChangeBrands = (
    value: { value: string; label: React.ReactNode }[]
  ) => {
    const selectedValues = value.map((item) => item.value);
    setSelectedBrands(selectedValues);
  };

  const handleChangeCategories = (
    value: { value: string; label: React.ReactNode }[]
  ) => {
    const selectedValues = value.map((item) => item.value);
    setSelectedCategories(selectedValues);
  };

  return (
    <main>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-md p-3">
            Filter
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
            >
              <Select
                allowClear
                labelInValue
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select brands"
                optionLabelProp="label"
                onChange={handleChangeBrands}
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
                onChange={handleChangeCategories}
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
                <InputNumber min={0} placeholder="$" value={minPrice} />
                <span>—</span>
                <InputNumber min={100000} placeholder="$" value={maxPrice} />
              </Space.Compact>
              <Button variant="outline" onClick={handleSubmit}>
                Apply Filters
              </Button>
            </Space>
          </div>
        </PopoverContent>
      </Popover>
    </main>
  );
}
