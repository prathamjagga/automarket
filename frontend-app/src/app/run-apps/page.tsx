"use client";

import { useState } from "react";
import { HiDocumentText, HiChartPie } from "react-icons/hi";

export default function RunApps() {
  const [showApp, setShowApp] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  return (
    <div className="  align-items-center flex  w-[100vw] flex-col justify-center">
      <input type="text" placeholder="search" className="m-10" />
      <br />
      <h3 className="pb-10 text-center">Available Apps</h3>
      <div
        className="align-items-center flex cursor-pointer flex-row justify-center"
        onClick={() => {
          setShowApp(true);
        }}
      >
        <HiChartPie size={100} />
        <HiDocumentText size={100} />
      </div>
      {showApp ? (
        <div>
          <h3>Text Summarizer (APP)</h3>
          <input placeholder="Enter text input here" />
          <button
            onClick={() => {
              setShowOutput(true);
            }}
          >
            Run App
          </button>
        </div>
      ) : (
        ""
      )}
      {showOutput ? (
        <div>
          <h3>Output</h3>
          <p>this is your summarized text</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
