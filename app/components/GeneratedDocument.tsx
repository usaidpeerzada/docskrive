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
        {content ? (
          <>
            <MarkdownEditor initialData={initialData} />
            {/* <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                onClick={handleCopyClick}
              >
                Copy Text
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full"
                onClick={handleDownloadClick}
              >
                Download
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full"
                onClick={handleEditClick}
              >
                {isEditing ? "Done Editing" : "Edit"}
              </button>
            </div> */}
          </>
        ) : (
          <p className="italic text-gray-600">No document generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default GeneratedDocument;
