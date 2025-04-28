// app/translate-code/page.tsx
"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatCode, languages } from "@/utils/utils";
import GeneratedDocument from "../components/GeneratedDocument";
import MarkdownEditor from "../components/MarkdownEditor";
import Toast from "../components/Toast";
import { translateCode } from "@/utils/api";
import { Code } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { getApiKey } from "@/utils/storage";

export default function Page() {
  const [code, setCode] = useState("");
  const [translatedCode, setTranslatedCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const apiKey = getApiKey();
  let selectedModelName: object | any;
  if (typeof window !== "undefined") {
    selectedModelName =
      localStorage && localStorage.getItem("selectedModel") !== ""
        ? localStorage.getItem("selectedModel")
        : {
            key: "openai",
            value: "gpt-3.5-turbo-1106",
          };
  }

  async function handleTranslateCode(): Promise<void> {
    if (!apiKey) {
      setMessage("Please add an API key in settings.");
      return;
    }

    if (!code) {
      setMessage("Please add input code.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formattedCode = formatCode(code);
      const selectedModelConfig = JSON.parse(selectedModelName);

      const response = await translateCode({
        code: formattedCode,
        language,
        apiKey,
        selectedModel: selectedModelConfig,
      });

      if (response.message) {
        setMessage(response.message);
        return;
      }

      setTranslatedCode(response.document);
    } catch (error) {
      console.error("Error translating code:", error);
      setMessage("Failed to translate code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {message && <Toast message={message} onClose={() => setMessage("")} />}
      <Navbar
        onSettingsClick={() => {}}
        showSettingsButton={true}
        isTranslateCodePage={true}
      />

      <div className="container py-6">
        <div className="max-w-3xl flex">
          <div className="mt-1 mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Translate Code
            </h1>
            <p className="text-muted-foreground">
              Translate code between different programming languages using AI.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 py-4">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span>Translate to:</span>
              {isMounted && (
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Button onClick={handleTranslateCode} disabled={loading}>
              {loading ? (
                <LoadingSpinner loadingMsg="Translating..." />
              ) : (
                "Translate"
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Source Code</CardTitle>
                <CardDescription>
                  Enter or paste the code you want to translate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono"
                />
              </CardContent>
            </Card>

            <GeneratedDocument
              content={translatedCode}
              isTranslationPage={true}
            >
              <MarkdownEditor
                initialData={{ content: translatedCode }}
                isTranslationPage={true}
              />
            </GeneratedDocument>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Review the translated code before using it in production.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
