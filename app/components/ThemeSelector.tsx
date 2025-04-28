"use client";

import React from "react";
import { Check } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

// Theme options with their names and a sample color
const themeOptions = [
  { name: "Royal Tech", value: "royal-tech", primaryColor: "#7C3AED" },
  { name: "Ocean Vibes", value: "ocean-vibes", primaryColor: "#06B6D4" },
  {
    name: "Coral & Turquoise",
    value: "coral-turquoise",
    primaryColor: "#F43F5E",
  },
  { name: "Forest & Sage", value: "forest-sage", primaryColor: "#059669" },
  {
    name: "Elegant Monochrome",
    value: "elegant-monochrome",
    primaryColor: "#27272A",
  },
  {
    name: "Gradient Fusion",
    value: "gradient-fusion",
    primaryColor: "#8B5CF6",
  },
  {
    name: "Futuristic Neon",
    value: "futuristic-neon",
    primaryColor: "#6D28D9",
  },
  { name: "Sunset", value: "sunset", primaryColor: "#F97316" },
  { name: "Deep Space", value: "deep-space", primaryColor: "#4F46E5" },
  { name: "Neo Mint", value: "neo-mint", primaryColor: "#14B8A6" },
  { name: "Scandinavian", value: "scandinavian", primaryColor: "#0369A1" },
  {
    name: "Electric Sapphire",
    value: "electric-sapphire",
    primaryColor: "#1D4ED8",
  },
  { name: "Neo Brutalism", value: "neo-brutalism", primaryColor: "#000000" },
  { name: "Aurora", value: "aurora", primaryColor: "#6D28D9" },
  { name: "Soft Pastels", value: "soft-pastels", primaryColor: "#5EAEEA" },
  { name: "Mojave", value: "mojave", primaryColor: "#8856EB" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full px-2">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search themes..." />
        <CommandList>
          <CommandEmpty>No theme found.</CommandEmpty>
          <CommandGroup heading="Color Themes">
            {themeOptions.map((t) => (
              <CommandItem
                key={t.value}
                value={t.value}
                onSelect={() => setTheme(t.value)}
                className="flex cursor-pointer items-center justify-between px-2"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: t.primaryColor }}
                  />
                  <span>{t.name}</span>
                </div>
                {theme === t.value && <Check className="h-4 w-4" />}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default ThemeSelector;
