"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AlertCircle,
  AlertTriangle,
  BarChart,
  CheckCircle,
  Info,
  FileCode,
  Shield,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface CodeSummaryProps {
  summary: {
    issuesCount: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    quality: number;
    securityScore: number;
  };
  metrics: {
    linesOfCode: number;
    cyclomaticComplexity: number;
    maintainabilityIndex: number;
    codeSmells: number;
    duplications: number;
  };
}

export default function CodeSummary({ summary, metrics }: CodeSummaryProps) {
  const totalIssues =
    (summary?.issuesCount?.critical || 0) +
    (summary?.issuesCount?.high || 0) +
    (summary?.issuesCount?.medium || 0) +
    (summary?.issuesCount?.low || 0);

  const getQualityRating = (score: number) => {
    if (score >= 90)
      return {
        label: "Excellent",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (score >= 80)
      return {
        label: "Good",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (score >= 70)
      return { label: "Fair", variant: "secondary", className: "" };
    if (score >= 50)
      return {
        label: "Needs Work",
        variant: "outline",
        className: "text-orange-500 border-orange-500",
      };
    return { label: "Poor", variant: "destructive", className: "" };
  };

  const getSecurityRating = (score: number) => {
    if (score >= 90)
      return {
        label: "Excellent",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (score >= 80)
      return {
        label: "Good",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (score >= 70)
      return { label: "Fair", variant: "secondary", className: "" };
    if (score >= 50)
      return {
        label: "Needs Work",
        variant: "outline",
        className: "text-orange-500 border-orange-500",
      };
    return { label: "Poor", variant: "destructive", className: "" };
  };

  const getComplexityRating = (complexity: number) => {
    if (complexity < 10)
      return {
        label: "Low",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (complexity < 20)
      return { label: "Moderate", variant: "secondary", className: "" };
    return {
      label: "High",
      variant: "outline",
      className: "text-orange-500 border-orange-500",
    };
  };

  const qualityRating = getQualityRating(summary?.quality || 0);
  const securityRating = getSecurityRating(summary?.securityScore || 0);
  const complexityRating = getComplexityRating(
    metrics?.cyclomaticComplexity || 0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Quality Assessment
            </CardTitle>
            <CardDescription>
              Overall code quality and structure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Code Quality</span>
                <Badge
                  variant={qualityRating.variant as any}
                  className={qualityRating.className}
                >
                  {qualityRating.label}
                </Badge>
              </div>
              <Progress value={summary?.quality || 0} className="h-2 mb-1" />
              <p className="text-xs text-muted-foreground pt-1">
                {summary?.quality || 0}/100 -{" "}
                {summary?.quality >= 80
                  ? "Well-structured, maintainable code"
                  : summary?.quality >= 70
                  ? "Several issues need attention"
                  : "Significant improvements needed"}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Security Score</span>
                <Badge
                  variant={securityRating.variant as any}
                  className={securityRating.className}
                >
                  {securityRating.label}
                </Badge>
              </div>
              <Progress
                value={summary?.securityScore || 0}
                className="h-2 mb-1"
              />
              <p className="text-xs text-muted-foreground pt-1">
                {summary?.securityScore || 0}/100 -{" "}
                {summary?.securityScore >= 80
                  ? "Well-protected against vulnerabilities"
                  : summary?.securityScore >= 70
                  ? "Security issues need attention"
                  : "Security vulnerabilities present"}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Code Complexity</span>
                <Badge
                  variant={complexityRating.variant as any}
                  className={complexityRating.className}
                >
                  {complexityRating.label}
                </Badge>
              </div>
              <Progress
                value={
                  metrics?.cyclomaticComplexity
                    ? Math.min(100, metrics.cyclomaticComplexity * 3.33)
                    : 0
                }
                className="h-2 mb-1"
              />
              <p className="text-xs text-muted-foreground pt-1">
                Score: {metrics?.cyclomaticComplexity || 0} -{" "}
                {metrics?.cyclomaticComplexity < 10
                  ? "Easy to understand and maintain"
                  : metrics?.cyclomaticComplexity < 20
                  ? "Reasonably manageable"
                  : "Difficult to maintain"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Issues Breakdown
            </CardTitle>
            <CardDescription>
              Analysis found {totalIssues} issues
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="py-1 flex items-center justify-between border-b">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                <span className="text-sm">Critical Issues</span>
              </div>
              <div className="font-medium">
                {summary?.issuesCount?.critical || 0}
              </div>
            </div>

            <div className="py-1 flex items-center justify-between border-b">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-sm">High Severity</span>
              </div>
              <div className="font-medium">
                {summary?.issuesCount?.high || 0}
              </div>
            </div>

            <div className="py-1 flex items-center justify-between border-b">
              <div className="flex items-center">
                <Info className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-sm">Medium Severity</span>
              </div>
              <div className="font-medium">
                {summary?.issuesCount?.medium || 0}
              </div>
            </div>

            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center">
                <Info className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Low Severity</span>
              </div>
              <div className="font-medium">
                {summary?.issuesCount?.low || 0}
              </div>
            </div>

            <div className="mt-2 p-2 bg-muted/50 rounded-md text-xs text-muted-foreground">
              <div className="flex items-center mb-1">
                <FileCode className="h-3.5 w-3.5 mr-1.5" />
                <span>{metrics?.linesOfCode || 0} lines of code analyzed</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-3.5 w-3.5 mr-1.5" />
                <span>
                  Maintainability index: {metrics?.maintainabilityIndex || 0}
                  /100
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Action Recommendations
          </CardTitle>
          <CardDescription>
            Prioritized steps to improve your code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary?.issuesCount?.critical > 0 && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">
                  Critical Priority
                </AlertTitle>
                <AlertDescription className="text-sm mt-0.5">
                  Address the {summary?.issuesCount?.critical} critical issues
                  immediately as they likely represent security vulnerabilities
                  or serious bugs.
                </AlertDescription>
              </Alert>
            )}

            {summary?.issuesCount?.high > 0 && (
              <Alert className="border-orange-500 text-orange-500 py-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">
                  High Priority
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-0.5">
                  Resolve the {summary?.issuesCount?.high} high severity issues
                  in your next development cycle to prevent potential problems.
                </AlertDescription>
              </Alert>
            )}

            {metrics?.cyclomaticComplexity > 20 && (
              <Alert className="py-2">
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">
                  Complexity
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-0.5">
                  Consider refactoring complex methods to improve readability
                  and maintainability.
                </AlertDescription>
              </Alert>
            )}

            {metrics?.duplications > 5 && (
              <Alert className="py-2">
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">
                  Duplication
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-0.5">
                  Extract repeated code into reusable functions or methods to
                  reduce maintenance burden.
                </AlertDescription>
              </Alert>
            )}

            {metrics?.maintainabilityIndex < 65 && (
              <Alert className="py-2">
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">
                  Maintainability
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-0.5">
                  Improve code structure, reduce complexity, and enhance
                  documentation.
                </AlertDescription>
              </Alert>
            )}

            {summary?.issuesCount?.critical === 0 &&
              summary?.issuesCount?.high === 0 &&
              metrics?.cyclomaticComplexity <= 20 &&
              metrics?.duplications <= 5 &&
              metrics?.maintainabilityIndex >= 65 && (
                <Alert className="border-green-500 text-green-500 py-2">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-medium">
                    Great job!
                  </AlertTitle>
                  <AlertDescription className="text-sm text-muted-foreground mt-0.5">
                    Your code metrics indicate a well-structured, maintainable
                    codebase. Continue with these good practices.
                  </AlertDescription>
                </Alert>
              )}
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          This AI-powered analysis should be used alongside human review for
          best results. The analysis is based on industry best practices and
          common patterns, but may need to be adapted to your specific project
          requirements.
        </p>
      </div>
    </div>
  );
}
