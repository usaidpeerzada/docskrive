"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Cpu, ArrowUpRight, Zap } from "lucide-react";

// Animated floating card component
interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, delay = 0 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!mounted) {
    return null; // Return null on server or before client hydration
  }

  return (
    <div
      className={`transform transition-all duration-700 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default function AnimatedStepsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Choose a Tool",
      description:
        "Select the AI-powered tool that fits your current development need.",
      icon: <Cpu className="h-6 w-6 text-primary" />,
    },
    {
      number: "02",
      title: "Upload Your Code",
      description:
        "Paste or upload the code you want to document, review, or translate.",
      icon: <ArrowUpRight className="h-6 w-6 text-primary" />,
    },
    {
      number: "03",
      title: "Get Results",
      description:
        "Receive AI-generated documentation, reviews, or translations instantly.",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
  ];

  // Only render on client
  if (!mounted) {
    // Return a placeholder with stable dimensions to prevent layout shift
    return (
      <section className="w-full py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 md:px-6">
          <div style={{ height: "600px" }} />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4">Simple Process</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started with BuddAI is simple and straightforward.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FloatingCard key={index} delay={300 + index * 100}>
              <div className="relative p-6 rounded-lg border bg-card hover:shadow-md transition-all duration-300">
                <div className="absolute -top-5 -left-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold">
                  {step.number}
                </div>
                <div className="pt-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  );
}
