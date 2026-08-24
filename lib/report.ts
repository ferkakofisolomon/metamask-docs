import { ErrorInfo, ScanResult } from "@/types";

export async function generateReport(errors: ErrorInfo[]): Promise<ScanResult> {
  const byType = groupBy(errors, "type");
  const bySeverity = groupBy(errors, "severity");

  return {
    totalErrors: errors.length,
    errors,
    summary: {
      byType: Object.fromEntries(
        Object.entries(byType).map(([key, value]) => [key, value.length])
      ),
      bySeverity: Object.fromEntries(
        Object.entries(bySeverity).map(([key, value]) => [key, value.length])
      ),
    },
    timestamp: new Date().toISOString(),
  };
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}