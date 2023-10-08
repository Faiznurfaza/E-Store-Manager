"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";

import { LayoutDashboard, PackageSearch, ShoppingCart } from 'lucide-react';
import { useDarkMode } from "@/utils/use-darkmode";

export default function Sidebar() {
  const { isDarkMode } = useDarkMode();
  const [showSidebar, setShowSidebar] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <aside
      className={`border-r border-t-2 border-inherit max-w-[350px] ${
        isDarkMode ? "text-white bg-gray-900" : "text-black bg-white"
      } p-5 min-h-screen w-3/6 md:w-1/4 ${
        showSidebar ? "lg:w-2/3 xl:w-2/3" : "" // Expand the width when active
      }`}
    >
      <div className="mb-4 lg:hidden cursor-pointer" onClick={toggleSidebar}>
        ☰
      </div>
      <ul className={`space-y-6 ${showSidebar ? "" : "hidden"} lg:block`}>
        <SidebarItem
          href="/"
          icon={<LayoutDashboard />}
          label="Dashboard"
          isDarkMode={isDarkMode}
        />
        <SidebarItem
          href="/products"
          icon={<PackageSearch />}
          label="Products"
          isDarkMode={isDarkMode}
        />
        <SidebarItem
          href="/carts"
          icon={<ShoppingCart />}
          label="Carts"
          isDarkMode={isDarkMode}
        />
      </ul>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  isDarkMode,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  isDarkMode: boolean;
}) {
  return (
    <li>
      <Link href={href} passHref legacyBehavior>
        <a className="flex items-center space-x-4">
          {icon}
          <span
            className={`text-md ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {label}
          </span>
        </a>
      </Link>
    </li>
  );
}
