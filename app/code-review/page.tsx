"use client";

import React, { useState } from "react";
import Navbar from "../components/NavBar";
import CodeReviewDashboard from "../components/code-review/CodeReviewDashboard";
import CodeInput from "../components/code-review/CodeInput";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../components/ui/button";
import { ArrowLeft, FileCode2 } from "lucide-react";

export default function CodeReviewPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { toast } = useToast();

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = (results: any) => {
    setIsAnalyzing(false);
    setAnalysisResults(results);
    toast({
      title: "Analysis Complete",
      description: "Your code has been analyzed successfully.",
    });
  };

  const handleAnalysisError = (error: string) => {
    setIsAnalyzing(false);
    toast({
      title: "Analysis Failed",
      description: error,
      variant: "destructive",
    });
  };

  const handleReset = () => {
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar
        onSettingsClick={() => setSettingsOpen(true)}
        showSettingsButton={true}
      />

      <div className="container py-6">
        <div className="max-w-2xl ml-28 flex">
          <div className="mt-1 mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileCode2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Code Review
            </h1>
            <p className="text-muted-foreground">
              Analyze your code for performance, security, and best practices
              using AI.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 pb-12 max-w-6xl">
        {!analysisResults ? (
          // Code Input Section
          <CodeInput
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            onAnalysisError={handleAnalysisError}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          // Analysis Results Section
          <div className="space-y-6">
            <Button variant="outline" onClick={handleReset} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Input
            </Button>
            <CodeReviewDashboard results={analysisResults} />
          </div>
        )}
      </main>

      <div className="text-center mb-10 text-sm text-muted-foreground px-4">
        <p className="max-w-xl mx-auto">
          Our AI code review helps detect potential issues but should be used
          alongside human review for best results.
        </p>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
}
