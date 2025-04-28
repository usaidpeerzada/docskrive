"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  ArrowUp,
  ArrowRight,
  CheckCircle,
  Bolt,
  HelpCircle,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: string;
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <ArrowUp className="h-4 w-4 text-destructive" />;
      case "medium":
        return <ArrowRight className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline",
    };

    const classes = {
      low: "text-green-500 border-green-500",
    };

    return (
      <Badge
        variant={variants[priority as keyof typeof variants] as any}
        className={classes[priority as keyof typeof classes] || ""}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
    );
  };

  const getCardClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-2 border-l-destructive";
      case "medium":
        return "border-l-2 border-l-yellow-500";
      case "low":
        return "border-l-2 border-l-green-500";
      default:
        return "";
    }
  };

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-muted/30 p-3 rounded-full mb-4">
          <CheckCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No suggestions available</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-md">
          We could not find any specific improvements to suggest. Your code
          might already be following best practices!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id} className={getCardClass(suggestion.priority)}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base flex items-center gap-2">
                {getPriorityIcon(suggestion.priority)}
                {suggestion.title}
              </CardTitle>
              <div>{getPriorityBadge(suggestion.priority)}</div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {suggestion.description}
            </p>
          </CardContent>
        </Card>
      ))}

      <Separator className="my-6" />

      <Card className="bg-muted/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> How to Use These Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Start with high-priority suggestions for the biggest impact on your
            code quality. These improvements are based on industry best
            practices and can help prevent future bugs, improve maintainability,
            and enhance security.
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Badge variant="destructive" className="mr-2">
                High
              </Badge>
              <span>Act quickly</span>
            </div>
            <div className="flex items-center">
              <Badge variant="secondary" className="mr-2">
                Medium
              </Badge>
              <span>Plan to address</span>
            </div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="mr-2 text-green-500 border-green-500"
              >
                Low
              </Badge>
              <span>Nice to have</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
