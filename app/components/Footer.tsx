import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto p-4 text-center bg-gray-200">
      <p className="text-sm text-gray-600">
        <span>made by </span>
        <Link href="https://www.usaid.dev" className="hover:underline">
          usaid.dev
        </Link>{" "}
        |{" "}
        <Link href="https://usaid.dev/contact" className="hover:underline">
          contact
        </Link>{" "}
        |{" "}
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
      </p>
    </footer>
  );
}
