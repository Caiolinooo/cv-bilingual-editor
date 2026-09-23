import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionValue } from "./lib/session";

const EDITOR_PATH = "/editor/cv_editor_caio_bilingual.html";

export async function middleware(request: NextRequest) {
  const secret = process.env.AUTH_SECRET ?? "";
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionValue(token, secret);

  if (!valid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL(EDITOR_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    /*
     * Protect everything except login, auth APIs, Next internals,
     * and assets the login page may request.
     * Editor HTML under / and /editor/* stays behind the session cookie.
     */
    "/((?!login|api/login|api/logout|_next/static|_next/image|_next/webpack-hmr|favicon.ico).*)",
  ],
};
