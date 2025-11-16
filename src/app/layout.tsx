import "../styles/globals.css";
import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import Providers from "@/utils/provider";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import { Toaster } from "sonner";

const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Store Manager",
  description: "Manage your e-commerce platform",
  icons: {
    icon: "/dashboard.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={merriweather.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-right" richColors closeButton />
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden">
              <Providers>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
              </Providers>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
