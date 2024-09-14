import React, { useEffect, useLayoutEffect, useState } from "react";
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
    key: "open-ai",
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-dashboard text-gray-700 dark:bg-gray-800 dark:text-gray-500 p-10 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h2 className="text-2xl center font-bold mb-4">Settings</h2>
          <button onClick={onClose} className="pb-3">
            <IoClose style={{ width: 30, height: 30 }} />
          </button>
        </div>
        {message && !apiKey && (
          <div className="flex border border-gray-600 rounded focus:outline-none p-2 mb-2">
            <IoIosInformationCircleOutline
              style={{ width: 20, height: 20, marginTop: 2 }}
            />
            <p className="ml-3">{message}</p>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium">API Key:</label>
          <span className="text-gray-300 dark:text-gray-600 text-xs">
            The API key is stored locally on your browser.
          </span>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              className="p-2 w-full bg-gray-100 dark:bg-gray-700 border border-gray-600 rounded focus:outline-none text-gray-900 dark:text-gray-500"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-700  right-1 p-2"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <IoEyeOutline className="w-6 h-6 text-gray-900" />
              ) : (
                <IoEyeOffOutline className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
        {isMounted && isTranslateCodePage ? (
          <div className="mb-6">
            <ReactSelect
              id={id}
              options={modelOptions}
              value={modelOptions.find(
                (option) => option.value === selectedModel.value
              )}
              onChange={(option) => {
                setSelectedModel(
                  {
                    key: option?.key as string,
                    value: option?.value as string,
                  } || null
                );
                localStorage.setItem(
                  "selectedModel",
                  JSON.stringify({
                    key: option?.key as string,
                    value: option?.value as string,
                  })
                );
              }}
              // styles={customStyles}
              // theme={customTheme}
              isSearchable={false}
              defaultValue={modelOptions[0]}
            />
          </div>
        ) : null}
        {isTranslateCodePage ? null : (
          <>
            <label className="block text-sm font-medium mb-2">Theme: </label>
            <div className="flex items-center mb-4 border border-gray-900 rounded">
              <ToggleSwitch
                isChecked={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                onSubmit={handleToggleSubmit}
              />
            </div>
          </>
        )}
        <button
          className="bg-teal-600 dark:bg-gray-700 hover:bg-teal-800 text-gray-100 dark:text-white py-2 px-4 mr-2 rounded-full transition-all duration-300 ease-in-out"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-teal-600 dark:bg-gray-700 hover:bg-teal-800 text-gray-100 dark:text-white py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
          onClick={removeApiKey}
        >
          Remove key
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
