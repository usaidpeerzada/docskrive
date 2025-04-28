// app/faq/page.tsx
"use client";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar onSettingsClick={() => {}} showSettingsButton={false} />

      <div className="container py-6">
        <header className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find answers to common questions about our AI tools
          </p>
        </header>
      </div>

      <main className="flex-1 py-6">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is AITools?</AccordionTrigger>
                    <AccordionContent>
                      AITools is a smart documentation platform that simplifies
                      the creation, management, and sharing of coding
                      documentation. Utilizing OpenAI, Anthropic and Gemini API,
                      it effortlessly generates precise documentation from
                      GitHub URLs, files, or text. You can also translate code
                      from one language to another using our advanced code
                      translation feature. Enhance clarity in your code with
                      AITools, making documentation a seamless part of your
                      development workflow.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Are my API keys safe?</AccordionTrigger>
                    <AccordionContent>
                      Yes, AITools does not save your API keys anywhere on our
                      servers. The keys are stored in your browser&apos;s local
                      storage, you can remove them anytime you want to.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Which AI models are supported?
                    </AccordionTrigger>
                    <AccordionContent>
                      AITools supports a variety of AI models including OpenAI's
                      GPT models (GPT-4o, GPT-4o Mini, GPT-o1, GPT-o1 Mini),
                      Google's Gemini models (Gemini Pro, Gemini-1.5 Flash), and
                      Anthropic's Claude models (Claude-3.5 Sonnet, Claude-3
                      Opus, Claude-3.5 Haiku). You can select your preferred
                      model in the settings.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      How accurate is the code translation?
                    </AccordionTrigger>
                    <AccordionContent>
                      Our code translation tool provides high-quality
                      translations between programming languages, but we
                      recommend reviewing the generated code before using it in
                      production. The accuracy depends on the complexity of the
                      code and the specific language pair. Simple and standard
                      code patterns generally translate more accurately than
                      complex or highly specialized code.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
