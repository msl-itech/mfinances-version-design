import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "ui" || name === "test" ? [] : tsxFiles(path);
    return path.endsWith(".tsx") ? [path] : [];
  });
}

const files = tsxFiles(join(__dirname, ".."));

describe("accessibilité malvoyants", () => {
  it("aucun texte bleu marine plus pâle que 70 % (contraste AA)", () => {
    const pale = files.filter((f) => /(?<![\w-])text-foreground\/(40|45|50|55|60)(?![\d\]])/.test(readFileSync(f, "utf8")));
    expect(pale).toEqual([]);
  });

  it("chaque zone principale est la cible du lien « Aller au contenu »", () => {
    const missing = files.filter((f) => /<main(?![^>]*id="contenu-principal")[\s>]/.test(readFileSync(f, "utf8")));
    expect(missing).toEqual([]);
  });
});
