import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocSkrive",
  description: "Get your code documentation in 3 easy steps!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://us.umami.is/script.js"
          data-website-id="0904d73b-c98f-4fef-952c-437fe0ce60e6"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
