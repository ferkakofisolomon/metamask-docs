"use client";

import { useState } from "react";
import { ErrorScanner } from "@/components/ErrorScanner";
import { ReportViewer } from "@/components/ReportViewer";
import { ScanResult } from "@/types";

export default function Home() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
    setIsScanning(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Error Fix Tool
        </h1>
        <ErrorScanner
          onScanComplete={handleScanComplete}
          isScanning={isScanning}
          setIsScanning={setIsScanning}
        />
        {scanResult && <ReportViewer result={scanResult} />}
      </div>
    </main>
  );
}