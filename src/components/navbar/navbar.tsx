"use client";

import Link from "next/link";
import { IconBrandShopee } from "@tabler/icons-react";
import { ModeToggle } from "../ui/toggle-theme";
import { useDarkMode } from "@/utils/useDarkMode";

export default function Navbar() {
  const { isDarkMode } = useDarkMode();

  return (
    <nav
      className={`flex ${
        isDarkMode
          ? "bg-gray-900 border-gray-600"
          : "bg-white text-black border-slate-300"
      } border-y-2 border-collapse`}
    >
      <ul className="flex items-center justify-between w-full">
        <li className="py-2 px-6">
          <Link href="/" passHref legacyBehavior>
            <a className="flex space-x-2">
              <IconBrandShopee width={50} height={50} />
            </a>
          </Link>
        </li>
        <li className="py-2 px-4">
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
