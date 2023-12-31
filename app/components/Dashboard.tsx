// pages/index.js
"use client";
import { useEffect, useState } from "react";
import { unified } from "unified";
import stream from "unified-stream";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import ReactMarkdown from "react-markdown";
import GeneratedDocument from "./GeneratedDocument";
import SettingsModal from "./SettingsModal";
import Select from "react-select";

import { SlSettings } from "react-icons/sl";

interface DashboardProps {
  initialData: { document: string };
}

export default function Dashboard({
  initialData,
}: DashboardProps): React.ReactNode {
  const [githubRepo, setGithubRepo] = useState("");
  const [textCode, setTextCode] = useState("");
  const [generatedDocument, setGeneratedDocument] = useState(initialData);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  let apiKey: any;
  if (typeof window !== "undefined") {
    apiKey =
      localStorage &&
      localStorage.getItem("apiKey") !== "" &&
      localStorage.getItem("apiKey");
  }
  const generateDocument = async () => {
    if (!apiKey) {
      setIsSettingsOpen(true);
      setMessage("Please enter an API key");
    }
    try {
      const response = await fetch(
        "http://192.168.1.6:8080/api/generate-document",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ githubRepo, textCode, apiKey, selectedModel }),
        }
      );

      const data = await response.json();
      setGeneratedDocument(data);
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };
  const modelOptions = [
    // { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gemini-pro", label: "Gemini Pro" },
  ];
  const customTheme = (theme: any) => ({
    ...theme,
    spacing: {
      controlHeight: 34.5,
      menuGutter: 10,
      baseUnit: 2,
    },
  });

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(17 94 89)" : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#000000",
      padding: "10px",
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor:
        typeof window !== "undefined" &&
        localStorage.getItem("darkMode") === "true"
          ? "rgb(13 148 136)"
          : "rgb(55 65 81)",
      borderRadius: "4px",
      outline: "none",
      border: "1px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
    // container: (base: any) => ({
    //   ...base,
    // }),
    menuList: (base: any) => ({
      ...base,
      // your desired height
    }),
  };
  // const processedContent = unified()
  //   .use(remarkParse)
  //   .use(remarkToc)
  //   .use(remarkRehype)
  //   .use(rehypeDocument, { title: 'Contents' })
  //   .use(rehypeFormat)
  //   .use(rehypeStringify)
  //   .processSync(generatedDocument);
  return (
    <div className="min-h-screen p-6 flex text-white font-sans">
      <div className="p-6 bg-light-dashboard text-light-primary dark:bg-gray-800 dark:text-gray-500 rounded-lg shadow-lg max-w-md w-full relative">
        <div className="flex">
          <h1 className="text-3xl font-bold">📄 DocSkrive</h1>
          <div className="absolute right-20">
            <Select
              options={modelOptions}
              value={modelOptions.find(
                (option) => option.value === selectedModel
              )}
              onChange={(option) => setSelectedModel(option?.value || null)}
              styles={customStyles}
              theme={customTheme}
              isSearchable={false}
              defaultValue={modelOptions[0]}
            />
          </div>
          <button
            className="absolute right-4 mr-2 bg-teal-600 dark:bg-gray-700 hover:bg-teal-800 hover:border-teal-800 border border-teal-600 dark:border-gray-600 rounded p-2"
            onClick={() => setIsSettingsOpen(true)}
          >
            <SlSettings className="text-white" />
          </button>
        </div>
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          message={message}
          setMessage={setMessage}
        />
        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium mb-2">
            GitHub Repository:
          </label>
          <input
            type="text"
            className="p-2 w-full bg-gray-100 dark:bg-gray-700 border border-gray-600 rounded focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
            placeholder="Enter GitHub repository"
            value={githubRepo}
            onChange={(e) => setGithubRepo(e.target.value)}
          />
        </div>
        <div className="mb-2 flex items-center">
          <hr className="flex-1 border-t border-gray-600" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <hr className="flex-1 border-t border-gray-600" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Text Code:</label>
          <textarea
            className="p-2 w-full h-32 bg-gray-100 dark:bg-gray-700 border border-gray-600 rounded focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
            placeholder="Enter code"
            value={textCode}
            onChange={(e) => setTextCode(e.target.value)}
          />
        </div>

        <button
          className="bg-teal-600 dark:bg-gray-700 hover:bg-teal-800 text-gray-100 py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
          onClick={generateDocument}
        >
          Generate Document
        </button>
      </div>
      <div className="flex-1 pl-6">
        <GeneratedDocument content={generatedDocument?.document} />
      </div>
    </div>
  );
}
