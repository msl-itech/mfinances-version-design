import { describe, expect, it } from "vitest";
import { BOOKING_URL } from "../lib/appointment";
import { buildUtmQuery } from "../lib/utm-enrich";

describe("Approved appointment destination", () => {
  it("uses the exact Odoo appointment chosen by Mika", () => {
    expect(BOOKING_URL).toBe("https://odoo.mfinances.be/appointment/11");
  });
  it("keeps appointment 11 when adding attribution", () => {
    const url = new URL(buildUtmQuery(BOOKING_URL));
    expect(url.origin + url.pathname).toBe("https://odoo.mfinances.be/appointment/11");
  });
});