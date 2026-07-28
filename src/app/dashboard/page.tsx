import { Users, Heart, Eye, TrendingUp, Video, Clock, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ data: videos }, { data: stats }] = await Promise.all([
    supabase.from("videos").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("account_stats").select("*").order("recorded_at", { ascending: false }).limit(10),
  ]);

  const tiktokStats = stats?.find((s) => s.platform === "tiktok");
  const igStats = stats?.find((s) => s.platform === "instagram");

  const totalFollowers = (tiktokStats?.followers ?? 0) + (igStats?.followers ?? 0);
  const totalLikes = (tiktokStats?.total_likes ?? 0) + (igStats?.total_likes ?? 0);
  const totalVideos = (tiktokStats?.total_videos ?? 0) + (igStats?.total_videos ?? 0);

  const statusConfig = {
    published: { label: "Publicado", variant: "success" as const },
    scheduled: { label: "Agendado", variant: "info" as const },
    draft: { label: "Rascunho", variant: "default" as const },
    failed: { label: "Falhou", variant: "error" as const },
  };

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Visão geral do seu desempenho"
        action={
          <Link href="/content">
            <Button size="sm">
              <Plus style={{ width: 14, height: 14 }} />
              Novo Vídeo
            </Button>
          </Link>
        }
      />

      <div className="stats-grid">
        <StatsCard title="Total de Seguidores" value={totalFollowers} growth={0} icon={<Users style={{ width: 18, height: 18, color: "#a78bfa" }} />} color="" />
        <StatsCard title="Total de Curtidas" value={totalLikes} growth={0} icon={<Heart style={{ width: 18, height: 18, color: "#f472b6" }} />} color="" />
        <StatsCard title="Vídeos Publicados" value={totalVideos} growth={0} icon={<Video style={{ width: 18, height: 18, color: "#60a5fa" }} />} color="" />
        <StatsCard title="Engajamento" value={0} growth={0} icon={<TrendingUp style={{ width: 18, height: 18, color: "#4ade80" }} />} color="" suffix="%" />
      </div>

      <div className="dash-grid">
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <CardTitle>Conteúdos Recentes</CardTitle>
            <Link href="/content"><Button variant="ghost" size="sm">Ver todos</Button></Link>
          </div>

          {!videos || videos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <Video style={{ width: 40, height: 40, color: "rgba(255,255,255,0.15)", margin: "0 auto 12px" }} />
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Nenhum vídeo ainda</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Adicione seu primeiro conteúdo</p>
              <Link href="/content">
                <Button size="sm" style={{ marginTop: 16 }}>
                  <Plus style={{ width: 12, height: 12 }} /> Adicionar vídeo
                </Button>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {videos.map((video) => {
                const status = statusConfig[video.status as keyof typeof statusConfig] ?? statusConfig.draft;
                return (
                  <div key={video.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Video style={{ width: 15, height: 15, color: "rgba(255,255,255,0.3)" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{video.title}</p>
                      <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                        {(video.platform === "tiktok" || video.platform === "both") && <span style={{ fontSize: 11, color: "#fe2c55" }}>TikTok</span>}
                        {(video.platform === "instagram" || video.platform === "both") && <span style={{ fontSize: 11, color: "#a78bfa" }}>Instagram</span>}
                      </div>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                );
              })}
            </div>
          )}
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
              <Link href="/settings" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}>
                <Eye style={{ width: 15, height: 15, color: "rgba(255,255,255,0.35)" }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Conectar plataformas</span>
              </Link>
            </div>
          </Card>

          <Card>
            <CardTitle>Plataformas</CardTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, background: "#fe2c55", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>T</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "#fff" }}>TikTok</p>
                    {tiktokStats && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{tiktokStats.followers.toLocaleString("pt-BR")} seguidores</p>}
                  </div>
                </div>
                <Link href="/settings"><Badge variant={tiktokStats ? "success" : "warning"}>{tiktokStats ? "Conectado" : "Conectar"}</Badge></Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7c3aed,#db2777)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 11 }}>IG</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "#fff" }}>Instagram</p>
                    {igStats && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{igStats.followers.toLocaleString("pt-BR")} seguidores</p>}
                  </div>
                </div>
                <Link href="/settings"><Badge variant={igStats ? "success" : "warning"}>{igStats ? "Conectado" : "Conectar"}</Badge></Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
