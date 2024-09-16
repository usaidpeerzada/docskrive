import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For getting current path
import { SlSettings } from "react-icons/sl";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar({
  onSettingsClick,
  showSettingsButton,
}: {
  onSettingsClick: () => void;
  showSettingsButton: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-teal-700 text-white p-4 flex items-center justify-between font-poppins">
      <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>
      <div className="hidden md:flex md:items-center gap-4">
        <Link
          href="/"
          className={`hover:underline ${
            isActive("/") ? "underline font-bold" : ""
          }`}
        >
          Home
        </Link>
        |
        <Link
          href="/dashboard"
          className={`hover:underline ${
            isActive("/dashboard") ? "underline font-bold" : ""
          }`}
        >
          Create code documentation
        </Link>
        |
        <Link
          href="/translate-code"
          className={`hover:underline ${
            isActive("/translate-code") ? "underline font-bold" : ""
          }`}
        >
          Translate code
        </Link>
        |
        <Link
          href="/faq"
          className={`hover:underline ${
            isActive("/faq") ? "underline font-bold" : ""
          }`}
        >
          FAQ
        </Link>
      </div>
      {showSettingsButton ? (
        <button
          className="ml-auto bg-white dark:bg-gray-700 hover:bg-gray-100 hover:border-gray-100 border border-gray-100 dark:border-gray-600 rounded p-2"
          onClick={onSettingsClick}
        >
          <SlSettings className="text-teal-700" />
        </button>
      ) : null}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-teal-700 text-white z-50 flex flex-col items-center justify-center space-y-4 md:hidden">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={toggleMenu}
          >
            <HiX />
          </button>
          <Link
            href="/"
            className={`hover:underline text-2xl ${
              isActive("/") ? "underline font-bold" : ""
            }`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`hover:underline text-2xl ${
              isActive("/dashboard") ? "underline font-bold" : ""
            }`}
            onClick={toggleMenu}
          >
            Code documentation
          </Link>
          <Link
            href="/translate-code"
            className={`hover:underline text-2xl ${
              isActive("/translate-code") ? "underline font-bold" : ""
            }`}
            onClick={toggleMenu}
          >
            Translate code
          </Link>
          <Link
            href="/faq"
            className={`hover:underline text-2xl ${
              isActive("/faq") ? "underline font-bold" : ""
            }`}
            onClick={toggleMenu}
          >
            FAQ
          </Link>
        </div>
      )}
    </nav>
  );
}
