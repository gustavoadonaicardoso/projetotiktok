"use client";

import { useState } from "react";
import { Plus, Search, Upload, Video, Clock, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { VideoCard } from "@/components/content/VideoCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Video as VideoType } from "@/types";

const mockVideos: VideoType[] = [
  { id: "1", title: "A Armadura de Deus - Parte 1", description: "Efésios 6:10-18", file_url: "#", status: "published", platform: "both", published_at: "2024-01-15T10:00:00Z", created_at: "2024-01-10T00:00:00Z", updated_at: "2024-01-15T10:00:00Z" },
  { id: "2", title: "Salmos 23 - Reflexão Diária", description: "O Senhor é o meu pastor...", file_url: "#", status: "scheduled", platform: "tiktok", scheduled_at: "2024-02-01T18:00:00Z", created_at: "2024-01-20T00:00:00Z", updated_at: "2024-01-20T00:00:00Z" },
  { id: "3", title: "Poder da Oração", description: "A oração transforma", file_url: "#", status: "published", platform: "instagram", published_at: "2024-01-12T14:00:00Z", created_at: "2024-01-08T00:00:00Z", updated_at: "2024-01-12T14:00:00Z" },
  { id: "4", title: "Fé Move Montanhas", description: "Mateus 17:20", file_url: "#", status: "draft", platform: "both", created_at: "2024-01-22T00:00:00Z", updated_at: "2024-01-22T00:00:00Z" },
];

const mockMetrics: Record<string, { views: number; likes: number; comments: number; shares: number }> = {
  "1": { views: 45000, likes: 3200, comments: 480, shares: 890 },
  "3": { views: 28000, likes: 1900, comments: 240, shares: 450 },
};

const filters = [
  { label: "Todos", value: "all" },
  { label: "Publicados", value: "published" },
  { label: "Agendados", value: "scheduled" },
  { label: "Rascunhos", value: "draft" },
];

export default function ContentPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const filtered = mockVideos.filter((v) => {
    const matchesFilter = activeFilter === "all" || v.status === activeFilter;
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <Header
        title="Conteúdos"
        subtitle="Gerencie seus vídeos"
        action={
          <Button onClick={() => setShowUpload(true)}>
            <Plus style={{ width: 14, height: 14 }} />
            Novo Vídeo
          </Button>
        }
      />

      {/* Upload Modal */}
      {showUpload && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="card" style={{ width: "100%", maxWidth: 480 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Adicionar Vídeo</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)}>✕</Button>
            </div>
            <div style={{ border: "2px dashed rgba(255,255,255,0.15)", borderRadius: 12, padding: 32, textAlign: "center", marginBottom: 16, cursor: "pointer" }}>
              <Upload style={{ width: 32, height: 32, color: "rgba(255,255,255,0.25)", margin: "0 auto 8px" }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Arraste seu vídeo ou clique para selecionar</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>MP4, MOV até 4GB</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input type="text" placeholder="Título do vídeo" className="input" />
              <textarea placeholder="Descrição / legenda" rows={3} className="input" style={{ resize: "none" }} />
              <select className="input">
                <option value="both">TikTok + Instagram</option>
                <option value="tiktok">Somente TikTok</option>
                <option value="instagram">Somente Instagram</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <Button variant="outline" onClick={() => setShowUpload(false)} style={{ flex: 1 }}>Cancelar</Button>
              <Button style={{ flex: 1 }}>Salvar como Rascunho</Button>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 4 }}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer",
                background: activeFilter === f.value ? "#7c3aed" : "transparent",
                color: activeFilter === f.value ? "#fff" : "rgba(255,255,255,0.4)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", flex: 1, maxWidth: 300 }}>
          <Search style={{ width: 14, height: 14, color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
          <input type="text" placeholder="Buscar vídeos..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ background: "transparent", border: "none", outline: "none", fontSize: 13, color: "#fff", width: "100%" }} />
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        {[
          { icon: <CheckCircle style={{ width: 13, height: 13, color: "#4ade80" }} />, count: mockVideos.filter(v => v.status === "published").length, label: "publicados" },
          { icon: <Clock style={{ width: 13, height: 13, color: "#60a5fa" }} />, count: mockVideos.filter(v => v.status === "scheduled").length, label: "agendados" },
          { icon: <Video style={{ width: 13, height: 13, color: "rgba(255,255,255,0.3)" }} />, count: mockVideos.filter(v => v.status === "draft").length, label: "rascunhos" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            {s.icon} {s.count} {s.label}
          </div>
        ))}
      </div>

      {/* Video List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "rgba(255,255,255,0.25)" }}>
            <Video style={{ width: 48, height: 48, margin: "0 auto 12px", opacity: 0.3 }} />
            <p>Nenhum vídeo encontrado</p>
          </div>
        ) : (
          filtered.map((video) => (
            <VideoCard key={video.id} video={video} metrics={mockMetrics[video.id]} />
          ))
        )}
      </div>
    </div>
  );
}
