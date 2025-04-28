import React from "react";
import { Download, Mail } from "lucide-react";
import { EmailShareButton } from "react-share";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

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
    <Card className="h-full">
      {!isTranslationPage && (
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          {/* <CardTitle className="text-xl">Markdown</CardTitle> */}
          {content && (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadClick}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <EmailShareButton
                url={""}
                subject="Check out this Markdown document!"
                body={content ? content : ""}
                className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </EmailShareButton>
            </div>
          )}
        </CardHeader>
      )}
      <CardContent className={isTranslationPage ? "p-2" : ""}>
        {children}
      </CardContent>
    </Card>
  );
};

export default GeneratedDocument;
