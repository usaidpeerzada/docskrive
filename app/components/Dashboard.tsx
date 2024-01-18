"use client";
import { useState, useEffect } from "react";
import GeneratedDocument from "./GeneratedDocument";
import SettingsModal from "./SettingsModal";
import Select from "react-select";
import { SlSettings } from "react-icons/sl";
import LoadingSpinner from "./LoadingSpinner";
import MarkdownEditor from "./MarkdownEditor";
import FileUpload from "./FileUpload";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { checkIfUrlIsValid } from "../../utils/utils";
interface DashboardProps {
  initialData: { document: string };
}

export default function Dashboard({
  initialData,
}: DashboardProps): React.ReactNode {
  const [url, setUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [textCode, setTextCode] = useState("");
  const [generatedDocument, setGeneratedDocument] = useState(initialData);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(
    "gpt-3.5-turbo-1106"
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // fix for warning related to select dropdown:
  // Must be deleted once
  // https://github.com/JedWatson/react-select/issues/5459 is fixed.
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  let apiKey: string | any;
  if (typeof window !== "undefined") {
    apiKey =
      localStorage &&
      localStorage.getItem("apiKey") !== "" &&
      localStorage.getItem("apiKey");
  }
  async function generateDocument(): Promise<void> {
    if (!apiKey) {
      setIsSettingsOpen(true);
      setMessage("Please enter an API key");
    }
    const values = [url, githubUrl, textCode];
    const filledValues = values.filter((value) => value !== "");

    if (filledValues.length > 1) {
      alert("Please fill only one field at a time.");
      return;
    }
    const urlString = url || githubUrl;
    if (urlString) {
      if (!checkIfUrlIsValid(urlString)) {
        alert("Please enter a valid URL.");
        return;
      }
    }
    try {
      setIsLoading(true);
      const response = await fetch(`/api/generate-document`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          githubUrl,
          textCode,
          apiKey,
          selectedModel,
        }),
      });
      const data = await response.json();
      setGeneratedDocument(data);
    } catch (error) {
      console.error("Error generating document:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const modelOptions = [
    { value: "gpt-3.5-turbo-1106", label: "GPT-3.5 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
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
      backgroundColor: "rgb(13 148 136)",
      borderRadius: "4px",
      outline: "none",
      border: "1px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
    menuList: (base: any) => ({
      ...base,
    }),
  };
  function handleFileChange(text: string) {
    setTextCode(text);
  }
  const areInputsEmpty =
    githubUrl.length === 0 && textCode.length === 0 && url.length === 0;
  return (
    <motion.main
      className="main__container"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.5, ease: [0.6, -0.05, 0.01, 0.99] }}
      exit={{ x: "100%", opacity: 0 }}
    >
      <div className="min-h-screen md:pr-6 md:pl-6 lg:pr-6 lg:pl-6 pb-6 pt-3 flex flex-wrap text-white font-sans">
        <div className="p-6 bg-light-dashboard text-light-primary dark:bg-gray-800 dark:text-gray-500 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="md:flex lg:flex xl:flex">
            <Link href="/" className="text-3xl font-bold">
              <IoArrowBack className="text-teal-600" />
            </Link>{" "}
            <div className="absolute right-20">
              {isMounted ? (
                <Select
                  id={id}
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
              ) : null}
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
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium mb-2">URL:</label>
            <input
              type="text"
              className="p-2 w-full bg-gray-100 dark:bg-gray-700 border border-gray-600 rounded focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
              placeholder="Enter a url of a website to see what it does"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="mb-2 flex items-center">
            <hr className="flex-1 border-t border-gray-600" />
            <span className="mx-4 text-sm text-gray-500">or</span>
            <hr className="flex-1 border-t border-gray-600" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              GitHub file URL:
            </label>
            <input
              type="text"
              className="p-2 w-full bg-gray-100 dark:bg-gray-700 border border-gray-600 rounded focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
              placeholder="Enter file url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>
          <FileUpload handleFileChange={handleFileChange} />
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium mb-2">Code:</label>
            <textarea
              className="p-2 w-full h-64 bg-gray-100 dark:bg-gray-700 border border-gray-600 rounded focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
              placeholder="Paste your code here..."
              value={textCode}
              onChange={(e) => setTextCode(e.target.value)}
              rows={500}
            />
          </div>

          <button
            className="bg-teal-600 dark:bg-gray-700 hover:bg-teal-800 text-gray-100 py-2 px-6 rounded-full transition-all duration-300 ease-in-out"
            onClick={generateDocument}
            disabled={isLoading || areInputsEmpty}
          >
            {isLoading ? <LoadingSpinner /> : "Generate"}
          </button>
        </div>
        <div className="flex-1 mt-10 md:mt-0 lg:mt-0 xl:mt-0 md:pl-6 lg:pl-6">
          <GeneratedDocument content={generatedDocument?.document}>
            <MarkdownEditor
              initialData={{ content: generatedDocument?.document }}
            />
          </GeneratedDocument>
        </div>
      </div>
    </motion.main>
  );
}
