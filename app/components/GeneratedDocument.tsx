import React from "react";
import { IoDownloadOutline, IoMailOutline } from "react-icons/io5";
import { EmailShareButton } from "react-share";

interface GeneratedDocumentProps {
  isTranslationPage: boolean;
  content: string | null;
  children: React.ReactNode;
}

const GeneratedDocument: React.FC<GeneratedDocumentProps> = ({
  isTranslationPage,
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
        <div>
          {isTranslationPage ? null : (
            <h2 className="text-2xl font-bold mb-4">Markdown:</h2>
          )}
        </div>
        <div>
          {content ? (
            <>
              <button onClick={handleDownloadClick}>
                <IoDownloadOutline className="w-6 h-6 mr-2 lg:mr-0  lg:absolute right-12 top-11" />
              </button>
              <EmailShareButton
                url={""}
                subject="Check out this Markdown document!"
                body={content ? content : ""}
              >
                <IoMailOutline className="w-5 h-5 lg:mt-3 lg:relative right-8" />
              </EmailShareButton>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default GeneratedDocument;
