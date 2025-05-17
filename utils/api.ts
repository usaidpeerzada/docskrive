import axios from "axios";
import crypto from "crypto";
import { getModelType, getLocalModelConfig } from "./storage";
import { LocalModelConfig } from "./utils";

const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;
const BASE_URL =
  process.env.NEXT_PUBLIC_DOCSKRIVE_API || "http://localhost:3003/api";

function generateNonce(length: number = 16): string {
  return crypto.randomBytes(length).toString("hex");
}

function generateSignature(
  timestamp: string,
  nonce: string,
  body: any
): string {
  const payload = JSON.stringify({
    timestamp,
    nonce,
    body,
  });

  return crypto.createHmac("sha256", API_SECRET!).update(payload).digest("hex");
}

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config: any) => {
  const timestamp = Date.now().toString();
  const nonce = generateNonce();
  const signature = generateSignature(timestamp, nonce, config.data || {});

  config.headers = {
    ...config.headers,
    "x-timestamp": timestamp,
    "x-nonce": nonce,
    "x-signature": signature,
  };

  return config;
});

export const testLocalModelConnection = async (
  config: LocalModelConfig
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post("/local/test-connection", {
      config,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error testing local model connection:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Connection test failed",
    };
  }
};

export const generateDocument = async (data: {
  githubUrl?: string;
  textCode?: string;
  apiKey: string;
  selectedModel: {
    key: string;
    value: string;
  };
}) => {
  try {
    // Check if using local model
    const modelType = getModelType();

    if (modelType === "local") {
      const localConfig = getLocalModelConfig();
      if (!localConfig) {
        throw new Error("Local model configuration not found");
      }

      // Call the local document generation endpoint
      const response = await apiClient.post("/local/generate-document", {
        config: localConfig,
        githubUrl: data.githubUrl,
        textCode: data.textCode,
      });

      return response.data;
    } else {
      // Original API call logic
      const response = await apiClient.post("/generate-document", data);
      return response.data;
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error("Security validation failed:", error.response.data);
    }
    throw error;
  }
};

export const translateCode = async (data: {
  code: string;
  language: string;
  apiKey: string;
  selectedModel: {
    key: string;
    value: string;
  };
}) => {
  try {
    // Check if using local model
    const modelType = getModelType();

    if (modelType === "local") {
      const localConfig = getLocalModelConfig();
      if (!localConfig) {
        throw new Error("Local model configuration not found");
      }

      // Call the local translation endpoint
      const response = await apiClient.post("/local/translate-code", {
        config: localConfig,
        code: data.code,
        language: data.language,
      });

      return response.data;
    } else {
      // Original API call logic
      const response = await apiClient.post("/translate-code", data);
      return response.data;
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error("Security validation failed:", error.response.data);
    }
    throw error;
  }
};

export const analyzeCode = async (data: {
  sourceType: string;
  pullRequestUrl?: string;
  code?: string;
  language: string;
  options: {
    quality: boolean;
    security: boolean;
    performance: boolean;
    style: boolean;
    documentation: boolean;
    depth: string;
  };
  apiKey: string;
  selectedModel: {
    key: string;
    value: string;
  };
}) => {
  try {
    // Check if using local model
    const modelType = getModelType();

    if (modelType === "local") {
      const localConfig = getLocalModelConfig();
      if (!localConfig) {
        throw new Error("Local model configuration not found");
      }

      // Call the local analysis endpoint
      const response = await apiClient.post("/local/analyze-code", {
        config: localConfig,
        sourceType: data.sourceType,
        pullRequestUrl: data.pullRequestUrl,
        code: data.code,
        language: data.language,
        options: data.options,
      });

      return response.data;
    } else {
      // Original API call logic
      const response = await apiClient.post("/analyze-code", data);
      return response.data;
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error("Security validation failed:", error.response.data);
    }
    throw error;
  }
};
