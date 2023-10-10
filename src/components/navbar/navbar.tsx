"use client";

import Link from "next/link";
import { IconBrandShopee } from "@tabler/icons-react";
import { ModeToggle } from "../ui/toggle-theme";
import { useDarkMode } from "@/utils/use-darkmode";

export default function Navbar() {
  const { isDarkMode } = useDarkMode();

  return (
    <nav
      className={`flex justify-between items-center py-2 px-4 min-w-[720px] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } shadow-md`}
    >
      <Link href="/" passHref legacyBehavior>
        <a className="flex items-center space-x-2">
          <IconBrandShopee width={50} height={50} />
        </a>
      </Link>
      <div className="flex items-center space-x-4">
        <ModeToggle />
      </div>
    </nav>
  );
}
