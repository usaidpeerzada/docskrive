// app/dashboard/page.tsx
"use client";

import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { FileText } from "lucide-react";

export default function Page() {
  const sampleInitialData = { document: "" };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar
        onSettingsClick={() => {}}
        showSettingsButton={true}
        isTranslateCodePage={false}
      />

      <div className="container py-6">
        <div className="max-w-3xl flex">
          <div className="mt-1 mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Document Your Code
            </h1>
            <p className="text-muted-foreground">
              Generate comprehensive documentation from your code or GitHub
              repositories using AI.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <Dashboard
          initialData={sampleInitialData}
          isSettingOpen={false}
          setSettingOpen={() => {}}
        />

        <div className="container text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Review the document before using it in production.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
