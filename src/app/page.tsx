import Link from "next/link";
import { BarChart3, Video, Calendar, Zap, ArrowRight, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050507", position: "relative", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, transparent 50%, rgba(219,39,119,0.15) 100%)" }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "rgba(124,58,237,0.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 0 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #db2777)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#fff" }}>✝</div>
            <span style={{ fontWeight: 700, color: "#fff", fontSize: 17 }}>FéViral</span>
          </div>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#7c3aed", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Acessar Studio <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 999, padding: "6px 16px", color: "#a78bfa", fontSize: 13, marginBottom: 28 }}>
            <Zap style={{ width: 13, height: 13 }} />
            Conteúdo cristão que viraliza
          </div>

          <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, color: "#fff", lineHeight: 1.05, marginBottom: 20 }}>
            Leve sua{" "}
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              mensagem
            </span>
            <br />
            para o mundo
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.65 }}>
            Crie, agende e analise seus conteúdos cristãos no TikTok e Instagram.
            Alcance milhares de almas com conteúdo dark e impactante.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #7c3aed, #db2777)", color: "#fff", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Começar agora <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
            <Link href="/analytics" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.18)", color: "#fff", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
              Ver métricas
            </Link>
          </div>
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 72 }}>
          {[
            { icon: <Video style={{ width: 24, height: 24, color: "#a78bfa" }} />, title: "Gestão de Conteúdo", desc: "Organize e gerencie todos os seus vídeos em um só lugar" },
            { icon: <Calendar style={{ width: 24, height: 24, color: "#f472b6" }} />, title: "Postagem Automática", desc: "Agende publicações para TikTok e Instagram simultaneamente" },
            { icon: <BarChart3 style={{ width: 24, height: 24, color: "#60a5fa" }} />, title: "Métricas Reais", desc: "Acompanhe curtidas, seguidores e engajamento em tempo real" },
            { icon: <TrendingUp style={{ width: 24, height: 24, color: "#4ade80" }} />, title: "Crescimento", desc: "Estratégias e análises para crescer seu público cristão" },
          ].map((f, i) => (
            <div key={i} style={{ padding: 20, borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)" }}>
              <div style={{ marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Powered by */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {[
            { color: "#fe2c55", label: "TikTok API", text: "T" },
            { gradient: "linear-gradient(135deg,#7c3aed,#db2777)", label: "Instagram Graph API", text: "IG" },
            { color: "#16a34a", label: "Supabase", text: "S" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              <div style={{ width: 24, height: 24, background: p.gradient ?? p.color, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{p.text}</div>
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
