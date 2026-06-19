"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { EngagementChart } from "@/components/analytics/EngagementChart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { Eye, Heart, Users, MessageCircle, Share2, TrendingUp } from "lucide-react";

const generateChartData = (metric: string, days = 30) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      tiktok: Math.floor(Math.random() * 5000 + 1000),
      instagram: Math.floor(Math.random() * 3000 + 500),
    });
  }
  return data;
};

const topVideos = [
  { title: "A Armadura de Deus", tiktokViews: 45000, igViews: 22000, likes: 3200, engagement: 7.1 },
  { title: "Salmos 23 - Reflexão", tiktokViews: 38000, igViews: 18000, likes: 2800, engagement: 6.9 },
  { title: "Poder da Oração", tiktokViews: 28000, igViews: 15000, likes: 1900, engagement: 6.2 },
  { title: "Fé e Perseverança", tiktokViews: 21000, igViews: 9000, likes: 1400, engagement: 5.8 },
  { title: "A Graça de Deus", tiktokViews: 19000, igViews: 8000, likes: 1100, engagement: 5.3 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<7 | 30 | 90>(30);
  const viewsData = generateChartData("views", period);
  const likesData = generateChartData("likes", period);

  const platformStats = {
    tiktok: { followers: 8200, likes: 62000, views: 230000, engagement: 6.8 },
    instagram: { followers: 4200, likes: 27200, views: 110000, engagement: 5.9 },
  };

  return (
    <div>
      <Header
        title="Métricas"
        subtitle="Análise de desempenho das suas plataformas"
        action={
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {([7, 30, 90] as const).map((p) => (
              <Button
                key={p}
                variant={period === p ? "default" : "ghost"}
                size="sm"
                onClick={() => setPeriod(p)}
                className={period !== p ? "text-white/40" : ""}
              >
                {p}d
              </Button>
            ))}
          </div>
        }
      />

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* TikTok */}
        <Card className="border-[#fe2c55]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#fe2c55] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">T</span>
            </div>
            <span className="font-semibold text-white">TikTok</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Users className="w-4 h-4" />, label: "Seguidores", value: platformStats.tiktok.followers },
              { icon: <Heart className="w-4 h-4" />, label: "Curtidas", value: platformStats.tiktok.likes },
              { icon: <Eye className="w-4 h-4" />, label: "Views", value: platformStats.tiktok.views },
              { icon: <TrendingUp className="w-4 h-4" />, label: "Engajamento", value: platformStats.tiktok.engagement, suffix: "%" },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-1.5 text-[#fe2c55] mb-1">{s.icon}</div>
                <p className="text-white font-semibold">{formatNumber(s.value)}{s.suffix ?? ""}</p>
                <p className="text-white/40 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Instagram */}
        <Card className="border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">IG</span>
            </div>
            <span className="font-semibold text-white">Instagram</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Users className="w-4 h-4" />, label: "Seguidores", value: platformStats.instagram.followers },
              { icon: <Heart className="w-4 h-4" />, label: "Curtidas", value: platformStats.instagram.likes },
              { icon: <Eye className="w-4 h-4" />, label: "Views", value: platformStats.instagram.views },
              { icon: <TrendingUp className="w-4 h-4" />, label: "Engajamento", value: platformStats.instagram.engagement, suffix: "%" },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-1.5 text-purple-400 mb-1">{s.icon}</div>
                <p className="text-white font-semibold">{formatNumber(s.value)}{s.suffix ?? ""}</p>
                <p className="text-white/40 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <EngagementChart data={viewsData} metric="views" title="Visualizações por Plataforma" />
        <EngagementChart data={likesData} metric="likes" title="Curtidas por Plataforma" />
      </div>

      {/* Top Videos */}
      <Card>
        <CardHeader>
          <CardTitle>Melhores Vídeos</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-white/30 border-b border-white/10">
                <th className="pb-3 pr-4">Título</th>
                <th className="pb-3 pr-4 text-right">TikTok Views</th>
                <th className="pb-3 pr-4 text-right">IG Views</th>
                <th className="pb-3 pr-4 text-right">Curtidas</th>
                <th className="pb-3 text-right">Engajamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topVideos.map((v, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="py-3 pr-4 text-sm text-white">{v.title}</td>
                  <td className="py-3 pr-4 text-sm text-white/60 text-right">{formatNumber(v.tiktokViews)}</td>
                  <td className="py-3 pr-4 text-sm text-white/60 text-right">{formatNumber(v.igViews)}</td>
                  <td className="py-3 pr-4 text-sm text-white/60 text-right">{formatNumber(v.likes)}</td>
                  <td className="py-3 text-right">
                    <span className="text-green-400 text-sm font-medium">{v.engagement}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
