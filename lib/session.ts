export const SESSION_COOKIE = "cv_session";
export const SESSION_MAX_AGE = 8 * 60 * 60;

const encoder = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  if (!hex || hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) {
    return new Uint8Array();
  }
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i += 1) {
    out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function createSessionValue(secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `v1.${exp}`;
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toHex(sig)}`;
}

export async function verifySessionValue(
  value: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!value || !secret) {
    return false;
  }

  const lastDot = value.lastIndexOf(".");
  if (lastDot <= 0) {
    return false;
  }

  const payload = value.slice(0, lastDot);
  const sigHex = value.slice(lastDot + 1);
  const parts = payload.split(".");
  if (parts.length !== 2 || parts[0] !== "v1") {
    return false;
  }

  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) {
    return false;
  }

  const key = await importHmacKey(secret);
  const expected = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payload)),
  );
  const actual = fromHex(sigHex);
  return timingSafeEqualBytes(actual, expected);
}
