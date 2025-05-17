import { LocalModelConfig } from "./utils";

/**
 * Gets the API key from either session storage or local storage
 * Prioritizes session storage if available (for security)
 */
export function getApiKey(): string {
  if (typeof window === "undefined") return "";

  // First try session storage
  const sessionKey = sessionStorage.getItem("apiKey");
  if (sessionKey) return sessionKey;

  // Fall back to local storage
  const localKey = localStorage.getItem("apiKey");
  return localKey || "";
}

/**
 * Saves the API key to the appropriate storage based on user preference
 */
export function saveApiKey(
  key: string,
  useSessionStorage: boolean = false
): void {
  if (typeof window === "undefined") return;

  if (useSessionStorage) {
    sessionStorage.setItem("apiKey", key);
    localStorage.removeItem("apiKey"); // Clear from the other storage
  } else {
    localStorage.setItem("apiKey", key);
    sessionStorage.removeItem("apiKey"); // Clear from the other storage
  }
}

/**
 * Removes the API key from both storage locations
 */
export function removeApiKey(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("apiKey");
  sessionStorage.removeItem("apiKey");
}

/**
 * Gets the user's preference for using session storage
 */
export function getStoragePreference(): boolean {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("useSessionStorage") === "true";
}

/**
 * Gets the preferred model type (api or local)
 */
export function getModelType(): "api" | "local" {
  if (typeof window === "undefined") return "api";

  return localStorage.getItem("modelType") === "local" ? "local" : "api";
}

/**
 * Saves the preferred model type
 */
export function saveModelType(type: "api" | "local"): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("modelType", type);
}

/**
 * Gets the local model configuration
 */
export function getLocalModelConfig(): LocalModelConfig | null {
  if (typeof window === "undefined") return null;

  const config = localStorage.getItem("localModelConfig");
  if (!config) return null;

  try {
    return JSON.parse(config) as LocalModelConfig;
  } catch (error) {
    console.error("Error parsing local model config:", error);
    return null;
  }
}

/**
 * Saves the local model configuration
 */
export function saveLocalModelConfig(config: LocalModelConfig): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("localModelConfig", JSON.stringify(config));
}
