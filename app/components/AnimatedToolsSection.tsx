"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FileText, Code, FileCode2 } from "lucide-react";
import Link from "next/link";

// Tool card component
type Tool = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  buttonText: string;
};

// Simpler ToolCard without complex animations or state
function ToolCard({ title, description, icon, link, buttonText }: Tool) {
  const handleClick = () => {
    window.location.href = link;
  };

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {icon}
          </div>
          <Badge variant="outline" className="bg-background/80">
            New
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={link} passHref>
          <Button className="w-full">
            <span className="flex items-center justify-center">
              {buttonText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ToolsSection() {
  // Simple client-side detection
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Tool cards data
  const tools = [
    {
      title: "Document Your Code",
      description:
        "Auto-generate comprehensive, developer-friendly documentation from any codebase in seconds.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: "/document-your-code",
      buttonText: "Generate Docs",
    },
    {
      title: "Code Review",
      description:
        "Identify bugs, security issues, and performance bottlenecks with AI-powered code reviews before they reach production.",
      icon: <FileCode2 className="h-6 w-6 text-primary" />,
      link: "/code-review",
      buttonText: "Review Code",
    },
    {
      title: "Translate Code",
      description:
        "Effortlessly translate code between programming languages. Migrate projects or explore new tech stacks instantly.",
      icon: <Code className="h-6 w-6 text-primary" />,
      link: "/translate-code",
      buttonText: "Translate Code",
    },
  ];

  // Show a minimal placeholder if not mounted yet
  if (!isMounted) {
    return (
      <section className="w-full py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Our AI Tools
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-muted/20 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4">Developer Tools</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our AI Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our integrated suite of AI-powered tools helps you build better
            code, faster.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <ToolCard
              key={i}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              link={tool.link}
              buttonText={tool.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
