import { describe, expect, it } from "vitest";
import { toAbsoluteUrl } from "@/lib/absolute-url";

describe("toAbsoluteUrl", () => {
  it("préfixe une image du site avec le domaine mfinances.be", () => {
    expect(toAbsoluteUrl("/assets/photo.webp")).toBe("https://mfinances.be/assets/photo.webp");
  });
  it("laisse intacte une adresse déjà complète", () => {
    expect(toAbsoluteUrl("https://mfinances.be/og-default.webp")).toBe("https://mfinances.be/og-default.webp");
  });
});
