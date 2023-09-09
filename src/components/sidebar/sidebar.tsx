"use client";

import * as React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="flex-none min-h-screen w-1/4 bg-white border border-collapse p-5">
      <ul>
        <li className="mb-4">
          <Link href="/" passHref legacyBehavior>
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/products" passHref legacyBehavior>
            Products
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/carts" passHref legacyBehavior>
            Carts
          </Link>
        </li>
      </ul>
    </nav>
  );
}
