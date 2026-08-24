import { NextRequest, NextResponse } from "next/server";
import { scanCodebase } from "@/lib/scan";
import { generateReport } from "@/lib/report";
import { ScanResult } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePaths } = body;

    if (!filePaths || !Array.isArray(filePaths)) {
      return NextResponse.json(
        { error: "filePaths must be an array of strings" },
        { status: 400 }
      );
    }

    const errors = await scanCodebase(filePaths);
    const report = await generateReport(errors);

    return NextResponse.json({ report, errors });
  } catch (error) {
    console.error("Error fixing process:", error);
    return NextResponse.json(
      { error: "Failed to process error fix request" },
      { status: 500 }
    );
  }
}