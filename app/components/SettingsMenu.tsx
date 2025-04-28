"use client";

import React from "react";
import { Settings } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import DarkModeToggle from "./DarkModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface SettingsMenuProps {
  onOpenSettingsModal: () => void;
}

export default function SettingsMenu({
  onOpenSettingsModal,
}: SettingsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 bg-card border-border"
      >
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium leading-none">Appearance</p>
          <p className="text-xs text-muted-foreground">
            Customize the interface
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 focus:bg-transparent cursor-default">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <DarkModeToggle />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium leading-none">Color Themes</p>
          <p className="text-xs text-muted-foreground">
            Choose your preferred theme
          </p>
        </DropdownMenuLabel>
        <div className="px-1 py-0">
          <ThemeSelector />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onOpenSettingsModal}
          className="cursor-pointer"
        >
          <span>API Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
