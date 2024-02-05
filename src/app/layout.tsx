import type { Metadata } from "next";
import { M_PLUS_Code_Latin, Cutive_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const bodyFont = M_PLUS_Code_Latin({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "400", "700"],
  variable: "--font-body",
});

const monoFont = Cutive_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Botond Fekete",
  description: "Botond Fekete's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="print:light dark">
      <body className={cn(bodyFont.variable, monoFont.variable)}>
        {children}
      </body>
    </html>
  );
}
