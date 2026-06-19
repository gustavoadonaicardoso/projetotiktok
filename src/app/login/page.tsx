"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050507", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width: 500, height: 500, background: "rgba(124,58,237,0.1)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #db2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#fff", fontWeight: 700, margin: "0 auto 16px" }}>✝</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>FéViral</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Content Studio</p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 6 }}>Entrar na sua conta</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Acesse o painel de controle</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="input"
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>Senha</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex" }}
                >
                  {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", fontSize: 13, color: "#f87171" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: 4, width: "100%", padding: "11px 0", borderRadius: 8, background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg, #7c3aed, #db2777)", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s" }}
            >
              {loading && <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 24 }}>
          FéViral Content Studio · Acesso restrito
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
