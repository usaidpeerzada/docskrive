"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  Activity,
  Code,
  Copy,
  BarChart,
  FileCode,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface MetricsPanelProps {
  metrics: {
    linesOfCode: number;
    cyclomaticComplexity: number;
    maintainabilityIndex: number;
    codeSmells: number;
    duplications: number;
    [key: string]: any;
  };
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  const getComplexityRating = (complexity: number) => {
    if (complexity < 10)
      return {
        label: "Good",
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

  const getMaintainabilityRating = (index: number) => {
    if (index > 80)
      return {
        label: "Good",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (index > 60)
      return { label: "Moderate", variant: "secondary", className: "" };
    return {
      label: "Poor",
      variant: "outline",
      className: "text-orange-500 border-orange-500",
    };
  };

  const getSmellsRating = (smells: number) => {
    if (smells < 5)
      return {
        label: "Good",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (smells < 15)
      return { label: "Moderate", variant: "secondary", className: "" };
    return {
      label: "High",
      variant: "outline",
      className: "text-orange-500 border-orange-500",
    };
  };

  const getDuplicationRating = (duplication: number) => {
    if (duplication < 3)
      return {
        label: "Good",
        variant: "outline",
        className: "text-green-500 border-green-500",
      };
    if (duplication < 10)
      return { label: "Moderate", variant: "secondary", className: "" };
    return {
      label: "High",
      variant: "outline",
      className: "text-orange-500 border-orange-500",
    };
  };

  const complexityRating = getComplexityRating(
    metrics?.cyclomaticComplexity || 0
  );
  const maintainabilityRating = getMaintainabilityRating(
    metrics?.maintainabilityIndex || 0
  );
  const smellsRating = getSmellsRating(metrics?.codeSmells || 0);
  const duplicationRating = getDuplicationRating(metrics?.duplications || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileCode className="h-4 w-4" /> Code Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">
                {metrics?.linesOfCode || 0}
              </div>
              <Badge variant="outline">
                {metrics?.linesOfCode < 100
                  ? "Small"
                  : metrics?.linesOfCode < 500
                  ? "Medium"
                  : "Large"}{" "}
                codebase
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Total lines of code analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4" /> Cyclomatic Complexity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">
                {metrics?.cyclomaticComplexity || 0}
              </div>
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
                  ? Math.min(100, metrics.cyclomaticComplexity * 5)
                  : 0
              }
              className="h-1 mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Measures the structural complexity of the code
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Maintainability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">
                {metrics?.maintainabilityIndex || 0}
              </div>
              <Badge
                variant={maintainabilityRating.variant as any}
                className={maintainabilityRating.className}
              >
                {maintainabilityRating.label}
              </Badge>
            </div>
            <Progress
              value={metrics?.maintainabilityIndex || 0}
              className="h-1 mb-2"
            />
            <p className="text-xs text-muted-foreground">
              How easy the codebase is to maintain (0-100)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Code Smells
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">
                {metrics?.codeSmells || 0}
              </div>
              <Badge
                variant={smellsRating.variant as any}
                className={smellsRating.className}
              >
                {smellsRating.label}
              </Badge>
            </div>
            <Progress
              value={
                metrics?.codeSmells ? Math.min(100, metrics.codeSmells * 5) : 0
              }
              className="h-1 mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Potential indicators of deeper problems
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Copy className="h-4 w-4" /> Code Duplications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">
                {metrics?.duplications || 0}
              </div>
              <Badge
                variant={duplicationRating.variant as any}
                className={duplicationRating.className}
              >
                {duplicationRating.label}
              </Badge>
            </div>
            <Progress
              value={
                metrics?.duplications
                  ? Math.min(100, metrics.duplications * 10)
                  : 0
              }
              className="h-1 mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Number of duplicated code segments
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-base font-medium flex items-center gap-2">
          <HelpCircle className="h-4 w-4" /> How to Interpret These Metrics
        </h3>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-1">Cyclomatic Complexity</h4>
              <p className="text-muted-foreground">
                Measures the number of independent paths through the code. Lower
                values indicate code that is easier to test and maintain.
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-500"
                >
                  1-10: Good
                </Badge>
                <Badge variant="secondary">11-20: Moderate</Badge>
                <Badge
                  variant="outline"
                  className="text-orange-500 border-orange-500"
                >
                  20+: High
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-1">Maintainability Index</h4>
              <p className="text-muted-foreground">
                A composite metric that considers code volume, complexity, and
                other factors. Higher values indicate more maintainable code.
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-500"
                >
                  80+: Good
                </Badge>
                <Badge variant="secondary">60-80: Moderate</Badge>
                <Badge
                  variant="outline"
                  className="text-orange-500 border-orange-500"
                >
                  0-60: Poor
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-1">Code Smells</h4>
              <p className="text-muted-foreground">
                Indicators of potential problems in the code that might lead to
                bugs or maintenance issues. Fewer smells generally indicates
                cleaner code.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-1">Code Duplications</h4>
              <p className="text-muted-foreground">
                Repeated code segments that could be refactored. Duplications
                often lead to maintenance problems and increase the chance of
                bugs.
              </p>
            </div>
          </div>
        </div>

        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Improvement Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              {metrics?.cyclomaticComplexity > 20 && (
                <li>
                  <strong>Reduce Complexity:</strong> Break down complex methods
                  into smaller, more focused functions
                </li>
              )}
              {metrics?.maintainabilityIndex < 60 && (
                <li>
                  <strong>Improve Maintainability:</strong> Add comments,
                  simplify logic, and ensure consistent coding styles
                </li>
              )}
              {metrics?.duplications > 5 && (
                <li>
                  <strong>Reduce Duplication:</strong> Extract repeated code
                  into shared functions or utilities
                </li>
              )}
              {metrics?.codeSmells > 10 && (
                <li>
                  <strong>Address Code Smells:</strong> Review and refactor
                  areas with code smells
                </li>
              )}
              {metrics?.cyclomaticComplexity <= 20 &&
                metrics?.maintainabilityIndex >= 60 &&
                metrics?.duplications <= 5 &&
                metrics?.codeSmells <= 10 && (
                  <li>
                    <strong>Great job!</strong> Your code metrics indicate a
                    well-structured, maintainable codebase
                  </li>
                )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
