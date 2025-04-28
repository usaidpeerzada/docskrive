import React, { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import SettingsModal from "./SettingsModal";

interface SettingsLauncherProps {
  isTranslateCodePage?: boolean;
}

export default function SettingsLauncher({
  isTranslateCodePage = false,
}: SettingsLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative h-8 w-8 rounded-full"
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </Button>

      <SettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
        setMessage={setMessage}
        isTranslateCodePage={isTranslateCodePage}
      />
    </>
  );
}
