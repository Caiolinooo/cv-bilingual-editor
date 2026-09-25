# Tasks

## Password gate (Next.js)

- [x] Add minimal Next.js App Router (TypeScript)
- [x] Move editor HTML to `public/editor/` (no CV body invented)
- [x] `middleware.ts` redirects to `/login` without a valid HMAC session cookie
- [x] Login form + `/api/login` (`timingSafeEqual`) + POST-only `/api/logout` (no GET CSRF)
- [x] Session cookie: HMAC-SHA256, HttpOnly, Secure, SameSite=Lax, Path=/, 8h
- [x] Update README / LEIA-ME / vercel.json (no static rewrite that bypasses auth)
- [x] Document env names only; no secrets in the repo
