import React, { useEffect, useState } from "react";
import { IoClose, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import ToggleSwitch from "./ToggleSwitch";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { modelOptions } from "@/utils/utils";
import { SelectedModel } from "./Dashboard";
import ReactSelect from "react-select";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  setMessage: (arg: string) => void;
  darkMode: boolean;
  setDarkMode: (arg: boolean) => void;
  isTranslateCodePage: boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  message,
  setMessage,
  darkMode,
  setDarkMode,
  isTranslateCodePage,
}) => {
  const apiKeyFromLocalStorage =
    typeof window !== "undefined" && localStorage.getItem("apiKey");
  const [apiKey, setApiKey] = useState(apiKeyFromLocalStorage || "");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState<SelectedModel>({
    key: "openai",
    value: "gpt-3.5-turbo-1106",
  });
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

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
  // change color of md editor here:
  useEffect(() => {
    const applyColors = () => {
      const markdownElements = document.getElementsByClassName(
        "wmde-markdown wmde-markdown-color"
      ) as HTMLCollectionOf<HTMLElement>;
      const dark = localStorage.getItem("darkMode") === "true";
      if (markdownElements.length > 0) {
        const markdownElement = markdownElements[0];
        if (dark) {
          markdownElement.style.backgroundColor = "rgb(17, 24, 39)";
        } else {
          markdownElement.style.backgroundColor = "white";
        }
      }
    };
    applyColors();
    const handleWindowLoad = () => {
      applyColors();
    };
    window.addEventListener("load", handleWindowLoad);
    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, [darkMode]);

  // in app
  React.useEffect(() => {
    const mode = darkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.setAttribute("data-color-mode", mode);
  }, [darkMode]);

  // reload or mount
  React.useEffect(() => {
    const getDarkMode = localStorage.getItem("darkMode") === "true";
    const mode = getDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", getDarkMode);
    document.documentElement.setAttribute("data-color-mode", mode);
  }, []);

  function handleSave(): void {
    if (!apiKey) {
      setMessage("Please enter an API key.");
      return;
    }
    localStorage.setItem("apiKey", apiKey);
    onClose();
  }

  function removeApiKey() {
    localStorage.removeItem("apiKey");
    setApiKey("");
    onClose();
  }

  function handleToggleSubmit(mode: boolean) {
    setDarkMode(mode);
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-all duration-300 ease-in-out font-poppins`}
    >
      {/* Blurred background overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-md max-w-lg w-full mx-4 p-6 md:max-w-2xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-gray-700 dark:text-white">
            <IoClose size={30} />
          </button>
        </div>

        {message && !apiKey && (
          <div className="flex items-center border border-gray-600 rounded p-2 mb-4">
            <IoIosInformationCircleOutline size={20} />
            <p className="ml-2">{message}</p>
          </div>
        )}

        {/* API Key Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">API Key:</label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            The API key is stored locally on your browser.
          </span>
          <div className="relative mt-1">
            <input
              type={showKey ? "text" : "password"}
              className="p-3 w-full bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <IoEyeOutline className="w-6 h-6 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100" />
              ) : (
                <IoEyeOffOutline className="w-6 h-6 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100" />
              )}
            </button>
          </div>
        </div>

        {/* Model Select */}
        {isMounted && isTranslateCodePage && (
          <div className="mb-6">
            <ReactSelect
              id={id}
              options={modelOptions}
              value={modelOptions.find(
                (option) => option.value === selectedModel.value
              )}
              onChange={(option) => {
                setSelectedModel({
                  key: option?.key as string,
                  value: option?.value as string,
                });
                localStorage.setItem(
                  "selectedModel",
                  JSON.stringify({
                    key: option?.key as string,
                    value: option?.value as string,
                  })
                );
              }}
              isSearchable={false}
              defaultValue={modelOptions[0]}
            />
          </div>
        )}

        {/* Theme Toggle */}
        {!isTranslateCodePage && (
          <>
            <label className="block text-sm font-medium mb-2">Theme:</label>
            <div className="flex items-center mb-6">
              <ToggleSwitch
                isChecked={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                onSubmit={handleToggleSubmit}
              />
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            className="bg-teal-600 dark:bg-gray-700 hover:bg-teal-800 text-white py-2 px-4 rounded-lg transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-600 dark:bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
            onClick={removeApiKey}
          >
            Remove Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
