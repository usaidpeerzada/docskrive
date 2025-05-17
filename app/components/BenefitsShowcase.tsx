"use client";
import React, { useState, useEffect } from "react";
import {
  Zap,
  Shield,
  Clock,
  Code,
  FileText,
  Bot,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Workflow,
  LineChart,
  RefreshCw,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

// Enhanced Tool Benefits Showcase Component
const EnhancedBenefitsShowcase = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Benefits data with realistic, modest claims
  const benefits = [
    {
      id: 0,
      icon: <Clock className="h-6 w-6" />,
      title: "Documentation Efficiency",
      description: "Streamline your documentation process",
      metrics: [
        {
          label: "Manual Documentation",
          value: 60,
          suffix: "mins",
          color: "bg-muted-foreground/70",
        },
        {
          label: "AI Documentation",
          value: 30,
          suffix: "mins",
          color: "bg-primary",
        },
      ],
    },
    {
      id: 1,
      icon: <Shield className="h-6 w-6" />,
      title: "Issue Detection",
      description: "Identify more potential problems early",
      metrics: [
        {
          label: "Common Issue Detection",
          value: 65,
          suffix: "%",
          color: "bg-muted-foreground/70",
        },
        {
          label: "Enhanced with AI Review",
          value: 85,
          suffix: "%",
          color: "bg-green-500",
        },
      ],
    },
    {
      id: 2,
      icon: <Zap className="h-6 w-6" />,
      title: "Code Understanding",
      description: "Work more confidently across languages",
      metrics: [
        {
          label: "Working with New Languages",
          value: 5,
          suffix: "comfort level",
          color: "bg-muted-foreground/70",
        },
        {
          label: "With Translation Assistance",
          value: 8,
          suffix: "comfort level",
          color: "bg-primary",
        },
      ],
    },
  ];

  // Trigger animations when component mounts
  useEffect(() => {
    setAnimationTriggered(true);

    // Auto-rotate through benefits only when not hovering
    const rotationInterval = setInterval(() => {
      if (!isHovering) {
        setActiveBenefit((prev) => (prev + 1) % benefits.length);
      }
    }, 5000);

    return () => clearInterval(rotationInterval);
  }, [isHovering]);

  // Animation utility for staggered effects
  interface Metric {
    label: string;
    value: number;
    suffix: string;
    color: string;
  }

  interface Benefit {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    metrics: Metric[];
  }

  const getAnimationStyles = (index: number): React.CSSProperties => {
    return {
      opacity: animationTriggered ? 1 : 0,
      transform: animationTriggered ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${200 + index * 100}ms`,
    };
  };

  // Current active benefit
  const currentBenefit = benefits[activeBenefit];

  return (
    <div
      className="my-20 max-w-6xl mx-auto overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Tech Stack Section - Attention-grabbing design */}
      <div className="relative mb-24 px-6 py-10 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 shadow-lg overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

          {/* Tech pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-5 flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary"></div>
              ))}
            </div>
            <div className="absolute bottom-5 right-5 flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary"></div>
              ))}
            </div>
            <div className="absolute top-1/4 right-1/4 h-px w-20 bg-primary rotate-45"></div>
            <div className="absolute bottom-1/4 left-1/4 h-px w-20 bg-primary -rotate-45"></div>
            <div className="absolute top-1/3 left-1/3 w-px h-20 bg-primary"></div>
            <div className="absolute bottom-1/3 right-1/3 w-px h-20 bg-primary"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="text-center mb-10" style={getAnimationStyles(0)}>
            <Badge className="mb-2 px-3 py-1 bg-primary/20 text-primary border-primary/30">
              <Code className="mr-1 h-3.5 w-3.5" />
              <span>Versatile Tech Stack</span>
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Flexible AI Integration Options
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect AI deployment for your specific needs and
              security requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* Cloud Models */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-full bg-blue-500/10 text-blue-500">
                  <div className="w-9 h-9 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path
                        d="M6.5 18.5C3.5 17 2 14 2 9.5C2 8.5 3 7.5 4 7.5H4.5C5.5 7.5 6 8 6.5 9L7 10C7.5 11 7.5 11.5 6.5 12.5C8 14.5 9 15 10.5 16C11.5 15 12 15 13 15.5L14 16C15 16.5 15.5 17 15.5 18V18.5C15.5 19.5 14.5 20.5 13.5 20.5C9 20.5 8 19.5 6.5 18.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 6.5C13.5 5.67 14.17 5 15 5C15.83 5 16.5 5.67 16.5 6.5C16.5 7.33 15.83 8 15 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 9C19 8.17 19.67 7.5 20.5 7.5C21.33 7.5 22 8.17 22 9C22 9.83 21.33 10.5 20.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.5 14C20.5 13.17 21.17 12.5 22 12.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.5 11C16.5 10.17 17.17 9.5 18 9.5C18.83 9.5 19.5 10.17 19.5 11C19.5 11.83 18.83 12.5 18 12.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Cloud AI Models</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Leverage industry-leading AI models from OpenAI, Anthropic, and
                more without infrastructure overhead.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="bg-background/50">
                  OpenAI
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  Anthropic
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  Cohere
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  Google AI
                </Badge>
              </div>
            </div>

            {/* Local Models - Highlighted */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/20 backdrop-blur-sm rounded-xl p-6 border border-primary/30 shadow-lg transform transition-all duration-300 hover:scale-105 relative">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-primary text-primary-foreground shadow-sm">
                  New Feature
                </Badge>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-full bg-primary/20 text-primary">
                  <div className="w-9 h-9 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path
                        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17 15V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 11.5V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 14.5V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 15L7 14.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Local AI Models</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                <span className="font-medium text-primary">
                  Full privacy and control
                </span>{" "}
                - Run powerful AI models locally on your own hardware with
                Ollama integration.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Offline operation capability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Data never leaves your network
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Complete control over model selection
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-primary/20 text-primary border-primary/20">
                  Ollama
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  Llama
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  Mistral
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  CodeLlama
                </Badge>
              </div>
            </div>

            {/* Enterprise Models */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-full bg-slate-500/10 text-slate-500">
                  <div className="w-9 h-9 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path
                        d="M21 10V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H9C6.17157 2 4.75736 2 3.87868 2.87868C3 3.75736 3 5.17157 3 8V16C3 18.8284 3 20.2426 3.87868 21.1213C4.75736 22 6.17157 22 9 22H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6 7L18 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 12L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Enterprise Deployment</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-sm font-medium bg-yellow-500/10 text-yellow-700 py-0.5 px-2 rounded">
                    Coming Soon
                  </span>
                </span>
                <span className="block mt-2">
                  Custom on-premises or private cloud solutions for
                  organizations with strict security requirements.
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="bg-background/50">
                  Azure OpenAI
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  AWS Bedrock
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  Custom VPC
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12" style={getAnimationStyles(0)}>
        <Badge className="mb-2 px-3 py-1 bg-primary/10 text-primary border-primary/20">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          <span>Measurable Impact</span>
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Proven Developer Benefits
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how our AI tools transform your development workflow with concrete
          metrics
        </p>
      </div>

      {/* Benefit selection tabs */}
      <div className="flex justify-center mb-12" style={getAnimationStyles(1)}>
        <div className="flex space-x-2 bg-muted/50 p-1.5 rounded-lg">
          {benefits.map((benefit, index) => (
            <button
              key={benefit.id}
              onClick={() => setActiveBenefit(index)}
              className={`px-5 py-2.5 rounded-md flex items-center gap-2.5 transition-all duration-300 ${
                activeBenefit === index
                  ? "bg-background shadow-md border border-border/50"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`${activeBenefit === index ? "text-primary" : ""}`}
              >
                {benefit.icon}
              </div>
              <span className="font-medium">{benefit.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main visualization area */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-10 relative"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.03) 0%, transparent 70%)",
          backgroundSize: "150% 150%",
          backgroundPosition: "center center",
        }}
      >
        {/* Left side: Beautiful 3D-like visualization */}
        <div className="md:col-span-7" style={getAnimationStyles(2)}>
          <div className="relative h-full bg-gradient-to-br from-background via-primary/5 to-background rounded-xl border border-primary/10 shadow-lg overflow-hidden backdrop-blur-sm">
            {/* Decorative grid lines */}
            <div className="absolute inset-0">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(var(--muted-foreground), 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--muted-foreground), 0.05) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            {/* Floating particles */}
            {[...Array(15)].map((_, i) => {
              const size = Math.random() * 6 + 2;
              const top = Math.random() * 100;
              const left = Math.random() * 100;
              const duration = Math.random() * 15 + 10;
              const delay = Math.random() * 5;

              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-primary/20"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                    animation: `float ${duration}s infinite ${delay}s linear`,
                  }}
                ></div>
              );
            })}

            {/* Main features visually represented */}
            <div className="absolute inset-0">
              {/* Code Document Visualization */}
              <div
                className={`absolute left-8 top-1/2 -translate-y-1/2 w-64 transition-all duration-1000 ease-in-out ${
                  currentBenefit.id === 0
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-20 scale-90 -translate-x-10"
                }`}
              >
                <div className="relative">
                  {/* Document before */}
                  <div className="absolute top-0 left-0 w-full bg-card rounded-lg shadow-lg border p-4 transform -rotate-6">
                    <div className="h-6 flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="h-2 w-20 bg-muted rounded"></div>
                    </div>
                    <div className="space-y-1.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 bg-muted rounded w-full"
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Document after */}
                  <div className="relative bg-card rounded-lg shadow-lg border p-4 transform rotate-3">
                    <div className="h-6 flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div className="h-2 w-24 bg-primary/20 rounded"></div>
                    </div>
                    <div className="space-y-1.5">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded transition-all duration-500 ${
                            animationTriggered ? "bg-primary/15" : "bg-muted"
                          }`}
                          style={{
                            width: `${85 - i * 10}%`,
                            transitionDelay: `${i * 100 + 500}ms`,
                          }}
                        ></div>
                      ))}
                      <div className="flex items-center mt-2">
                        <div className="h-2 w-4 rounded bg-green-500/30 mr-1"></div>
                        <div className="h-1.5 w-10 rounded bg-green-500/20"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow connecting documents */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                  <RefreshCw
                    className="h-7 w-7 text-primary/60 animate-spin"
                    style={{ animationDuration: "8s" }}
                  />
                </div>
              </div>

              {/* Security Shield Visualization */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out ${
                  currentBenefit.id === 1
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
              >
                <div className="relative">
                  <div className="w-56 h-56 rounded-full border-8 border-primary/10 flex items-center justify-center">
                    <div
                      className="w-44 h-44 rounded-full border-4 border-primary/20 flex items-center justify-center animate-pulse"
                      style={{ animationDuration: "4s" }}
                    >
                      <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                        <Bot className="h-14 w-14 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Animated dots around the shield */}
                  {[...Array(8)].map((_, i) => {
                    const angle = i * 45 * (Math.PI / 180);
                    const x = Math.cos(angle) * 110;
                    const y = Math.sin(angle) * 110;
                    const delay = i * 0.5;

                    return (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-red-500/80"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          animation: `pulse 3s infinite ${delay}s`,
                          boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
                        }}
                      >
                        <div
                          className="absolute w-8 h-8 rounded-full bg-red-500/20"
                          style={{
                            left: "-50%",
                            top: "-50%",
                            animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) infinite ${
                              delay * 0.5
                            }s`,
                          }}
                        ></div>
                      </div>
                    );
                  })}

                  {/* Shield status indicator */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-green-500/90 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg flex items-center">
                    <span className="mr-1.5">Protected</span>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Code Translation Visualization */}
              <div
                className={`absolute right-8 top-1/2 -translate-y-1/2 w-72 transition-all duration-1000 ease-in-out ${
                  currentBenefit.id === 2
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-20 scale-90 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* JavaScript code */}
                  <div className="flex-1 bg-card rounded-lg shadow-lg border p-4 transform -rotate-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-mono text-yellow-500/80 font-semibold">
                        JavaScript
                      </div>
                      <div className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-500/10 text-yellow-600/80">
                        .js
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono">
                        <span className="text-blue-500">function</span>{" "}
                        <span className="text-green-500">getData</span>() {"{"}
                      </div>
                      <div className="text-xs font-mono ml-4">
                        <span className="text-purple-500">const</span> result =
                        [];
                      </div>
                      <div className="text-xs font-mono ml-4">
                        <span className="text-blue-500">for</span> (
                        <span className="text-purple-500">let</span> i = 0; i{" "}
                        {"<"} 10; i++) {"{"}
                      </div>
                      <div className="text-xs font-mono ml-8">
                        result.<span className="text-green-500">push</span>(i);
                      </div>
                      <div className="text-xs font-mono ml-4">{"}"}</div>
                      <div className="text-xs font-mono ml-4">
                        <span className="text-blue-500">return</span> result;
                      </div>
                      <div className="text-xs font-mono">{"}"}</div>
                    </div>
                  </div>

                  {/* Animated arrow */}
                  <div className="relative flex-shrink-0">
                    <div className="bg-primary/10 rounded-full p-2 backdrop-blur-sm">
                      <ArrowRight className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                    <div className="w-1 h-20 bg-primary/10 absolute left-1/2 top-full -translate-x-1/2 mt-2"></div>
                  </div>

                  {/* Python code */}
                  <div className="flex-1 bg-card rounded-lg shadow-lg border p-4 transform rotate-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-mono text-blue-500/80 font-semibold">
                        Python
                      </div>
                      <div className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-600/80">
                        .py
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono">
                        <span className="text-blue-500">def</span>{" "}
                        <span className="text-green-500">get_data</span>():
                      </div>
                      <div className="text-xs font-mono ml-4">result = []</div>
                      <div className="text-xs font-mono ml-4">
                        <span className="text-blue-500">for</span> i{" "}
                        <span className="text-blue-500">in</span>{" "}
                        <span className="text-green-500">range</span>(10):
                      </div>
                      <div className="text-xs font-mono ml-8">
                        result.<span className="text-green-500">append</span>(i)
                      </div>
                      <div className="text-xs font-mono ml-4">
                        <span className="text-blue-500">return</span> result
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code quality meter - visible for all features */}
              <div className="absolute bottom-5 right-5">
                <div className="flex items-center gap-2 bg-background/80 border border-border/40 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                  <LineChart className="h-4 w-4 text-primary" />
                  <div className="text-xs font-medium">Quality Score</div>
                  <div className="text-xs font-bold text-primary">
                    {currentBenefit.id === 0
                      ? "89%"
                      : currentBenefit.id === 1
                      ? "94%"
                      : "92%"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Metrics */}
        <div className="md:col-span-5" style={getAnimationStyles(3)}>
          <div className="bg-card rounded-xl border border-primary/10 shadow-lg p-8 h-full backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20 shadow-sm text-primary">
                {currentBenefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">
                  {currentBenefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentBenefit.description}
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {currentBenefit.metrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="text-sm font-medium flex items-center">
                      {index === 1 && (
                        <div className="w-2 h-2 bg-primary mr-2 rounded-full"></div>
                      )}
                      {metric.label}
                    </div>
                    <div className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm font-normal text-muted-foreground ml-0.5">
                        {metric.suffix}
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={
                      animationTriggered
                        ? (metric.value /
                            (metric.suffix === "%"
                              ? 100
                              : currentBenefit.metrics[0].value >
                                currentBenefit.metrics[1].value
                              ? currentBenefit.metrics[0].value
                              : 10)) *
                          100
                        : 0
                    }
                    className={`h-3 rounded-full ${metric.color}`}
                  />
                </div>
              ))}
            </div>

            {/* Comparison summary with realistic benefits */}
            <div className="mt-12 p-5 bg-muted/40 rounded-lg border border-primary/5">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">
                      {currentBenefit.id === 0
                        ? "Save up to 50% time on documentation"
                        : currentBenefit.id === 1
                        ? "Detect ~20% more potential issues"
                        : "Increased confidence with unfamiliar code"}
                    </span>{" "}
                    based on typical user experience
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentBenefit.id === 0
                      ? "Documentation tasks that typically take hours now completed in minutes."
                      : currentBenefit.id === 1
                      ? "AI analysis finds edge cases human reviewers often miss."
                      : "Easily work with new programming languages and frameworks."}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 text-xs text-muted-foreground italic">
              Note: Benefits may vary based on project complexity and specific
              use cases.
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(10px);
          }
          50% {
            transform: translateY(5px) translateX(15px);
          }
          75% {
            transform: translateY(10px) translateX(-5px);
          }
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedBenefitsShowcase;
