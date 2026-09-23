import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

function clearSession(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
}

export async function POST() {
  return clearSession(NextResponse.json({ ok: true }));
}

export async function GET(request: Request) {
  return clearSession(NextResponse.redirect(new URL("/login", request.url)));
}
