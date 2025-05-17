"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Copy,
  Check,
  Code,
  Info,
  AlertCircle,
  Zap,
  CheckCircle,
  Paintbrush,
  FileText,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card, CardContent } from "../ui/card";

interface Issue {
  id: string;
  severity: string;
  type: string;
  message: string;
  line: number;
  column: number;
  snippet: string;
  suggestion: string;
  fixExample: string;
}

interface IssueListProps {
  issues: Issue[];
  getSeverityIcon: (severity: string) => React.ReactNode;
}

export default function IssueList({ issues, getSeverityIcon }: IssueListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyFix = (id: string, fix: string) => {
    navigator.clipboard.writeText(fix);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Try to determine the correct language for syntax highlighting
  const getLanguageForHighlighting = (
    snippet: string,
    defaultLanguage: string = "javascript"
  ) => {
    // Simple heuristics - could be expanded based on code patterns
    if (
      snippet.includes("func ") &&
      (snippet.includes("{ ") || snippet.includes("{\n"))
    )
      return "go";
    if (snippet.includes("def ") && snippet.includes(":")) return "python";
    if (
      snippet.includes("fn ") &&
      (snippet.includes("-> ") || snippet.includes("mut "))
    )
      return "rust";
    if (snippet.includes("class ") || snippet.includes("interface ")) {
      if (snippet.includes(": ") && snippet.includes("<")) return "typescript";
      return "java";
    }
    if (snippet.includes("import ") && snippet.includes("from "))
      return "python";
    if (snippet.includes("#include ")) return "cpp";
    if (snippet.includes("package ") && snippet.includes("import "))
      return "java";
    if (snippet.includes("using namespace") || snippet.includes("std::"))
      return "cpp";
    if (snippet.includes("<?php")) return "php";
    if (snippet.includes("@Override") || snippet.includes("public class"))
      return "java";

    // Default based on input
    return defaultLanguage;
  };

  // Display helper for certain issue types
  const getIssueTypeDetails = (type: string) => {
    switch (type) {
      case "security":
        return {
          color: "text-red-500",
          className:
            "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900",
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
        };
      case "performance":
        return {
          color: "text-purple-500",
          className:
            "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-900",
          icon: <Zap className="h-4 w-4 text-purple-500" />,
        };
      case "quality":
        return {
          color: "text-blue-500",
          className:
            "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900",
          icon: <CheckCircle className="h-4 w-4 text-blue-500" />,
        };
      case "style":
        return {
          color: "text-yellow-500",
          className:
            "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900",
          icon: <Paintbrush className="h-4 w-4 text-yellow-500" />,
        };
      case "documentation":
        return {
          color: "text-green-500",
          className:
            "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900",
          icon: <FileText className="h-4 w-4 text-green-500" />,
        };
      default:
        return {
          color: "text-gray-500",
          className:
            "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-900",
          icon: <Info className="h-4 w-4 text-gray-500" />,
        };
    }
  };

  const getSeverityLabel = (severity: string) => {
    const variants = {
      critical: "destructive",
      high: "outline",
      medium: "secondary",
      low: "outline",
    };

    const classes = {
      high: "text-orange-500 border-orange-500",
      low: "text-blue-500 border-blue-500",
    };

    return (
      <Badge
        variant={variants[severity as keyof typeof variants] as any}
        className={classes[severity as keyof typeof classes] || ""}
      >
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getTypeLabel = (type: string) => {
    const typeDetails = getIssueTypeDetails(type);

    return (
      <div className="flex items-center gap-1">
        {typeDetails.icon}
        <Badge variant="outline">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      </div>
    );
  };

  if (!issues || issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-muted/30 p-3 rounded-full mb-4">
          <Check className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No issues found</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-md">
          No issues match your current filter criteria. Try changing your
          filters or celebrate your clean code!
        </p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {issues.map((issue) => (
        <AccordionItem
          key={issue.id}
          value={issue.id}
          className="border-b last:border-b-0"
        >
          <AccordionTrigger className="hover:no-underline group">
            <div className="flex items-center text-left w-full">
              <div className="mr-3">{getSeverityIcon(issue.severity)}</div>
              <span className="text-sm font-medium group-hover:text-primary">
                {issue.message}
              </span>
              <div className="ml-auto flex items-center space-x-2">
                {getTypeLabel(issue.type)}
                {getSeverityLabel(issue.severity)}
                <Badge
                  variant="outline"
                  className="whitespace-nowrap bg-muted/50"
                >
                  Line {issue.line}
                </Badge>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" /> Code Snippet
                </h4>
                <div className="relative rounded-md overflow-hidden border">
                  <SyntaxHighlighter
                    language={getLanguageForHighlighting(issue.snippet)}
                    style={oneLight}
                    showLineNumbers
                    startingLineNumber={Math.max(1, issue.line - 2)}
                    customStyle={{ margin: 0, borderRadius: "0.375rem" }}
                    lineProps={(lineNumber) => {
                      const style =
                        lineNumber === issue.line
                          ? {
                              display: "block",
                              backgroundColor: "rgba(255, 0, 0, 0.1)",
                              paddingLeft: "0.5rem",
                              paddingRight: "0.5rem",
                              borderLeft: "2px solid red",
                            }
                          : {};
                      return { style };
                    }}
                  >
                    {issue.snippet}
                  </SyntaxHighlighter>
                  <div className="absolute top-0 right-0 bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-bl-md">
                    Line {issue.line}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" /> Suggestion
                </h4>
                <Card
                  className={`${getIssueTypeDetails(issue.type).className}`}
                >
                  <CardContent className="p-3 text-sm">
                    {issue.suggestion}
                  </CardContent>
                </Card>
              </div>

              {issue.fixExample && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Check className="h-4 w-4" /> Recommended Fix
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 text-xs"
                      onClick={() => handleCopyFix(issue.id, issue.fixExample)}
                    >
                      {copiedId === issue.id ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy Fix
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="relative rounded-md overflow-hidden border">
                    <SyntaxHighlighter
                      language={getLanguageForHighlighting(issue.fixExample)}
                      style={oneLight}
                      customStyle={{ margin: 0, borderRadius: "0.375rem" }}
                    >
                      {issue.fixExample}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-3">
                <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                  Learn more about this issue <Info className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
