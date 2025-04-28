"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Loader2, Github, Code, Upload } from "lucide-react";
import { languages } from "@/utils/utils";
import FileUpload from "../FileUpload";
import { checkIfUrlIsValid } from "@/utils/utils";
import { analyzeCode as analyzeCodeAPI } from "@/utils/api";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { getApiKey } from "@/utils/storage";

interface CodeInputProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (results: any) => void;
  onAnalysisError: (error: string) => void;
  isAnalyzing: boolean;
}

export default function CodeInput({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  isAnalyzing,
}: CodeInputProps) {
  const [inputType, setInputType] = useState("code");
  const [githubUrl, setGithubUrl] = useState("");
  const [codeText, setCodeText] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [analysisOptions, setAnalysisOptions] = useState({
    quality: true,
    security: true,
    performance: true,
    style: true,
    documentation: true,
    depth: "standard",
  });

  const handleFileUpload = (text: string) => {
    setCodeText(text);
    setInputType("code");
  };

  const handleDepthChange = (value: string) => {
    setAnalysisOptions({
      ...analysisOptions,
      depth: value,
    });
  };

  const toggleOption = (option: string) => {
    setAnalysisOptions({
      ...analysisOptions,
      [option]: !analysisOptions[option as keyof typeof analysisOptions],
    });
  };

  const handleAnalyze = async () => {
    // Validate input
    if (
      inputType === "github" &&
      (!githubUrl || !checkIfUrlIsValid(githubUrl))
    ) {
      onAnalysisError("Please enter a valid GitHub URL");
      return;
    }

    if (inputType === "code" && !codeText.trim()) {
      onAnalysisError("Please enter some code to analyze");
      return;
    }

    // Validate if at least one analysis option is selected
    const hasSelectedOptions = Object.values({
      quality: analysisOptions.quality,
      security: analysisOptions.security,
      performance: analysisOptions.performance,
      style: analysisOptions.style,
      documentation: analysisOptions.documentation,
    }).some((value) => value);

    if (!hasSelectedOptions) {
      onAnalysisError("Please select at least one analysis category");
      return;
    }

    const apiKey = getApiKey();
    let selectedModel: object | any;
    if (typeof window !== "undefined") {
      selectedModel =
        localStorage && localStorage.getItem("selectedModel") !== ""
          ? JSON.parse(localStorage.getItem("selectedModel") || "{}")
          : {
              key: "openai",
              value: "gpt-3.5-turbo-1106",
            };
    }

    if (!apiKey) {
      onAnalysisError("Please add an API key in settings");
      return;
    }

    onAnalysisStart();

    try {
      // Prepare data for API
      const analysisData = {
        sourceType: inputType,
        github: inputType === "github" ? githubUrl : undefined,
        code: inputType === "code" ? codeText : undefined,
        language,
        options: analysisOptions,
        apiKey,
        selectedModel,
      };

      // Call analysis API
      const results = await analyzeCodeAPI(analysisData);
      onAnalysisComplete(results);
    } catch (error) {
      console.error("Error during code analysis:", error);
      onAnalysisError(
        error instanceof Error
          ? error.message
          : "Analysis failed. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="code" onValueChange={setInputType} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Code
          </TabsTrigger>
          <TabsTrigger value="github" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub
          </TabsTrigger>
        </TabsList>

        <div className="space-y-6">
          <TabsContent value="code" className="space-y-4 mt-0">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Upload Code File
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload handleFileChange={handleFileUpload} />
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="code-input">Or paste your code:</Label>
                <Textarea
                  id="code-input"
                  placeholder="Paste your code here..."
                  className="font-mono text-sm h-60"
                  onChange={(e) => setCodeText(e.target.value)}
                  value={codeText}
                  disabled={isAnalyzing}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="github-url">GitHub file URL:</Label>
              <Input
                id="github-url"
                placeholder="https://github.com/username/repo/blob/main/path/to/file.js"
                onChange={(e) => setGithubUrl(e.target.value)}
                value={githubUrl}
                disabled={isAnalyzing}
              />
              <p className="text-xs text-muted-foreground">
                Enter the URL of a specific file on GitHub
              </p>
            </div>
          </TabsContent>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Analysis Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language-select">Language:</Label>
                  <Select
                    disabled={isAnalyzing}
                    value={language}
                    onValueChange={setLanguage}
                  >
                    <SelectTrigger id="language-select">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depth-select">Analysis Depth:</Label>
                  <Select
                    disabled={isAnalyzing}
                    value={analysisOptions.depth}
                    onValueChange={handleDepthChange}
                  >
                    <SelectTrigger id="depth-select">
                      <SelectValue placeholder="Select depth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quick">
                        Quick (Surface issues)
                      </SelectItem>
                      <SelectItem value="standard">
                        Standard (Balanced)
                      </SelectItem>
                      <SelectItem value="deep">
                        Deep (Thorough analysis)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Focus areas to include in analysis:</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Select specific areas to analyze or check all for
                  comprehensive review
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="quality"
                      checked={analysisOptions.quality}
                      onCheckedChange={() => toggleOption("quality")}
                      disabled={isAnalyzing}
                    />
                    <label
                      htmlFor="quality"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Code Quality
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="security"
                      checked={analysisOptions.security}
                      onCheckedChange={() => toggleOption("security")}
                      disabled={isAnalyzing}
                    />
                    <label
                      htmlFor="security"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Security
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="performance"
                      checked={analysisOptions.performance}
                      onCheckedChange={() => toggleOption("performance")}
                      disabled={isAnalyzing}
                    />
                    <label
                      htmlFor="performance"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Performance
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="style"
                      checked={analysisOptions.style}
                      onCheckedChange={() => toggleOption("style")}
                      disabled={isAnalyzing}
                    />
                    <label
                      htmlFor="style"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Style & Best Practices
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="documentation"
                      checked={analysisOptions.documentation}
                      onCheckedChange={() => toggleOption("documentation")}
                      disabled={isAnalyzing}
                    />
                    <label
                      htmlFor="documentation"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Documentation
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAnalysisOptions({
                        ...analysisOptions,
                        quality: true,
                        security: true,
                        performance: true,
                        style: true,
                        documentation: true,
                      });
                    }}
                    disabled={isAnalyzing}
                    className="h-8 text-xs"
                  >
                    Select All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="min-w-32"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing
                </>
              ) : (
                "Analyze Code"
              )}
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
