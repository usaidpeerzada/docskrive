import React from "react";
import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import { Badge } from "./components/ui/badge";
import { Cpu } from "lucide-react";
import EnhancedBenefitsShowcase from "./components/BenefitsShowcase";

// Import dynamic components - no need for "ssr: false" with "use client" directive
const AnimatedToolsSection = dynamic(
  () => import("./components/AnimatedToolsSection"),
  {
    ssr: false,
    loading: () => <div style={{ height: "800px" }} />, // Placeholder with height to prevent layout shift
  }
);
const AnimatedStepsSection = dynamic(
  () => import("./components/AnimatedStepsSection"),
  {
    ssr: false,
    loading: () => <div style={{ height: "800px" }} />, // Placeholder with height to prevent layout shift
  }
);

const BenefitsShowcase = dynamic(
  () => import("./components/BenefitsShowcase"),
  {
    ssr: false,
    loading: () => <div style={{ height: "800px" }} />, // Placeholder with height to prevent layout shift
  }
);
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-0 right-0 w-2/5 h-3/5 -mt-20 -mr-20 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-2/5 h-3/5 -mb-20 -ml-10 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="flex-1 space-y-6 text-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 py-1.5 px-3">
                <Cpu className="mr-1 h-3.5 w-3.5" />
                <span>AI-Powered Developer Tools</span>
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="block">Supercharge</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Your Development
                </span>
              </h1>

              <p className="text-xl text-muted-foreground ">
                Document, review, and translate code in seconds with our
                AI-powered developer tools.
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Benefits Showcase */}
        <section className="w-full py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <BenefitsShowcase />
          </div>
        </section>

        {/* Tools Section - Now using client component */}
        <AnimatedToolsSection />

        {/* How It Works Section - Now using client component */}
        <AnimatedStepsSection />
      </main>

      <Footer />
    </div>
  );
}
