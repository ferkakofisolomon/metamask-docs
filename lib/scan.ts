import fs from "fs/promises";
import path from "path";
import { ErrorInfo } from "@/types";

export async function scanCodebase(filePaths: string[]): Promise<ErrorInfo[]> {
  const errors: ErrorInfo[] = [];

  for (const filePath of filePaths) {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const fileErrors = analyzeFile(content, filePath);
      errors.push(...fileErrors);
    } catch (error) {
      errors.push({
        file: filePath,
        line: 0,
        type: "runtime",
        description: `Failed to read file: ${error}`,
        severity: "error",
      });
    }
  }

  return errors;
}

function analyzeFile(content: string, filePath: string): ErrorInfo[] {
  const errors: ErrorInfo[] = [];
  const lines = content.split("\n");

  // Check for common syntax errors
  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Check for unclosed strings
    const stringMatches = line.match(/['"`]/g);
    if (stringMatches && stringMatches.length % 2 !== 0) {
      errors.push({
        file: filePath,
        line: lineNumber,
        type: "syntax",
        description: "Unclosed string literal detected",
        severity: "error",
      });
    }

    // Check for console.log statements (potential security issue)
    if (line.includes("console.log") && !line.includes("//")) {
      errors.push({
        file: filePath,
        line: lineNumber,
        type: "security",
        description: "Console.log statement found in production code",
        severity: "warning",
      });
    }

    // Check for hardcoded secrets
    const secretPatterns = [
      /(?:api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"]+['"]/i,
      /sk-[a-zA-Z0-9]{20,}/, // OpenAI key pattern
      /ghp_[a-zA-Z0-9]{36}/, // GitHub token pattern
    ];

    for (const pattern of secretPatterns) {
      if (pattern.test(line)) {
        errors.push({
          file: filePath,
          line: lineNumber,
          type: "security",
          description: "Potential hardcoded secret detected",
          severity: "error",
        });
      }
    }
  });

  return errors;
}