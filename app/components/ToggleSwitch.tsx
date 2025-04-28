import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

interface ToggleSwitchProps {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (mode: boolean) => void;
  isChecked?: boolean;
}

const ToggleSwitch = ({
  setIsDarkMode,
  onSubmit,
  isChecked: initialIsChecked,
}: ToggleSwitchProps) => {
  const initialDarkMode = () =>
    typeof window !== "undefined" &&
    localStorage.getItem("darkMode") === "true";

  const [isChecked, setIsChecked] = useState(
    initialIsChecked !== undefined ? initialIsChecked : initialDarkMode()
  );

  useEffect(() => {
    // Update the dark mode preference in localStorage whenever it changes
    typeof window !== "undefined" &&
      localStorage.setItem("darkMode", `${isChecked}`);
    onSubmit(isChecked);
  }, [isChecked, onSubmit]);

  const handleCheckboxChange = () => {
    setIsChecked((prevMode) => !prevMode);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className={!isChecked ? "bg-primary/10" : ""}
        >
          <Sun className="h-4 w-4" />
          <span className="sr-only">Light Mode</span>
        </Button>
        <Switch
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          id="dark-mode"
        />
        <Button
          variant="outline"
          size="icon"
          className={isChecked ? "bg-primary/10" : ""}
        >
          <Moon className="h-4 w-4" />
          <span className="sr-only">Dark Mode</span>
        </Button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
