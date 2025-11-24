import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { HomeButton } from "@/components/ui/home-button";
import { ThemeProvider } from "@/components/theme-provider";

// Premium Typography Setup
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"], // Complete weight range for flexibility
  display: "swap", // Prevent invisible text during font loading
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"], // Light to bold for body text
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Menify - Simplify Your Menu | Sistem Menu Digital QR untuk Restoran",
  description: "Platform SaaS menu digital berbasis QR code untuk restoran modern. Setup dalam 5 menit, tanpa aplikasi. Mudah dikelola dan profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased font-body tracking-tight`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <HomeButton />
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
