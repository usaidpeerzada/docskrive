"use client";
import React from "react";
import { useState } from "react";
import SettingsModal from "../components/SettingsModal";
import Navbar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ReactSelect from "react-select";
import { languages } from "@/utils/utils";
import GeneratedDocument from "../components/GeneratedDocument";
import MarkdownEditor from "../components/MarkdownEditor";
import Toast from "../components/Toast";

const apiUrl = process.env.NEXT_PUBLIC_DOCSKRIVE_API || "";
const id = Date.now().toString();
export default function Page() {
  const [code, setCode] = useState("");
  const [translatedCode, setTranslatedCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  let apiKey: string | any;
  let selectedModelName: object | any;
  if (typeof window !== "undefined") {
    apiKey =
      localStorage &&
      localStorage.getItem("apiKey") !== "" &&
      localStorage.getItem("apiKey");

    selectedModelName =
      localStorage && localStorage.getItem("selectedModel") !== ""
        ? localStorage.getItem("selectedModel")
        : {
            key: "open-ai",
            value: "gpt-3.5-turbo-1106",
          };
  }
  const translateCode = async () => {
    try {
      if (!apiKey) {
        setMessage("Please add an API key in settings.");

        return;
      }
      if (!code) {
        setMessage("Please add input code.");
        return;
      } else {
        setMessage("");
      }
      setLoading(true);
      console.log(language);
      await fetch(`${apiUrl}/translate-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          apiKey,
          selectedModel: JSON.parse(selectedModelName),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setMessage(res.message);
          } else {
            setTranslatedCode(res.document);
            setMessage("");
            setLoading(false);
          }
        })
        .catch((err) => console.log("err ", err));
    } catch (err) {
      console.error("Error translating: ", err);
    } finally {
      setLoading(false);
    }
  };
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(17 94 89)" : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#000000",
      padding: "10px",
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#ffffff",
      borderRadius: "4px",
      outline: "none",
      border: "1px",
      minWidth: "250px", // Ensures it stays full width
      maxWidth: "250px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#000000",
      whiteSpace: "nowrap", // Prevent wrapping text in the selected option
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    menuList: (base: any) => ({
      ...base,
      width: "250px",
    }),
  };
  return (
    <>
      {message && <Toast message={message} onClose={() => setMessage("")} />}
      <Navbar
        onSettingsClick={() => setSettingsOpen(true)}
        showSettingsButton={true}
      />
      <div className=" flex flex-col w-full items-center bg-teal-600 p-6">
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setSettingsOpen(false)}
          message={message}
          setMessage={setMessage}
          darkMode={false}
          setDarkMode={() => {}}
          isTranslateCodePage={true}
        />

        <h1 className="text-3xl font-bold mb-3">Translate your code to</h1>
        <div className="flex items-center space-x-4 mt-3">
          <ReactSelect
            className="mb-4 w-full max-w-[300px]"
            id={id}
            options={languages}
            value={languages.find((option) => option.value === language)}
            onChange={(option) => {
              setLanguage(option?.value as string);
            }}
            styles={customStyles}
            isSearchable={false}
            defaultValue={languages[0]}
          />
          <button
            className="bg-teal-700 mb-4 text-white px-4 py-2 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={translateCode}
          >
            {loading ? (
              <LoadingSpinner loadingMsg="Translating..." />
            ) : (
              "Translate"
            )}
          </button>
        </div>
        <div className="w-full max-w-8xl flex flex-col md:flex-row gap-6">
          {/* Left Editor */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Original Code</h2>
            <textarea
              className="flex-grow w-full h-full border border-gray-300 rounded-lg p-2 focus:outline-none text-black font-mono focus:ring-2 focus:ring-teal-500 resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
            />
          </div>

          {/* Right Editor */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Translated Code</h2>
            <div className="flex-grow w-full h-full">
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
          </div>
        </div>
      </div>
    </>
  );
}
