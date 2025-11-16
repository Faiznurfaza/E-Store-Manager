"use client";

import Link from "next/link";
import { IconBrandShopee } from "@tabler/icons-react";
import { ModeToggle } from "../ui/toggle-theme";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b bg-background shadow-sm">
      <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <IconBrandShopee width={40} height={40} className="text-blue-500" />
      </Link>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
}
