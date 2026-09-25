import { NextResponse } from "next/server";
import { credentialsMatch } from "@/lib/credentials";
import {
  createSessionValue,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";

export const runtime = "nodejs";

type LoginBody = {
  user?: unknown;
  pass?: unknown;
};

export async function POST(request: Request) {
  const expectedUser = process.env.AUTH_USER ?? "";
  const expectedPass = process.env.AUTH_PASS ?? "";
  const secret = process.env.AUTH_SECRET ?? "";

  if (!expectedUser || !expectedPass || !secret) {
    return NextResponse.json({ error: "Auth is not configured" }, { status: 500 });
  }

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const providedUser = typeof body.user === "string" ? body.user : "";
  const providedPass = typeof body.pass === "string" ? body.pass : "";

  if (!credentialsMatch(providedUser, providedPass, expectedUser, expectedPass)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const value = await createSessionValue(secret);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, value, sessionCookieOptions());
  return response;
}
