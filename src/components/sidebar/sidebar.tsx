"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconShoppingCart,
  IconBuildingWarehouse,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <aside className="flex bg-white border-2 border-slate-300 border-collapse p-5 min-h-screen w-3/6 md:w-1/4">
      <ul>
        <li className="mb-6">
          <Link href="/" passHref legacyBehavior>
            <a className="flex space-x-4">
              <IconLayoutDashboard />
              <span className="text-md">Dashboard</span>
            </a>
          </Link>
        </li>
        <li className="mb-6">
          <Link href="/products" passHref legacyBehavior>
            <a className="flex space-x-4">
              <IconBuildingWarehouse />
              <span className="text-md">Products</span>
            </a>
          </Link>
        </li>
        <li className="mb-6">
          <Link href="/carts" passHref legacyBehavior>
            <a className="flex space-x-4">
              <IconShoppingCart />
              <span className="text-md">Carts</span>
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
