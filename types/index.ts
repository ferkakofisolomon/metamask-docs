export interface ErrorInfo {
  file: string;
  line: number;
  type: "syntax" | "runtime" | "logic" | "security" | "performance" | "type";
  description: string;
  severity: "error" | "warning" | "info";
}

export interface ScanResult {
  totalErrors: number;
  errors: ErrorInfo[];
  summary: {
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
  };
  timestamp: string;
}