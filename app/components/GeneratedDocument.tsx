import React from "react";
import { IoDownloadOutline, IoMailOutline } from "react-icons/io5";
import { EmailShareButton } from "react-share";

interface GeneratedDocumentProps {
  content: string | null;
  children: React.ReactNode;
}

const GeneratedDocument: React.FC<GeneratedDocumentProps> = ({
  content,
  children,
}) => {
  function handleDownloadClick() {
    if (content) {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "README.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  return (
    <div className="flex flex-col bg-light-dashboard text-light-primary dark:text-gray-500 dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Markdown:</h2>
        {content ? (
          <>
            <button onClick={handleDownloadClick}>
              <IoDownloadOutline className="w-6 h-6 absolute right-12 top-12" />
            </button>
            <EmailShareButton
              url={""}
              subject="Check out this Markdown document!"
              body={content ? content : ""}
            >
              <IoMailOutline className="w-5 h-5 relative right-8 bottom-2" />
            </EmailShareButton>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default GeneratedDocument;
