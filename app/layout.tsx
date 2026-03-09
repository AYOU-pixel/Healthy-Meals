import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Healthy Meals",
  description: "Healthy food landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
       <link rel="icon" href="/logos.png" type="image/png" />
      <body className="bg-[#f6f6f6] text-gray-800">
        {children}
      </body>
    </html>
  );
}
