import { Header } from "@/components/layout/Header";
import { Card, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase-server";
import { Users, Heart, Eye, TrendingUp, BarChart3 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const [{ data: stats }, { data: metrics }] = await Promise.all([
    supabase.from("account_stats").select("*").order("recorded_at", { ascending: false }).limit(10),
    supabase.from("metrics").select("*").order("recorded_at", { ascending: false }).limit(50),
  ]);

  const tiktok = stats?.find((s) => s.platform === "tiktok");
  const instagram = stats?.find((s) => s.platform === "instagram");

  const hasData = tiktok || instagram;

  return (
    <div>
      <Header title="Métricas" subtitle="Análise de desempenho das suas plataformas" />

      {!hasData ? (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <BarChart3 style={{ width: 56, height: 56, color: "rgba(255,255,255,0.1)", margin: "0 auto 20px" }} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Nenhuma métrica ainda</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 400, margin: "0 auto 8px", lineHeight: 1.6 }}>
            As métricas aparecerão aqui depois que você conectar suas contas do TikTok e Instagram em{" "}
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>Configurações</strong>.
          </p>
        </div>
      ) : (
        <>
          <div className="platform-grid">
            {[
              { label: "TikTok", abbr: "T", color: "#fe2c55", textColor: "#fe2c55", data: tiktok },
              { label: "Instagram", abbr: "IG", gradient: "linear-gradient(135deg,#7c3aed,#db2777)", textColor: "#a78bfa", data: instagram },
            ].map((p) => (
              <Card key={p.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, background: p.gradient ?? p.color, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{p.abbr}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: "#fff" }}>{p.label}</span>
                </div>
                {!p.data ? (
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Conta não conectada</p>
                ) : (
                  <div className="stat-mini">
                    {[
                      { icon: <Users style={{ width: 13, height: 13 }} />, label: "Seguidores", value: p.data.followers },
                      { icon: <Heart style={{ width: 13, height: 13 }} />, label: "Curtidas", value: p.data.total_likes },
                      { icon: <Eye style={{ width: 13, height: 13 }} />, label: "Vídeos", value: p.data.total_videos },
                      { icon: <TrendingUp style={{ width: 13, height: 13 }} />, label: "Seguindo", value: p.data.following },
                    ].map((s, i) => (
                      <div key={i} className="stat-mini-item">
                        <div style={{ color: p.textColor }}>{s.icon}</div>
                        <div className="val">{formatNumber(s.value)}</div>
                        <div className="lbl">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {metrics && metrics.length > 0 && (
            <Card>
              <CardTitle>Métricas por Vídeo</CardTitle>
              <div className="table-wrapper" style={{ marginTop: 16 }}>
                <table>
                  <thead>
                    <tr>
                      <th>Vídeo</th>
                      <th>Plataforma</th>
                      <th style={{ textAlign: "right" }}>Views</th>
                      <th style={{ textAlign: "right" }}>Curtidas</th>
                      <th style={{ textAlign: "right" }}>Comentários</th>
                      <th style={{ textAlign: "right" }}>Compartilhamentos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((m) => (
                      <tr key={m.id}>
                        <td style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{m.video_id.slice(0, 8)}…</td>
                        <td><span style={{ fontSize: 12, color: m.platform === "tiktok" ? "#fe2c55" : "#a78bfa", fontWeight: 500 }}>{m.platform === "tiktok" ? "TikTok" : "Instagram"}</span></td>
                        <td style={{ textAlign: "right" }}>{formatNumber(m.views)}</td>
                        <td style={{ textAlign: "right" }}>{formatNumber(m.likes)}</td>
                        <td style={{ textAlign: "right" }}>{formatNumber(m.comments)}</td>
                        <td style={{ textAlign: "right" }}>{formatNumber(m.shares)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
