import React, { useEffect, useState } from "react";
import { getModelType, getLocalModelConfig } from "@/utils/storage";
import { modelOptions } from "@/utils/utils";
import { Server } from "lucide-react";
import { Badge } from "./ui/badge";

interface ModelSelectorDisplayProps {
  className?: string;
}

/**
 * A component that displays the currently selected model (API or local)
 */
export default function ModelSelectorDisplay({
  className,
}: ModelSelectorDisplayProps) {
  const [modelType, setModelType] = useState<"api" | "local">("api");
  const [modelName, setModelName] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Get model type (API or local)
    const type = getModelType();
    setModelType(type);

    // Get model details based on type
    if (type === "local") {
      const localConfig = getLocalModelConfig();
      if (localConfig) {
        setModelName(localConfig.modelName);
      }
    } else {
      // For API model, get from localStorage
      try {
        const storedModel = localStorage.getItem("selectedModel");
        if (storedModel) {
          const model = JSON.parse(storedModel);
          const modelInfo = modelOptions.find(
            (opt) => opt.value === model.value
          );
          if (modelInfo) {
            setModelName(modelInfo.label);
          }
        }
      } catch (error) {
        console.error("Error loading model info:", error);
      }
    }
  }, []);

  if (!isMounted) return null;

  return (
    <Badge
      variant="outline"
      className={`px-2 py-1 flex items-center gap-1 ${className}`}
    >
      {modelType === "local" ? (
        <>
          <Server className="h-3 w-3" />
          Local: {modelName || "Unknown"}
        </>
      ) : (
        <>API: {modelName || "Unknown"}</>
      )}
    </Badge>
  );
}
