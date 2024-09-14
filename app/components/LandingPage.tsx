// pages/index.js
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-teal-600 font-poppins">
        <div
          className="bg-gray-200 h-80 w-96 md:w-1/3 drop-shadow-xl text-white p-4 rounded-lg"
          //   style={{ width: "550px" }}
        >
          <div className="flex mb-2">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <h1 className="text-4xl text-slate-700 text-center mb-6 font-bold">
            📄 DocSkrive
          </h1>
          {/* <p className=" text-teal-700 text-sm mb-10 w-auto">
            docskrive simplifies coding documentation with smart generation from
            URLs, files, or text. Enhance collaboration and code clarity
            effortlessly
          </p> */}
          <p className="text-slate-700 text-sm mb-10">
            DocSkrive is a smart documentation platform that simplifies the
            creation, management, and sharing of coding documentation. Utilizing
            OpenAI and Gemini API, it effortlessly generates precise
            documentation from URLs, files, or text. Enhance clarity in your
            code with docskrive, making documentation a seamless part of your
            development workflow.
          </p>
          <div className="text-center">
            <motion.button
              initial={{ opacity: 0.6 }}
              whileTap={{ scale: 0.85 }}
              whileInView={{ opacity: 1 }}
            >
              <Link
                href="/dashboard"
                className="bg-slate-700 mb-10 text-white px-4 py-2 rounded hover:bg-slate-500 transition duration-300 ease-in-out"
              >
                Explore
              </Link>
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
