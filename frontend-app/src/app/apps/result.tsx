"use client";

import React, { useState } from "react";

interface LoadingPopupProps {
  loading?: boolean;
  result?: string;
  setS?: boolean;
}

export default function LoadingPopup({ loading, result, setShow }: any) {
  return (
    <div className="z-50">
      {
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              {result == "" ? (
                <h2 className="text-xl font-bold">Processing</h2>
              ) : (
                <h2 className="text-xl font-bold">Result</h2>
              )}
              <button
                onClick={() => {
                  // alert("setting setshow to false");
                  setShow(false);
                }}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-center p-4">
              {loading ? (
                <div
                  className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"
                  role="status"
                  aria-label="Loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {result}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
