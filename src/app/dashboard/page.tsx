import { Users, Heart, Eye, TrendingUp, Video, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockStats = [
  { title: "Total de Seguidores", value: 12400, growth: 8.3, icon: <Users className="w-5 h-5 text-purple-400" />, color: "bg-purple-500" },
  { title: "Total de Curtidas", value: 89200, growth: 14.7, icon: <Heart className="w-5 h-5 text-pink-400" />, color: "bg-pink-500" },
  { title: "Visualizações", value: 340000, growth: 22.1, icon: <Eye className="w-5 h-5 text-blue-400" />, color: "bg-blue-500" },
  { title: "Taxa de Engajamento", value: 6, growth: 3.2, icon: <TrendingUp className="w-5 h-5 text-green-400" />, color: "bg-green-500", suffix: "%" },
];

const recentVideos = [
  { title: "A Armadura de Deus - Parte 1", platform: "both", status: "published", views: 45000, likes: 3200 },
  { title: "Versículo do Dia - Salmos 23", platform: "tiktok", status: "scheduled", views: 0, likes: 0 },
  { title: "A Fé Move Montanhas", platform: "instagram", status: "draft", views: 0, likes: 0 },
  { title: "Poder da Oração", platform: "both", status: "published", views: 28000, likes: 1900 },
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
              <Video className="w-4 h-4" />
              Novo Vídeo
            </Button>
          </Link>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockStats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Conteúdos Recentes</CardTitle>
              <Link href="/content">
                <Button variant="ghost" size="sm">Ver todos</Button>
              </Link>
            </CardHeader>
            <div className="space-y-3">
              {recentVideos.map((video, i) => {
                const status = statusConfig[video.status as keyof typeof statusConfig];
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{video.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {(video.platform === "tiktok" || video.platform === "both") && (
                          <span className="text-xs text-[#fe2c55]">TikTok</span>
                        )}
                        {(video.platform === "instagram" || video.platform === "both") && (
                          <span className="text-xs text-purple-400">Instagram</span>
                        )}
                        {video.views > 0 && (
                          <span className="text-xs text-white/30">{(video.views / 1000).toFixed(0)}K views</span>
                        )}
                      </div>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Quick Actions + Platform Status */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              <Link href="/content" className="flex items-center gap-3 p-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-colors border border-purple-500/20">
                <Video className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white">Adicionar vídeo</span>
              </Link>
              <Link href="/schedule" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Clock className="w-4 h-4 text-white/40" />
                <span className="text-sm text-white/70">Agendar postagem</span>
              </Link>
              <Link href="/analytics" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <TrendingUp className="w-4 h-4 text-white/40" />
                <span className="text-sm text-white/70">Ver métricas</span>
              </Link>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plataformas</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#fe2c55] rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <span className="text-sm text-white">TikTok</span>
                </div>
                <Link href="/settings">
                  <Badge variant="warning">Conectar</Badge>
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">IG</span>
                  </div>
                  <span className="text-sm text-white">Instagram</span>
                </div>
                <Link href="/settings">
                  <Badge variant="warning">Conectar</Badge>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
