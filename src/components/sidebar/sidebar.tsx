"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";

import { LayoutDashboard, PackageSearch, ShoppingCart, Menu, X } from "lucide-react";
import { useDarkMode } from "@/utils/use-darkmode";
import { RouteChecker } from "@/utils/route-checker";

export default function Sidebar() {
  const { isDarkMode } = useDarkMode();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 lg:w-64
          min-h-screen
          border-r
          transition-all duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${
            isDarkMode
              ? "bg-gray-950 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}">
          <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            E-Store Manager
          </h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 lg:p-6">
          <ul className="space-y-2">
            <SidebarItem
              href="/"
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Dashboard"
              isDarkMode={isDarkMode}
            />
            <SidebarItem
              href="/products"
              icon={<PackageSearch className="w-5 h-5" />}
              label="Products"
              isDarkMode={isDarkMode}
            />
            <SidebarItem
              href="/carts"
              icon={<ShoppingCart className="w-5 h-5" />}
              label="Carts"
              isDarkMode={isDarkMode}
            />
          </ul>
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className={`
          fixed bottom-6 right-6 lg:hidden z-30
          p-4 rounded-full shadow-lg
          transition-all duration-300
          ${
            isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
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
  const currentURL = RouteChecker();
  const isActive = currentURL === href;

  return (
    <li>
      <Link
        href={href}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg
          transition-all duration-200
          ${
            isActive
              ? isDarkMode
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
              : isDarkMode
              ? "text-gray-400 hover:bg-gray-800 hover:text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }
        `}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
}
