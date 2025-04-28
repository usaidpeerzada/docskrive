"use client";
import React, { useState } from "react";
import { cn } from "../theme-config";
import { UploadCloud, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface FileUploadProps {
  handleFileChange: (text: string) => void;
}

const FileUpload = ({ handleFileChange }: FileUploadProps) => {
  const [fileList, setFileList] = useState<File[] | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function convertFileToText(file: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event?.target?.result as string | null;
      const base64String = result?.split(",")[1] || "";
      const decodedText = atob(base64String);
      handleFileChange(decodedText);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Card
      className={cn(
        "border-2 border-dashed",
        shouldHighlight
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25"
      )}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-8 text-xs"
        onDragOver={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(true);
        }}
        onDragEnter={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(true);
        }}
        onDragLeave={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(false);
        }}
        onDrop={(e) => {
          preventDefaultHandler(e);
          const files = Array.from(e.dataTransfer.files);
          convertFileToText(files[0]);
          setFileList(files);
          setShouldHighlight(false);
        }}
      >
        {!fileList ? (
          <>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-medium">Drag your file here</p>
              <p className="text-xs text-muted-foreground">
                All language files are supported
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-semibold">File to Upload</p>
              {fileList.map((file, i) => (
                <span
                  key={i}
                  className="text-xs text-muted-foreground flex items-center"
                >
                  {file.name}
                </span>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setFileList(null);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
