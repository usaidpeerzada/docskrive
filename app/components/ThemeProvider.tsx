"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { generateThemeVariables, defaultTheme } from "../../app/theme-config";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => null,
  isDarkMode: false,
  toggleDarkMode: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved theme and dark mode preference on mount
  useEffect(() => {
    // Only run on client side
    const savedTheme = localStorage.getItem("theme") || defaultTheme;
    const darkMode = localStorage.getItem("darkMode") === "true";

    setThemeState(savedTheme);
    setIsDarkMode(darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    }

    setMounted(true);
  }, []);

  // Update CSS variables when theme changes
  useEffect(() => {
    if (!mounted) return;

    // Save theme preference
    localStorage.setItem("theme", theme);

    // Generate and apply CSS variables
    const styleElement = document.createElement("style");
    styleElement.setAttribute("id", "theme-variables");
    styleElement.textContent = generateThemeVariables(theme);

    // Remove existing style element if it exists
    const existingStyle = document.getElementById("theme-variables");
    if (existingStyle && existingStyle.parentNode) {
      existingStyle.parentNode.removeChild(existingStyle);
    }

    // Add new style element
    document.head.appendChild(styleElement);
  }, [theme, mounted]);

  // Set theme and save to localStorage
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isDarkMode, toggleDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
