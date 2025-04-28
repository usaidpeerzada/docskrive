import React, { useEffect, useState } from "react";
import { SelectedModel } from "./Dashboard";
import { modelOptions } from "@/utils/utils";
import {
  Eye,
  EyeOff,
  Info,
  Palette,
  Moon,
  Sun,
  HelpCircle,
} from "lucide-react";
import {
  getApiKey,
  saveApiKey,
  removeApiKey as removeStoredApiKey,
  getStoragePreference,
} from "@/utils/storage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useTheme } from "../components/ThemeProvider";
import { themeOptions } from "../theme-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  setMessage: (arg: string) => void;
  isTranslateCodePage: boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  message,
  setMessage,
  isTranslateCodePage,
}) => {
  // API settings
  const [apiKey, setApiKey] = useState(getApiKey() || "");
  const [showKey, setShowKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState<SelectedModel>({
    key: "openai",
    value: "gpt-3.5-turbo-1106",
  });

  // Storage settings
  const [useSessionStorage, setUseSessionStorage] = useState(
    getStoragePreference()
  );

  // Theme settings
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  // Component state
  const [activeTab, setActiveTab] = useState("api");
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

  // Store the session storage preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("useSessionStorage", useSessionStorage.toString());
    }
  }, [useSessionStorage]);

  // change color of md editor here:
  useEffect(() => {
    const applyColors = () => {
      const markdownElements = document.getElementsByClassName(
        "wmde-markdown wmde-markdown-color"
      ) as HTMLCollectionOf<HTMLElement>;
      const dark = isDarkMode;
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
  }, [isDarkMode]);

  function handleSave(): void {
    if (!apiKey) {
      setMessage("Please enter an API key.");
      return;
    }

    // Use the utility function to save the API key
    saveApiKey(apiKey, useSessionStorage);

    onClose();
  }

  function removeApiKey() {
    // Use the utility function to remove the API key
    removeApiKey();
    setApiKey("");
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application settings
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api">API Settings</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-4 py-4">
            {message && !apiKey && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <div className="relative">
                      <Input
                        id="api-key"
                        type={showKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowKey(!showKey)}
                      >
                        {showKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showKey ? "Hide" : "Show"} API key
                        </span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The API key is stored in your browser.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="session-storage">Temporary Storage</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                            <span className="sr-only">Storage information</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            <strong>Temporary Storage:</strong> API key will be
                            cleared when you close your browser. More secure but
                            requires re-entering your key.
                          </p>
                          <p className="mt-1">
                            <strong>Persistent Storage:</strong> API key will
                            remain saved between browser sessions. More
                            convenient but less secure.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch
                    id="session-storage"
                    checked={useSessionStorage}
                    onCheckedChange={setUseSessionStorage}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {useSessionStorage
                    ? "Your API key will be cleared when you close your browser."
                    : "Your API key will remain saved between browser sessions."}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>OpenAI</SelectLabel>
                      {modelOptions
                        .filter((opt) => opt.key === "openai")
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Anthropic</SelectLabel>
                      {modelOptions
                        .filter((opt) => opt.key === "anthropic")
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Google</SelectLabel>
                      {modelOptions
                        .filter((opt) => opt.key === "google")
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button variant="destructive" onClick={removeApiKey}>
                Remove Key
              </Button>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="dark-mode"
                    className="flex items-center gap-2"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <span>Dark Mode</span>
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes.
                </p>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="theme-select"
                  className="flex items-center gap-2"
                >
                  <Palette className="h-4 w-4" />
                  <span>Color Theme</span>
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {themeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: option.primaryColor }}
                          />
                          <span>{option.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose a color theme for the application.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
