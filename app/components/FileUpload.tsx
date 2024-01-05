"use client";
import React, { useState } from "react";
import classNames from "classnames";

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
      //   console.log(decodedText);
      handleFileChange(decodedText);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div
      className={classNames({
        "w-full h-40": true,
        "p-4 grid place-content-center cursor-pointer": true,
        "text-gray-900 dark:text-gray-500 rounded-lg": true,
        border: true,
        "transition-colors": true,
        "border-gray-600 bg-gray-200 dark:bg-gray-700": shouldHighlight,
        "border-gray-600 bg-gray-100 dark:bg-gray-700": !shouldHighlight,
      })}
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
      <div className="flex flex-col items-center">
        {!fileList ? (
          <>
            {/* <CloudArrowUpIcon className="w-10 h-10" /> */}
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <span>
              <span>Drag your file</span> here
            </span>
            <span className="text-gray-400 text-xs">
              all language files are supported
            </span>
          </>
        ) : (
          <>
            <p>File to Upload</p>
            {fileList.map((file, i) => {
              return <span key={i}>{file.name}</span>;
            })}
            <div className="flex gap-2 mt-2">
              {/* <button
                className="bg-gray-500 text-gray-100 px-2 py-1 rounded-md"
                onClick={() => {
                  convertFileToText();
                }}
              >
                Generate
              </button> */}
              <button
                className="border border-gray-500 px-2 py-1 rounded-md"
                onClick={() => {
                  setFileList(null);
                }}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
