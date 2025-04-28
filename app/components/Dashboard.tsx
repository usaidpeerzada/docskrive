"use client";
import { useState, useEffect } from "react";
import GeneratedDocument from "./GeneratedDocument";
import LoadingSpinner from "./LoadingSpinner";
import MarkdownEditor from "./MarkdownEditor";
import FileUpload from "./FileUpload";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  checkIfUrlIsValid,
  isValidInput,
  modelOptions,
} from "../../utils/utils";
import Toast from "./Toast";
import { generateDocument } from "@/utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getApiKey } from "@/utils/storage";

interface DashboardProps {
  initialData: { document: string };
  isSettingOpen: boolean;
  setSettingOpen: (arg: boolean) => void;
}

export interface SelectedModel {
  key: string;
  value: string;
}

export default function Dashboard({
  initialData,
  isSettingOpen,
  setSettingOpen,
}: DashboardProps): React.ReactNode {
  const [githubUrl, setGithubUrl] = useState("");
  const [textCode, setTextCode] = useState("");
  const [generatedDocument, setGeneratedDocument] = useState(initialData);
  const [selectedModel, setSelectedModel] = useState<SelectedModel>({
    key: "openai",
    value: "gpt-3.5-turbo-1106",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const apiKey = getApiKey();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedModel = localStorage.getItem("selectedModel");
      if (storedModel) {
        try {
          setSelectedModel(JSON.parse(storedModel));
        } catch (error) {
          console.error(
            "Error parsing selected model from localStorage",
            error
          );
        }
      }
    }
  }, []);

  async function handleGenerateDocument(): Promise<void> {
    if (!apiKey) {
      setSettingOpen(true);
      setMessage("Please add an API key in settings.");
      return;
    }
    if (!isValidInput({ githubUrl, textCode })) {
      setError("Please fill only one field at a time.");
      return;
    }
    if (githubUrl && !checkIfUrlIsValid(githubUrl)) {
      setError("Please enter a valid GitHub URL.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await generateDocument({
        githubUrl,
        textCode,
        apiKey,
        selectedModel,
      });
      if (response.message) {
        setError(response.message);
        return;
      }
      setGeneratedDocument(response);
    } catch (error) {
      console.error("Error generating document:", error);
      setError("Failed to generate document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const areInputsEmpty = githubUrl.length === 0 && textCode.length === 0;

  function handleFileChange(text: string) {
    setTextCode(text);
  }

  return (
    <>
      {error && <Toast message={error} onClose={() => setError("")} />}
      <div className="container m-auto  grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to home</span>
                </Link>
              </Button>
              {/* <CardTitle>Create Documentation</CardTitle> */}
            </div>
            {isMounted && (
              <Select
                value={selectedModel.value}
                onValueChange={(value) => {
                  const option = modelOptions.find(
                    (opt) => opt.value === value
                  );
                  if (option) {
                    const newModel = {
                      key: option.key,
                      value: option.value,
                    };
                    setSelectedModel(newModel);
                    localStorage.setItem(
                      "selectedModel",
                      JSON.stringify(newModel)
                    );
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-url">GitHub file URL:</Label>
              <Input
                id="github-url"
                type="text"
                placeholder="Enter file url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>

            <FileUpload handleFileChange={handleFileChange} />

            <div className="space-y-2">
              <Label htmlFor="code">Code:</Label>
              <Textarea
                id="code"
                placeholder="Paste your code here..."
                value={textCode}
                onChange={(e) => setTextCode(e.target.value)}
                rows={10}
                className="min-h-[200px] font-mono"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGenerateDocument}
              disabled={isLoading || areInputsEmpty}
              className="w-full"
            >
              {isLoading ? (
                <LoadingSpinner loadingMsg="Generating" />
              ) : (
                "Generate"
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2">
          <GeneratedDocument
            isTranslationPage={false}
            content={generatedDocument?.document}
          >
            <MarkdownEditor
              isTranslationPage={false}
              initialData={{ content: generatedDocument?.document }}
            />
          </GeneratedDocument>
        </div>
      </div>
    </>
  );
}
