import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { credentialsMatch, safeEqual } from "./credentials.ts";

describe("credentials timingSafeEqual", () => {
  it("matches equal strings and rejects mismatches", () => {
    assert.equal(safeEqual("alpha", "alpha"), true);
    assert.equal(safeEqual("alpha", "beta"), false);
    assert.equal(safeEqual("alpha", "alph"), false);
    assert.equal(safeEqual("", ""), true);
  });

  it("requires both user and pass to match", () => {
    assert.equal(credentialsMatch("u", "p", "u", "p"), true);
    assert.equal(credentialsMatch("u", "nope", "u", "p"), false);
    assert.equal(credentialsMatch("nope", "p", "u", "p"), false);
  });
});
