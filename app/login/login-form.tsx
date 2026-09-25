"use client";

import { FormEvent, useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: String(form.get("user") ?? ""),
        pass: String(form.get("pass") ?? ""),
      }),
    });

    if (!response.ok) {
      setError("Invalid credentials.");
      setPending(false);
      return;
    }

    window.location.assign("/");
  }

  return (
    <form onSubmit={onSubmit}>
      {error ? <p className="login-error">{error}</p> : null}
      <label htmlFor="user">User</label>
      <input
        id="user"
        name="user"
        type="text"
        autoComplete="username"
        required
        autoFocus
      />
      <label htmlFor="pass">Pass</label>
      <input
        id="pass"
        name="pass"
        type="password"
        autoComplete="current-password"
        required
      />
      <button type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
