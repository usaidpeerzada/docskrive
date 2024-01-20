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
  console.log(process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL);
  return (
    <html lang="en">
      <head>
        <script
          defer
          src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
