"use client";

import { useState } from "react";
import SidebarWrapper from "../_components/sidebar";
import "./style.css";

export default function AIWorkflowGenerator() {
  const [generationStatus, setGenerationStatus] = useState("GENERATE");
  function generateWf() {
    setGenerationStatus("GENERATING...");
    setGenerationStatus("GENERATE AGAIN");
  }
  return (
    <div className="flex flex-row" style={{ width: "100vw" }}>
      <div className="sidebar">
        <SidebarWrapper />
      </div>
      <div className="right-to-sidebar dotted-bg flex-1 ">
        <h1 className="bg-black text-white">AI Workflow Generator</h1>
        <div className="mb-6 pl-12 pr-12 pt-12">
          <label
            htmlFor="large-input"
            className="mb-2 block text-sm font-medium text-gray-900 text-white "
          >
            What do you wanna build today? 🤔🤖
          </label>
          <input
            type="text"
            id="large-input"
            className="block w-full rounded-lg border border-gray-300 bg-gray-500 p-4 text-base text-white focus:border-blue-500  focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          className="mb-12  me-2 ml-12 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 "
          onClick={generateWf}
        >
          {generationStatus}
        </button>
      </div>
    </div>
  );
}
