"use client";

import React from "react";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { InputNumber, Select, Space } from "antd";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useForm } from "react-hook-form";

import {
  SetValues,
  parseAsStringEnum,
  parseAsInteger,
} from "next-usequerystate";

import { Button } from "@/components/ui/button";

import useProductFilters from "../hooks/use-products-filters";
import usePaginatedCartData from "@/modules/carts/hooks/useCartData";

const { Option } = Select;

type ProductFiltersProps = {
  brandList: string[];
  categoryList: string[];
  filteredBrands: string[] | null;
  filteredCategories: string[] | null;
  minPrice: number;
  maxPrice: number;
  setFilterList: {
    brand: string[];
    category: string[];
    minPrice: number;
    maxPrice: number;
  };
};

export default function ProductFilters({
  brandList,
  categoryList,
  minPrice,
  maxPrice,
}: // filteredBrands,
// filteredCategories,

// setFilterList,
ProductFiltersProps) {
  return (
    <main suppressHydrationWarning={true}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-md p-3">
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
            </div>
            <form>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Select
                  allowClear
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select brands"
                  optionLabelProp="label"
                >
                  {brandList.map((brand) => (
                    <Option value={brand} label={brand}>
                      <Space>
                        <span>{brand}</span>
                      </Space>
                    </Option>
                  ))}
                </Select>
                <Select
                  allowClear
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select category"
                  optionLabelProp="label"
                >
                  {categoryList.map((category) => (
                    <Option value={category} label={category}>
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
                  <InputNumber min={0} placeholder="$" />
                  <span>—</span>
                  <InputNumber min={100000} placeholder="$" />
                </Space.Compact>
              </Space>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </main>
  );
}
