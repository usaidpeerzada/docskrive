// pages/index.js
"use client";
import Link from "next/link";
import Dashboard from "./components/Dashboard";

export default function Page() {
  const sampleInitialData = { document: "" };
  ("min-h-screen p-6 flex bg-light-background text-light-primary font-sans dark:bg-gray-900 dark:text-white");
  return (
    <div className="bg-light-background text-light-primary dark:bg-gray-900 dark:text-white">
      <Dashboard initialData={sampleInitialData} />
      <p className="text-center text-white dark:text-gray-600 pb-6">
        <span>made by </span>
        <Link href="https://www.usaid.dev">usaid.dev</Link>
      </p>
    </div>
  );
}
