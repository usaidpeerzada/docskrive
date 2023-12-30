import React from "react";
import dynamic from "next/dynamic";
import type { ContextStore } from "@uiw/react-md-editor";
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
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
  const [value, setValue] = React.useState(initialData.content);
  const onChange = React.useCallback<OnChange>((val) => {
    setValue(val || "");
  }, []);
  return (
    <div className="container">
      <div data-color-mode="dark">
        <MDEditor height={200} value={value} onChange={onChange} />
      </div>
    </div>
  );
}
