import React from "react";
import Link from "next/link";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-teal-600 font-poppins">
        <div className="bg-gray-200 h-100 w-80 lg:h-60 lg:w-1/3 drop-shadow-xl text-white p-4 rounded-lg">
          <div className="flex mb-2">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <h1 className="text-4xl text-slate-700 text-center mb-6 font-bold mt-4">
            📄 DocSkrive
          </h1>
          <p className="text-slate-700 text-sm  mb-3">
            Access the power of <u>DocSkrive</u> to{" "}
            <b>create technical documents</b> using <b>AI</b> or{" "}
            <b>translate your code</b> from one language to another in simple
            steps.
          </p>
          <div className="text-center mt-6 mb-4 lg:mt-6">
            <Link
              href="/dashboard"
              className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-500 transition duration-300 ease-in-out"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
