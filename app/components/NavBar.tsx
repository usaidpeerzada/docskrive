import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  FileText,
  Code,
  Home,
  HelpCircle,
  FileCode2,
  BotIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { cn } from "../theme-config";
import SettingsLauncher from "./SettingsLauncher";

export default function Navbar({
  onSettingsClick,
  showSettingsButton,
  isTranslateCodePage = false,
}: {
  onSettingsClick: () => void;
  showSettingsButton: boolean;
  isTranslateCodePage?: boolean;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const isActive = (path: string) => pathname === path;

  // Navigation items for both desktop and mobile
  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
    {
      href: "/dashboard",
      label: "Document Your Code",
      icon: <FileText className="h-4 w-4 mr-2" />,
    },
    {
      href: "/code-review",
      label: "Code Review",
      icon: <FileCode2 className="h-4 w-4 mr-2" />,
    },
    {
      href: "/translate-code",
      label: "Translate Code",
      icon: <Code className="h-4 w-4 mr-2" />,
    },
    {
      href: "/faq",
      label: "FAQ",
      icon: <HelpCircle className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop navigation - hidden on homepage, visible elsewhere */}
        {/* {!isHomePage && (
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground/80",
                  isActive(item.href)
                    ? "text-foreground font-medium"
                    : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )} */}

        {/* AITools centered branding */}
        <div
          className={cn(
            "flex justify-center",
            isHomePage ? "flex-1" : "mx-auto"
          )}
        >
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span>AITools</span>
          </Link>
        </div>

        {/* Right side - Settings button */}
        <div className="flex justify-end">
          <SettingsLauncher isTranslateCodePage={isTranslateCodePage} />
        </div>
      </div>
    </header>
  );
}
