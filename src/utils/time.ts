
export function hhmm(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
export function parseTimes(csv: string): string[] {
  return String(csv || "").split(",").map(x => x.trim()).filter(Boolean);
}
