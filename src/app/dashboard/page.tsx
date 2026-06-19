import { Users, Heart, Eye, TrendingUp, Video, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockStats = [
  { title: "Total de Seguidores", value: 12400, growth: 8.3, icon: <Users style={{ width: 20, height: 20, color: "#a78bfa" }} />, color: "bg-purple-500" },
  { title: "Total de Curtidas", value: 89200, growth: 14.7, icon: <Heart style={{ width: 20, height: 20, color: "#f472b6" }} />, color: "bg-pink-500" },
  { title: "Visualizações", value: 340000, growth: 22.1, icon: <Eye style={{ width: 20, height: 20, color: "#60a5fa" }} />, color: "bg-blue-500" },
  { title: "Taxa de Engajamento", value: 6, growth: 3.2, icon: <TrendingUp style={{ width: 20, height: 20, color: "#4ade80" }} />, color: "bg-green-500", suffix: "%" },
];

const recentVideos = [
  { title: "A Armadura de Deus - Parte 1", platform: "both", status: "published", views: 45000 },
  { title: "Versículo do Dia - Salmos 23", platform: "tiktok", status: "scheduled", views: 0 },
  { title: "A Fé Move Montanhas", platform: "instagram", status: "draft", views: 0 },
  { title: "Poder da Oração", platform: "both", status: "published", views: 28000 },
];

const statusConfig = {
  published: { label: "Publicado", variant: "success" as const },
  scheduled: { label: "Agendado", variant: "info" as const },
  draft: { label: "Rascunho", variant: "default" as const },
  failed: { label: "Falhou", variant: "error" as const },
};

export default function DashboardPage() {
  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Visão geral do seu desempenho"
        action={
          <Link href="/content">
            <Button size="sm">
              <Video style={{ width: 14, height: 14 }} />
              Novo Vídeo
            </Button>
          </Link>
        }
      />

      <div className="stats-grid">
        {mockStats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="dash-grid">
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <CardTitle>Conteúdos Recentes</CardTitle>
            <Link href="/content">
              <Button variant="ghost" size="sm">Ver todos</Button>
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recentVideos.map((video, i) => {
              const status = statusConfig[video.status as keyof typeof statusConfig];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Video style={{ width: 16, height: 16, color: "rgba(255,255,255,0.3)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{video.title}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                      {(video.platform === "tiktok" || video.platform === "both") && <span style={{ fontSize: 11, color: "#fe2c55" }}>TikTok</span>}
                      {(video.platform === "instagram" || video.platform === "both") && <span style={{ fontSize: 11, color: "#a78bfa" }}>Instagram</span>}
                      {video.views > 0 && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{(video.views / 1000).toFixed(0)}K views</span>}
                    </div>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              );
            })}
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <CardTitle>Ações Rápidas</CardTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
              <Link href="/content" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)", textDecoration: "none" }}>
                <Video style={{ width: 15, height: 15, color: "#a78bfa" }} />
                <span style={{ fontSize: 13, color: "#fff" }}>Adicionar vídeo</span>
              </Link>
              <Link href="/schedule" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}>
                <Clock style={{ width: 15, height: 15, color: "rgba(255,255,255,0.35)" }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Agendar postagem</span>
              </Link>
              <Link href="/analytics" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}>
                <TrendingUp style={{ width: 15, height: 15, color: "rgba(255,255,255,0.35)" }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Ver métricas</span>
              </Link>
            </div>
          </Card>

          <Card>
            <CardTitle>Plataformas</CardTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, background: "#fe2c55", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>T</span>
                  </div>
                  <span style={{ fontSize: 13, color: "#fff" }}>TikTok</span>
                </div>
                <Link href="/settings"><Badge variant="warning">Conectar</Badge></Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7c3aed,#db2777)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 11 }}>IG</span>
                  </div>
                  <span style={{ fontSize: 13, color: "#fff" }}>Instagram</span>
                </div>
                <Link href="/settings"><Badge variant="warning">Conectar</Badge></Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
