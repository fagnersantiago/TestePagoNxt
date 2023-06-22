import path from "path";
export function getFileName(filePath: string): string {
  return path.basename(filePath);
}
