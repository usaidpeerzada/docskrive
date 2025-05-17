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
  Loader2,
  ExternalLink,
  Server,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  getApiKey,
  saveApiKey,
  removeApiKey as removeStoredApiKey,
  getStoragePreference,
  getLocalModelConfig,
  saveLocalModelConfig,
  getModelType,
  saveModelType,
} from "@/utils/storage";
import { testLocalModelConnection } from "@/utils/api";
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
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { LocalModelConfig } from "@/utils/utils";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  setMessage: (arg: string) => void;
  isTranslateCodePage: boolean;
}

const defaultLocalModelConfig: LocalModelConfig = {
  serverType: "ollama",
  endpoint: "http://localhost:11434",
  modelName: "llama3",
  temperature: 0.7,
  contextLength: 4096,
};

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

  // Model type settings (local or API)
  const [modelType, setModelType] = useState<"api" | "local">(
    getModelType() || "api"
  );

  // Local model settings
  const [localModelConfig, setLocalModelConfig] = useState<LocalModelConfig>(
    getLocalModelConfig() || defaultLocalModelConfig
  );
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Storage settings
  const [useSessionStorage, setUseSessionStorage] = useState(
    getStoragePreference()
  );

  // Theme settings
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  // Component state
  const [activeTab, setActiveTab] = useState("models");
  const [isMounted, setIsMounted] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  // Handle local model config changes
  const handleLocalModelConfigChange = (
    field: keyof LocalModelConfig,
    value: any
  ) => {
    setLocalModelConfig((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Test local model connection - use our backend endpoint
  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);

    try {
      // Basic validation
      if (!localModelConfig.endpoint) {
        throw new Error("Server endpoint is required");
      }

      if (!localModelConfig.modelName) {
        throw new Error("Model name is required");
      }

      // Validate URL format
      try {
        new URL(localModelConfig.endpoint);
      } catch (e) {
        throw new Error("Invalid server URL format. Please enter a valid URL.");
      }

      // Call our backend test endpoint
      const result = await testLocalModelConnection(localModelConfig);
      setTestResult(result);
    } catch (error) {
      console.error("Connection test error:", error);
      setTestResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Connection failed. Make sure your local model server is running.",
      });
    } finally {
      setTestingConnection(false);
    }
  };

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
    if (modelType === "api" && !apiKey) {
      setMessage("Please enter an API key.");
      return;
    }

    if (modelType === "local") {
      if (!localModelConfig.endpoint || !localModelConfig.modelName) {
        setMessage("Please enter complete local model server details.");
        return;
      }

      // Save local model configuration
      saveLocalModelConfig(localModelConfig);
    } else {
      // Use the utility function to save the API key
      saveApiKey(apiKey, useSessionStorage);
    }

    // Save model type preference
    saveModelType(modelType);

    // If using API, save the selected model
    if (modelType === "api") {
      localStorage.setItem("selectedModel", JSON.stringify(selectedModel));
    }

    onClose();
  }

  function removeApiKey() {
    // Use the utility function to remove the API key
    removeStoredApiKey();
    setApiKey("");
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application settings
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="models"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="api">API Settings</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Model Source</Label>
                <RadioGroup
                  value={modelType}
                  onValueChange={(value) =>
                    setModelType(value as "api" | "local")
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="api" id="api-model" />
                    <Label htmlFor="api-model" className="cursor-pointer">
                      API Models
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="local-model" />
                    <Label htmlFor="local-model" className="cursor-pointer">
                      Local Models
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose between remote API models or locally hosted models
                </p>
              </div>

              {modelType === "api" ? (
                <div className="space-y-2">
                  <div className="grid gap-2">
                    <Label htmlFor="model">API Model</Label>
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
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Anthropic</SelectLabel>
                          {modelOptions
                            .filter((opt) => opt.key === "anthropic")
                            .map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Google</SelectLabel>
                          {modelOptions
                            .filter((opt) => opt.key === "google")
                            .map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    API models require an API key. Configure your key in the{" "}
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm"
                      onClick={() => setActiveTab("api")}
                    >
                      API Settings tab
                    </Button>
                  </p>
                </div>
              ) : (
                <div className="space-y-4 border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-medium">
                      Local Model Configuration
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="server-type">Server Type</Label>
                    <Select
                      value={localModelConfig.serverType}
                      onValueChange={(value) =>
                        handleLocalModelConfigChange("serverType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select server type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ollama">Ollama</SelectItem>
                        <SelectItem value="llamacpp" disabled>
                          Llama.cpp Server
                        </SelectItem>
                        <SelectItem value="localai" disabled>
                          LocalAI
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      {localModelConfig.serverType === "ollama" && (
                        <>
                          Learn more about{" "}
                          <a
                            href="https://ollama.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary flex items-center hover:underline"
                          >
                            Ollama <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        </>
                      )}
                      {localModelConfig.serverType === "llamacpp" && (
                        <>
                          Learn more about{" "}
                          <a
                            href="https://github.com/ggerganov/llama.cpp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary flex items-center hover:underline"
                          >
                            Llama.cpp{" "}
                            <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        </>
                      )}
                      {localModelConfig.serverType === "localai" && (
                        <>
                          Learn more about{" "}
                          <a
                            href="https://localai.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary flex items-center hover:underline"
                          >
                            LocalAI <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endpoint">Server Endpoint</Label>
                    <Input
                      id="endpoint"
                      placeholder={
                        localModelConfig.serverType === "ollama"
                          ? "http://localhost:11434"
                          : localModelConfig.serverType === "localai"
                          ? "http://localhost:8080"
                          : "http://localhost:8000"
                      }
                      value={localModelConfig.endpoint}
                      onChange={(e) =>
                        handleLocalModelConfigChange("endpoint", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-name">Model Name</Label>
                    <Input
                      id="model-name"
                      placeholder={
                        localModelConfig.serverType === "ollama"
                          ? "llama3"
                          : "llama-2-7b-chat"
                      }
                      value={localModelConfig.modelName}
                      onChange={(e) =>
                        handleLocalModelConfigChange(
                          "modelName",
                          e.target.value
                        )
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {localModelConfig.serverType === "ollama"
                        ? "The name of the model you pulled in Ollama (e.g., llama3, mistral)"
                        : "The name of your loaded model"}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="advanced-settings">
                        Advanced Settings
                      </Label>
                      <Switch
                        id="advanced-settings"
                        checked={showAdvanced}
                        onCheckedChange={setShowAdvanced}
                      />
                    </div>
                  </div>

                  {showAdvanced && (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input
                          id="temperature"
                          type="number"
                          min="0"
                          max="2"
                          step="0.1"
                          value={
                            localModelConfig.temperature?.toString() || "0.7"
                          }
                          onChange={(e) =>
                            handleLocalModelConfigChange(
                              "temperature",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Controls randomness (0-2)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="context-length">Max Tokens</Label>
                        <Input
                          id="context-length"
                          type="number"
                          min="512"
                          step="512"
                          value={
                            localModelConfig.contextLength?.toString() || "4096"
                          }
                          onChange={(e) =>
                            handleLocalModelConfigChange(
                              "contextLength",
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum response length
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleTestConnection}
                    disabled={testingConnection}
                    className="w-full"
                    variant="outline"
                  >
                    {testingConnection ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Testing Connection...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>

                  {testResult && (
                    <Alert
                      variant={testResult.success ? "default" : "destructive"}
                    >
                      <AlertTitle className="flex items-center gap-2">
                        {testResult.success ? (
                          <>
                            <Check className="h-4 w-4" />
                            Connection Successful
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4" />
                            Connection Failed
                          </>
                        )}
                      </AlertTitle>
                      <AlertDescription>{testResult.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

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
            </div>
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

        <DialogFooter className="pt-4">
          {modelType === "api" && (
            <Button variant="destructive" onClick={removeApiKey}>
              Remove Key
            </Button>
          )}
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
