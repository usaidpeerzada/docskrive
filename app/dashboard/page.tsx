"use client";

import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/NavBar";

export default function Page() {
  const sampleInitialData = { document: "" };
  const [isSettingsOpen, setSettingsOpen] = React.useState(false);
  return (
    <div className="bg-teal-600 text-light-primary dark:bg-gray-900 dark:text-white">
      <Navbar
        onSettingsClick={() => setSettingsOpen(true)}
        showSettingsButton={true}
      />
      <Dashboard
        initialData={sampleInitialData}
        isSettingOpen={isSettingsOpen}
        setSettingOpen={(val) => setSettingsOpen(val)}
      />
    </div>
  );
}
