"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  AlertCircle,
  BarChart,
  Bug,
  Download,
  FileCode,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import IssueList from "./IssueList";
import MetricsPanel from "./MetricsPanel";
import SuggestionsList from "./SuggestionsList";
import CodeSummary from "./CodeSummary";

interface CodeReviewDashboardProps {
  results: any;
}

export default function CodeReviewDashboard({
  results,
}: CodeReviewDashboardProps) {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { summary, issues, metrics, suggestions } = results;

  const filteredIssues = Array.isArray(issues)
    ? issues.filter((issue: any) => {
        if (severityFilter !== "all" && issue.severity !== severityFilter) {
          return false;
        }
        if (typeFilter !== "all" && issue.type !== typeFilter) {
          return false;
        }
        return true;
      })
    : [];

  // Extract unique issue types for the filter
  const issueTypes = Array.isArray(issues)
    ? Array.from(new Set(issues.map((issue: any) => issue.type)))
    : [];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleDownloadReport = () => {
    try {
      // Create a JSON report with all the data
      const reportData = JSON.stringify(results, null, 2);

      // Create a Blob from the JSON string
      const blob = new Blob([reportData], { type: "application/json" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = url;
      a.download = "code-review-report.json";

      // Trigger the download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <CardDescription>Overall code quality assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {summary?.quality || 0}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  /100
                </span>
              </div>
              <div className="flex gap-1">
                {summary?.issuesCount?.critical > 0 && (
                  <Badge variant="destructive">
                    {summary.issuesCount.critical} Critical
                  </Badge>
                )}
                {summary?.issuesCount?.high > 0 && (
                  <Badge
                    variant="outline"
                    className="text-orange-500 border-orange-500"
                  >
                    {summary.issuesCount.high} High
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Complexity</CardTitle>
            <CardDescription>Code structure complexity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {metrics?.cyclomaticComplexity || 0}
              </div>
              <Badge
                variant={
                  metrics?.cyclomaticComplexity < 10
                    ? "outline"
                    : metrics?.cyclomaticComplexity < 20
                    ? "secondary"
                    : "outline"
                }
                className={
                  metrics?.cyclomaticComplexity >= 20
                    ? "text-orange-500 border-orange-500"
                    : ""
                }
              >
                {metrics?.cyclomaticComplexity < 10
                  ? "Low"
                  : metrics?.cyclomaticComplexity < 20
                  ? "Moderate"
                  : "High"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics?.linesOfCode || 0} lines of code analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Security Score
            </CardTitle>
            <CardDescription>Security vulnerability assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {summary?.securityScore || 0}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  /100
                </span>
              </div>
              <Badge
                variant={
                  summary?.securityScore >= 80
                    ? "outline"
                    : summary?.securityScore >= 60
                    ? "secondary"
                    : "outline"
                }
                className={
                  summary?.securityScore < 60
                    ? "text-orange-500 border-orange-500"
                    : ""
                }
              >
                {summary?.securityScore >= 80
                  ? "Good"
                  : summary?.securityScore >= 60
                  ? "Fair"
                  : "At Risk"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Array.isArray(issues)
                ? issues.filter((i: any) => i.type === "security").length
                : 0}{" "}
              security issues found
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Analysis Results</h2>
        <Button
          onClick={handleDownloadReport}
          variant="outline"
          size="sm"
          className="h-8"
        >
          <Download className="h-4 w-4 mr-2" /> Download Report
        </Button>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList>
          <TabsTrigger value="summary" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" /> Summary
          </TabsTrigger>
          {Array.isArray(issues) && issues.length > 0 && (
            <TabsTrigger value="issues" className="flex items-center gap-1">
              <Bug className="h-4 w-4" /> Issues{" "}
              <Badge variant="secondary" className="ml-1">
                {issues.length}
              </Badge>
            </TabsTrigger>
          )}
          <TabsTrigger value="metrics" className="flex items-center gap-1">
            <Activity className="h-4 w-4" /> Metrics
          </TabsTrigger>
          {Array.isArray(suggestions) && suggestions.length > 0 && (
            <TabsTrigger
              value="suggestions"
              className="flex items-center gap-1"
            >
              <CheckCircle2 className="h-4 w-4" /> Improvements{" "}
              <Badge variant="secondary" className="ml-1">
                {suggestions.length}
              </Badge>
            </TabsTrigger>
          )}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="summary" className="m-0 p-0">
            <CodeSummary summary={summary} metrics={metrics} />
          </TabsContent>

          <TabsContent value="issues" className="m-0 p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Severity:
                </label>
                <Select
                  value={severityFilter}
                  onValueChange={setSeverityFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Type:</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {issueTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({issues.filter((i: any) => i.type === type).length})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ScrollArea className="h-[500px] border rounded-md">
              <div className="p-4">
                <IssueList
                  issues={filteredIssues}
                  getSeverityIcon={getSeverityIcon}
                />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="metrics" className="m-0 p-0">
            <MetricsPanel metrics={metrics} />
          </TabsContent>

          <TabsContent value="suggestions" className="m-0 p-0">
            <ScrollArea className="h-[500px] border rounded-md">
              <div className="p-4">
                <SuggestionsList suggestions={suggestions} />
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          This AI-powered analysis should be used alongside human review for
          best results.
        </AlertDescription>
      </Alert>
    </div>
  );
}
