"use client";

import { useTheme } from "../components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        id="dark-mode"
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
