import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "@/components/head";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import Providers from "@/utils/provider";
import StyledComponentsRegistry from '../lib/AntdRegistry';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Store Manager",
  description: "Manage your e-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex">
            <Sidebar />
            <Providers><StyledComponentsRegistry>{children}</StyledComponentsRegistry></Providers>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
