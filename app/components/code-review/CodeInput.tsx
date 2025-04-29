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
import {
  Loader2,
  GitBranch,
  Code,
  Upload,
  Github,
  InfoIcon,
  Image,
  Folder,
} from "lucide-react";
import { languages } from "@/utils/utils";
import FileUpload from "../FileUpload";
import { checkIfUrlIsValid } from "@/utils/utils";
import { analyzeCode as analyzeCodeAPI } from "@/utils/api";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

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
  const [pullRequestUrl, setPullRequestUrl] = useState("");
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

  const isPullRequestUrlValid = (url: string): boolean => {
    // Check for GitHub pull requests
    if (url.match(/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+/)) return true;

    // Check for GitLab merge requests
    if (url.match(/gitlab\.com\/[^\/]+\/[^\/]+\/-\/merge_requests\/\d+/))
      return true;

    // Check for Azure DevOps pull requests
    if (
      url.match(
        /dev\.azure\.com\/[^\/]+\/[^\/]+\/_git\/[^\/]+\/pullrequest\/\d+/
      )
    )
      return true;
    if (
      url.match(
        /[^\/]+\.visualstudio\.com\/[^\/]+\/_git\/[^\/]+\/pullrequest\/\d+/
      )
    )
      return true;

    // Check for Gerrit code reviews
    if (url.match(/[^\/]+\/c\/[^\/]+\/\+\/\d+/)) return true;

    return false;
  };

  const handleAnalyze = async () => {
    // Validate input
    if (
      inputType === "pullrequest" &&
      (!pullRequestUrl || !isPullRequestUrlValid(pullRequestUrl))
    ) {
      onAnalysisError("Please enter a valid pull request URL");
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

    let apiKey: string | null = null;
    let selectedModel: any = null;

    if (typeof window !== "undefined") {
      apiKey = localStorage.getItem("apiKey");
      const storedModel = localStorage.getItem("selectedModel");
      if (storedModel) {
        try {
          selectedModel = JSON.parse(storedModel);
        } catch (e) {
          console.error("Error parsing stored model:", e);
          selectedModel = { key: "openai", value: "gpt-4o" };
        }
      } else {
        selectedModel = { key: "openai", value: "gpt-4o" };
      }
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
        pullRequestUrl:
          inputType === "pullrequest" ? pullRequestUrl : undefined,
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
          <TabsTrigger value="pullrequest" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Pull Request
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
                  onChange={(e: any) => setCodeText(e.target.value)}
                  value={codeText}
                  disabled={isAnalyzing}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pullrequest" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="pr-url">Pull Request URL:</Label>
              <Input
                id="pr-url"
                placeholder="https://github.com/username/repo/pull/123"
                onChange={(e: any) => setPullRequestUrl(e.target.value)}
                value={pullRequestUrl}
                disabled={isAnalyzing}
              />
              <p className="text-xs text-muted-foreground">
                Supports GitHub, GitLab, Azure DevOps, and Gerrit pull requests
              </p>
            </div>

            <div className="mt-4 bg-muted/20 p-4 rounded-md">
              <div className="flex items-center space-x-2 mb-2">
                <InfoIcon className="h-4 w-4 text-blue-500" />
                <h3 className="text-sm font-medium">Supported platforms:</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <span>GitHub: /username/repo/pull/123</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image className="h-4 w-4" />
                  <span>GitLab: /username/repo/-/merge_requests/123</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Folder className="h-4 w-4" />
                  <span>
                    Azure DevOps: /org/project/_git/repo/pullrequest/123
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Gerrit: /c/project/+/123</span>
                </div>
              </div>
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
