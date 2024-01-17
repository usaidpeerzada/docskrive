import React from "react";
import dynamic from "next/dynamic";
import type { ContextStore } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize"; //preventing xss
interface MarkdownProps {
  initialData: { content: string };
}
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
type OnChange = (
  value?: string,
  event?: React.ChangeEvent<HTMLTextAreaElement>,
  state?: ContextStore
) => void;

export default function MarkdownEditor({ initialData }: MarkdownProps) {
  const [value, setValue] = React.useState(initialData?.content);
  const darkMode =
    typeof window !== "undefined" &&
    localStorage.getItem("darkMode") === "true";
  const onChange = React.useCallback<OnChange>((val) => {
    setValue(val || "");
  }, []);
  React.useEffect(() => {
    setValue(initialData?.content);
  }, [initialData]);
  return (
    <div className="container">
      <div data-color-mode="dark">
        <div className="wmde-markdown"></div>
        <div className="wmde-markdown-color"></div>
        <MDEditor
          style={darkMode ? { backgroundColor: "rgb(17 24 39)" } : {}}
          height={720}
          value={value}
          onChange={onChange}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
    </div>
  );
}
