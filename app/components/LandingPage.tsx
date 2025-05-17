import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./NavBar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  FileText,
  Code,
  Bot,
  Cpu,
  ArrowRight,
  ChevronRight,
  Eye,
  Shield,
  MessageSquare,
  ArrowUpRight,
  Zap,
  FileCode2,
} from "lucide-react";
import EnhancedBenefitsShowcase from "./BenefitsShowcase";
import ModelSelectorDisplay from "./ModelSelectorDisplay";

// Animated floating card component
interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, delay = 0 }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

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

// Animated code blocks
type CodeType = "javascript" | "python" | "typescript";

interface AnimatedCodeBlockProps {
  delay?: number;
  codeType: CodeType;
}

const AnimatedCodeBlock: React.FC<AnimatedCodeBlockProps> = ({
  delay = 0,
  codeType,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Code samples for different languages
  const codeSamples: Record<CodeType, string> = {
    javascript: `// JavaScript document generation
function generateDocumentation(code) {
  const lines = code.split('\\n');
  const docLines = [];
  
  // Extract function definitions
  for (const line of lines) {
    if (line.includes('function')) {
      docLines.push(\`/** 
 * \${extractFunctionName(line)}
 * @description Add description here
 * @returns {any} Return value
 */\`);
    }
  }
  
  return docLines.join('\\n');
}`,
    python: `# Python code translator
def translate_to_python(js_code):
    """
    Translates JavaScript code to Python
    
    Args:
        js_code: String containing JavaScript code
        
    Returns:
        String containing equivalent Python code
    """
    python_code = []
    
    # Replace common patterns
    js_code = js_code.replace('const ', '')
    js_code = js_code.replace('let ', '')
    js_code = js_code.replace('function ', 'def ')
    
    return '\\n'.join(python_code)`,
    typescript: `// TypeScript code review
interface CodeReviewResult {
  issues: CodeIssue[];
  score: number;
  suggestions: string[];
}

class CodeReviewer {
  private model: AIModel;
  
  constructor(apiKey: string) {
    this.model = new AIModel(apiKey);
  }
  
  async reviewCode(
    code: string,
    language: string
  ): Promise<CodeReviewResult> {
    // Analyze code for issues
    return this.model.analyze(code, language);
  }
}`,
  };

  const codeText = codeSamples[codeType] || codeSamples.javascript;

  return (
    <div
      className={`rounded-lg border bg-card shadow-lg transition-all duration-700 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          {codeType}.
          {codeType === "typescript"
            ? "ts"
            : codeType === "python"
            ? "py"
            : "js"}
        </div>
      </div>
      <div className="p-4 overflow-hidden font-mono text-xs">
        <pre className="text-foreground">
          <code>{codeText}</code>
        </pre>
      </div>
    </div>
  );
};

// Hero gradient background
const HeroGradient = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    <div className="absolute -top-1/5 -right-1/6 w-2/5 h-3/5 rounded-full bg-primary/20 blur-3xl" />
    <div className="absolute -bottom-1/5 -left-1/10 w-2/5 h-3/5 rounded-full bg-secondary/20 blur-3xl" />
    <div className="absolute top-1/10 left-1/5 w-1/3 h-1/3 rounded-full bg-primary/10 blur-3xl" />
  </div>
);

// Tool card component with animation
type Tool = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  buttonText: string;
};

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 400 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transition-all duration-700 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {tool.icon}
            </div>
            <Badge variant="outline" className="bg-background/80">
              New
            </Badge>
          </div>
          <CardTitle className="text-xl">{tool.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{tool.description}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full group" asChild>
            <a href={tool.link} className="flex items-center justify-center">
              {tool.buttonText}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// CodeComparison component
const CodeComparison = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        className="grid md:grid-cols-2 gap-4 bg-card border rounded-xl overflow-hidden shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6 border-r">
          <div className="flex items-center mb-4">
            <Code className="mr-2 h-5 w-5 text-primary" />
            <h3 className="font-medium">Before</h3>
          </div>
          <pre className="bg-muted/50 rounded-md p-4 text-xs overflow-x-auto">
            <code className="text-sm">
              {`function processData(data) {
  // TODO: Add documentation
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].value > 0) {
      result.push(data[i]);
    }
  }
  return result;
}`}
            </code>
          </pre>
        </div>
        <div className="p-6 bg-gradient-to-br from-background to-primary/5">
          <div className="flex items-center mb-4">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            <h3 className="font-medium">BuddAI Generated</h3>
          </div>
          <div
            className="transition-transform duration-500"
            style={{
              transform: isHovered ? "translateY(-5px)" : "translateY(0)",
            }}
          >
            <pre className="bg-muted/50 rounded-md p-4 text-xs overflow-x-auto">
              <code className="text-sm">
                {`/**
 * Filters data array to include only items with positive values.
 * 
 * @param {Array} data - The array of objects to process
 * @returns {Array} - Filtered array containing only positive values
 */
function processData(data) {
  return data.filter(item => item.value > 0);
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Steps component
const StepsComponent = () => {
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

  return (
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
  );
};

export default function Page() {
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

  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
            <div
              className={`space-y-6 transition-all duration-1000 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-8"
              }`}
            >
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

        {/* Enhanced Benefits Showcase - Kept as is */}
        <section className="w-full py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <EnhancedBenefitsShowcase />
          </div>
        </section>

        {/* Tools Section - Simplified to focus on three main tools */}
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
              {tools.map((tool, index) => (
                <ToolCard key={index} tool={tool} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
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

            <StepsComponent />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
