"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { EngagementChart } from "@/components/analytics/EngagementChart";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { Eye, Heart, Users, TrendingUp } from "lucide-react";

const generateChartData = (days = 30) => {
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

const platformStats = {
  tiktok: { followers: 8200, likes: 62000, views: 230000, engagement: 6.8 },
  instagram: { followers: 4200, likes: 27200, views: 110000, engagement: 5.9 },
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<7 | 30 | 90>(30);
  const viewsData = generateChartData(period);
  const likesData = generateChartData(period);

  return (
    <div>
      <Header
        title="Métricas"
        subtitle="Análise de desempenho das suas plataformas"
        action={
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 4 }}>
            {([7, 30, 90] as const).map((p) => (
              <Button key={p} variant={period === p ? "default" : "ghost"} size="sm" onClick={() => setPeriod(p)}>
                {p}d
              </Button>
            ))}
          </div>
        }
      />

      {/* Platform Cards */}
      <div className="platform-grid">
        {[
          { label: "TikTok", color: "#fe2c55", textColor: "#fe2c55", abbr: "T", stats: platformStats.tiktok },
          { label: "Instagram", gradient: "linear-gradient(135deg,#7c3aed,#db2777)", textColor: "#a78bfa", abbr: "IG", stats: platformStats.instagram },
        ].map((platform) => (
          <Card key={platform.label}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: platform.gradient ?? platform.color, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{platform.abbr}</span>
              </div>
              <span style={{ fontWeight: 600, color: "#fff" }}>{platform.label}</span>
            </div>
            <div className="stat-mini">
              {[
                { icon: <Users style={{ width: 14, height: 14 }} />, label: "Seguidores", value: platform.stats.followers },
                { icon: <Heart style={{ width: 14, height: 14 }} />, label: "Curtidas", value: platform.stats.likes },
                { icon: <Eye style={{ width: 14, height: 14 }} />, label: "Views", value: platform.stats.views },
                { icon: <TrendingUp style={{ width: 14, height: 14 }} />, label: "Engajamento", value: platform.stats.engagement, suffix: "%" },
              ].map((s, i) => (
                <div key={i} className="stat-mini-item">
                  <div style={{ color: platform.textColor }}>{s.icon}</div>
                  <div className="val">{formatNumber(s.value)}{s.suffix ?? ""}</div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <EngagementChart data={viewsData} metric="views" title="Visualizações por Plataforma" />
        <EngagementChart data={likesData} metric="likes" title="Curtidas por Plataforma" />
      </div>

      {/* Top Videos */}
      <Card>
        <CardTitle>Melhores Vídeos</CardTitle>
        <div className="table-wrapper" style={{ marginTop: 16 }}>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th style={{ textAlign: "right" }}>TikTok Views</th>
                <th style={{ textAlign: "right" }}>IG Views</th>
                <th style={{ textAlign: "right" }}>Curtidas</th>
                <th style={{ textAlign: "right" }}>Engajamento</th>
              </tr>
            </thead>
            <tbody>
              {topVideos.map((v, i) => (
                <tr key={i}>
                  <td>{v.title}</td>
                  <td style={{ textAlign: "right" }}>{formatNumber(v.tiktokViews)}</td>
                  <td style={{ textAlign: "right" }}>{formatNumber(v.igViews)}</td>
                  <td style={{ textAlign: "right" }}>{formatNumber(v.likes)}</td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ color: "#4ade80", fontWeight: 600 }}>{v.engagement}%</span>
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
