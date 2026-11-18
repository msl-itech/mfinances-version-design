// Export CSV lisible par Excel en français : séparateur « ; », BOM UTF-8 pour les accents.
export type CsvCell = string | number | null | undefined;

function cell(v: CsvCell): string {
  const s = v === null || v === undefined ? "" : String(v);
  // Neutralise les formules (=, +, -, @) pour qu'Excel n'exécute rien venant d'une question de visiteur.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return /[";\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function toCsv(rows: CsvCell[][]): string {
  return "\uFEFF" + rows.map((r) => r.map(cell).join(";")).join("\r\n");
}

export function downloadCsv(rows: CsvCell[][], filename: string): void {
  const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
