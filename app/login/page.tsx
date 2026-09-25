import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="login-shell">
      <section className="login-card">
        <h1>CV Editor</h1>
        <p>Sign in to open the bilingual editor.</p>
        <LoginForm />
      </section>
    </main>
  );
}
