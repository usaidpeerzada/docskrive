import React from "react";
import Footer from "../components/Footer";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="mt-auto p-4 text-center bg-gray-200">
        <p className="text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          |{" "}
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>{" "}
        </p>
      </div>
      <div className="min-h-screen flex justify-center items-center bg-teal-600">
        <div className=" px-5 mt-10 mb-10 bg-gray-200 border rounded w-96 md:w-1/2">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-5xl mt-5 text-slate-700 tracking-tight">
              FAQ
            </h2>
            <p className="text-neutral-500 text-xl mt-3">
              Frequenty asked questions
            </p>
          </div>
          <div className="grid divide-y text-slate-700 divide-neutral-300 max-w-xl mx-auto mt-8">
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span> What is DocSkrive?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 visible">
                  DocSkrive is a smart documentation platform that simplifies
                  the creation, management, and sharing of coding documentation.
                  Utilizing OpenAI and Gemini API, it effortlessly generates
                  precise documentation from URLs, files, or text. Enhance
                  clarity in your code with docskrive, making documentation a
                  seamless part of your development workflow.
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group" open={true}>
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Are our API keys safe?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  Yes, DocSkrive does not save your API keys anywhere on their
                  server. The keys are stored in your browser&apos;s local
                  storage, you can remove anytime you want to.
                </p>
              </details>
            </div>
            {/* <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> Can I get a refund for my subscription?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                We offers a 30-day money-back guarantee for most of its
                subscription plans. If you are not satisfied with your
                subscription within the first 30 days, you can request a full
                refund. Refunds for subscriptions that have been active for
                longer than 30 days may be considered on a case-by-case basis.
              </p>
            </details>
          </div> */}
            {/* <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> How do we compare to other similar services?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                This platform is a highly reliable and feature-rich service that
                offers a wide range of tools and functionality. It is
                competitively priced and offers a variety of billing options to
                suit different needs and budgets.
              </p>
            </details>
          </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
