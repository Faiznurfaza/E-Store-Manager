"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";

import { LayoutDashboard, PackageSearch, ShoppingCart } from "lucide-react";
import { useDarkMode } from "@/utils/use-darkmode";
import { RouteChecker } from "@/utils/route-checker";

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
        showSidebar ? "lg:w-2/3 xl:w-2/3" : ""
      }`}
    >
      <div className="mb-4 lg:hidden cursor-pointer" onClick={toggleSidebar}>
        ☰
      </div>
      <ul className={`mt-4 space-y-6 ${showSidebar ? "" : "hidden"} lg:block`}>
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
  isDarkMode
}: {
  href: string;
  icon: ReactNode;
  label: string;
  isDarkMode: boolean;
  
}) {

  const currentURL = RouteChecker();
  const isActive = currentURL === href;

  const activeItemClass = `flex items-center space-x-4 h-8 transition-all duration-300 bg-gray-400 shadow-md scale-105`;
  const hoverItemClass = `flex items-center space-x-4 h-8 transition-all duration-300 hover:bg-slate-400 hover:shadow-md hover:scale-105`;

  
  const itemStyle = isActive ? activeItemClass : hoverItemClass;
  return (
    <li>
      <Link href={href} passHref legacyBehavior>
        <a className={itemStyle}>
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
