"use client";

import { ScanResult } from "@/types";

interface ReportViewerProps {
  result: ScanResult;
}

export function ReportViewer({ result }: ReportViewerProps) {
  if (!result) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Scan Report</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-500/20 rounded-lg p-4">
          <p className="text-2xl font-bold text-red-400">{result.totalErrors}</p>
          <p className="text-sm text-gray-300">Total Errors</p>
        </div>
        <div className="bg-blue-500/20 rounded-lg p-4">
          <p className="text-2xl font-bold text-blue-400">
            {Object.keys(result.summary.byType).length}
          </p>
          <p className="text-sm text-gray-300">Error Types</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Error Details</h3>
        {result.errors.map((error, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              error.severity === "error"
                ? "bg-red-500/10 border border-red-500/30"
                : "bg-yellow-500/10 border border-yellow-500/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  {error.file}:{error.line}
                </p>
                <p className="text-sm text-gray-300 mt-1">{error.description}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  error.type === "syntax"
                    ? "bg-purple-500/20 text-purple-300"
                    : error.type === "security"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-blue-500/20 text-blue-300"
                }`}
              >
                {error.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}