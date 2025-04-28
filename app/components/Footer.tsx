import Link from "next/link";
import React from "react";
import { cn } from "../theme-config";

export default function Footer() {
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container m-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground">
          made by{" "}
          <Link
            href="https://www.usaid.dev"
            className={cn(
              "font-medium underline-offset-4 hover:underline text-foreground"
            )}
          >
            usaid.dev
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://usaid.dev/contact"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            contact
          </Link>
          <div className="h-4 w-px bg-border" />
          <Link
            href="/faq"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}
