import React from "react";
import Dashboard from "../components/Dashboard";

export default function page() {
  const sampleInitialData = { document: "" };
  return (
    <div className="bg-teal-600 text-light-primary dark:bg-gray-900 dark:text-white">
      <Dashboard initialData={sampleInitialData} />
    </div>
  );
}
