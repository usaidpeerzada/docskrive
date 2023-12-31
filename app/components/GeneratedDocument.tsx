// components/GeneratedDocument.tsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "./MarkdownEditor";

interface GeneratedDocumentProps {
  content: string | null;
}

const GeneratedDocument: React.FC<GeneratedDocumentProps> = ({ content }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCopyClick = () => {
    if (content) {
      navigator.clipboard.writeText(content);
    }
  };

  const handleDownloadClick = () => {
    if (content) {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-document.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  const initialData = { content: content || "" };
  return (
    <div className="flex flex-col bg-light-dashboard text-light-primary dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4">Generated Document:</h2>
      <div className="flex-1 overflow-auto">
        <MarkdownEditor initialData={initialData} />
      </div>
    </div>
  );
};

export default GeneratedDocument;
