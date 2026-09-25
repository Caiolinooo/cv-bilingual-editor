import { timingSafeEqual } from "node:crypto";

export function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  const len = Math.max(aBuf.length, bBuf.length);
  if (len === 0) {
    return true;
  }
  const paddedA = Buffer.alloc(len);
  const paddedB = Buffer.alloc(len);
  aBuf.copy(paddedA);
  bBuf.copy(paddedB);
  return timingSafeEqual(paddedA, paddedB) && aBuf.length === bBuf.length;
}

export function credentialsMatch(
  providedUser: string,
  providedPass: string,
  expectedUser: string,
  expectedPass: string,
): boolean {
  const userOk = safeEqual(providedUser, expectedUser);
  const passOk = safeEqual(providedPass, expectedPass);
  return userOk && passOk;
}
