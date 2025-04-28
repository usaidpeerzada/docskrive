import React from "react";
import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./NavBar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  FileText,
  Code,
  Bot,
  Braces,
  MessageCircle,
  Workflow,
  ShieldAlert,
  KeyIcon,
} from "lucide-react";

const LandingPage = () => {
  const tools = [
    {
      title: "Instant Documentation",
      description:
        "Auto-generate stunning, developer-friendly docs from any codebase. GitHub integration built-in.",
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: "/dashboard",
      buttonText: "Get Started",
    },
    {
      title: "AI Code Translation",
      description:
        "Convert your code between languages effortlessly. Migrate projects or explore new stacks in minutes.",
      icon: <Code className="h-10 w-10 text-primary" />,
      link: "/translate-code",
      buttonText: "Translate Now",
    },
    {
      title: "AI Code Review",
      description:
        "Unlock better code quality with instant, actionable AI-driven reviews. Catch issues before they ship.",
      icon: <Bot className="h-10 w-10 text-primary" />,
      link: "/code-review",
      buttonText: "Improve Code",
    },
    {
      title: "Private & Secure",
      description:
        "Your keys never leave your device. Local-first architecture, trusted by top dev teams worldwide.",
      icon: <Braces className="h-10 w-10 text-primary" />,
      link: "/faq",
      buttonText: "Learn More",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onSettingsClick={() => {}} showSettingsButton={false} />

      <main className="flex-1 m-auto">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                  AI Tools. At One Place.
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  AI superpowers for modern developers — generate docs,
                  translate code, and catch bugs instantly. Trusted by top teams
                  worldwide.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/dashboard">Start Building</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/faq">How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="w-screen py-12 md:py-16 lg:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tools.map((tool, index) => (
                <Card
                  key={index}
                  className="flex flex-col h-full hover:shadow-lg transition"
                >
                  <CardHeader>
                    <div className="mb-4">{tool.icon}</div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6">
                    <Button className="w-full" asChild>
                      <Link href={tool.link}>{tool.buttonText}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Highlight Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-muted p-3">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Cut Development Time by 60%+
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our tools help you save time and focus on what matters most -
                  writing great code. Generate documentation, translate between
                  languages, and leverage the power of multiple AI models to
                  enhance your development workflow.
                </p>
              </div>
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-muted p-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Powered by the Best Models
                </h2>
                <p className="text-lg text-muted-foreground">
                  We leverage OpenAI, Anthropic, and Google's latest models
                  under the hood. No config needed — just results.
                </p>
              </div>
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-muted p-3">
                  <KeyIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Private & Secure
                </h2>
                <p className="text-lg text-muted-foreground">
                  Your API keys are never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
