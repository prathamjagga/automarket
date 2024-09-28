"use client";

import { useState } from "react";

export default function ConnectionsForm({ setShowAddConnectionPopup }: any) {
  const [platform, setPlatform] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", { platform, token });
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-[#666666]">
          Add a Connection
        </h2>

        <div className="mb-4">
          <label
            htmlFor="platform"
            className="mb-2 block text-sm font-medium text-[#666666]"
          >
            Select Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-md border border-[#338AFF] p-2 text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#338AFF]"
            required
          >
            <option value="">Select a platform</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="wordpress">WordPress</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="token"
            className="mb-2 block text-sm font-medium text-[#666666]"
          >
            Enter Token
          </label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full rounded-md border border-[#338AFF] p-2 text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#338AFF]"
            placeholder="Enter your token"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#338AFF] px-4 py-2 font-bold text-white hover:bg-[#2c75d9] focus:outline-none focus:ring-2 focus:ring-[#338AFF]"
        >
          Submit
        </button>
        <button
          onClick={() => setShowAddConnectionPopup(false)}
          className="w-full rounded bg-[#338AFF] px-4 py-2 font-bold text-white hover:bg-[#2c75d9] focus:outline-none focus:ring-2 focus:ring-[#338AFF]"
        >
          Close
        </button>
      </form>
    </div>
  );
}
