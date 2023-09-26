"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconShoppingCart,
  IconBuildingWarehouse,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import { useDarkMode } from "@/utils/useDarkMode";

export default function Sidebar() {
  const { isDarkMode } = useDarkMode();

  return (
    <aside
      className={`flex ${
        isDarkMode
          ? "bg-gray-900 border-gray-600"
          : "bg-white text-black border-slate-300 border-collapse"
      } border-2 p-5 min-h-screen w-3/6 md:w-1/4`}
    >
      <ul>
        <li className="mb-6">
          <Link href="/" passHref legacyBehavior>
            <a className="flex space-x-4">
              <IconLayoutDashboard />
              <span
                className={`text-md ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Dashboard
              </span>
            </a>
          </Link>
        </li>
        <li className="mb-6">
          <Link href="/products" passHref legacyBehavior>
            <a className="flex space-x-4">
              <IconBuildingWarehouse />
              <span
                className={`text-md ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Products
              </span>
            </a>
          </Link>
        </li>
        <li className="mb-6">
          <Link href="/carts" passHref legacyBehavior>
            <a className="flex space-x-4">
              <IconShoppingCart />
              <span
                className={`text-md ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Carts
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
