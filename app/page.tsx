"use client";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";

export default function Page() {
  return (
    <AnimatePresence mode="wait">
      <LandingPage />
    </AnimatePresence>
  );
}
