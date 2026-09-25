import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createSessionValue, verifySessionValue } from "./session.ts";

const secret = "unit-test-secret-not-for-deployment";
const encoder = new TextEncoder();

async function signPayload(payload: string, keySecret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(keySecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hex = Array.from(new Uint8Array(sig))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `${payload}.${hex}`;
}

describe("session HMAC", () => {
  it("accepts a freshly signed value", async () => {
    const value = await createSessionValue(secret);
    assert.equal(await verifySessionValue(value, secret), true);
  });

  it("rejects a tampered payload", async () => {
    const value = await createSessionValue(secret);
    const lastDot = value.lastIndexOf(".");
    const tampered = `v1.${Math.floor(Date.now() / 1000) + 60}.${value.slice(lastDot + 1)}`;
    assert.equal(await verifySessionValue(tampered, secret), false);
  });

  it("rejects a missing value, empty secret, wrong secret, and expired payload", async () => {
    assert.equal(await verifySessionValue(undefined, secret), false);
    assert.equal(await verifySessionValue("v1.1.00", ""), false);

    const fresh = await createSessionValue(secret);
    assert.equal(await verifySessionValue(fresh, "other-secret-not-for-deployment"), false);

    const expired = await signPayload(`v1.${Math.floor(Date.now() / 1000) - 10}`, secret);
    assert.equal(await verifySessionValue(expired, secret), false);
  });
});
