"use client";

import { useState } from "react";
import { Plus, Search, Filter, Upload, Video, Clock, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { VideoCard } from "@/components/content/VideoCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Video as VideoType } from "@/types";

const mockVideos: VideoType[] = [
  {
    id: "1",
    title: "A Armadura de Deus - Parte 1",
    description: "Efésios 6:10-18 - Como usar a armadura de Deus no dia a dia",
    file_url: "#",
    status: "published",
    platform: "both",
    published_at: "2024-01-15T10:00:00Z",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Salmos 23 - Reflexão Diária",
    description: "O Senhor é o meu pastor, nada me faltará...",
    file_url: "#",
    status: "scheduled",
    platform: "tiktok",
    scheduled_at: "2024-02-01T18:00:00Z",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Poder da Oração",
    description: "A oração transforma - testemunhos reais",
    file_url: "#",
    status: "published",
    platform: "instagram",
    published_at: "2024-01-12T14:00:00Z",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-12T14:00:00Z",
  },
  {
    id: "4",
    title: "Fé Move Montanhas",
    description: "Mateus 17:20 - O poder da fé",
    file_url: "#",
    status: "draft",
    platform: "both",
    created_at: "2024-01-22T00:00:00Z",
    updated_at: "2024-01-22T00:00:00Z",
  },
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
            <Plus className="w-4 h-4" />
            Novo Vídeo
          </Button>
        }
      />

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Adicionar Vídeo</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)}>✕</Button>
            </div>

            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-4 hover:border-purple-500/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
              <p className="text-white/50 text-sm">Arraste seu vídeo ou clique para selecionar</p>
              <p className="text-white/30 text-xs mt-1">MP4, MOV até 4GB</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Título do vídeo"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
              <textarea
                placeholder="Descrição / legenda"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 resize-none"
              />
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50">
                <option value="both">TikTok + Instagram</option>
                <option value="tiktok">Somente TikTok</option>
                <option value="instagram">Somente Instagram</option>
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowUpload(false)}>Cancelar</Button>
              <Button className="flex-1">Salvar como Rascunho</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeFilter === f.value
                  ? "bg-purple-600 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search className="w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Buscar vídeos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none flex-1"
          />
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-white/40">
          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
          {mockVideos.filter((v) => v.status === "published").length} publicados
        </div>
        <div className="flex items-center gap-1.5 text-sm text-white/40">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          {mockVideos.filter((v) => v.status === "scheduled").length} agendados
        </div>
        <div className="flex items-center gap-1.5 text-sm text-white/40">
          <Video className="w-3.5 h-3.5 text-white/30" />
          {mockVideos.filter((v) => v.status === "draft").length} rascunhos
        </div>
      </div>

      {/* Video List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhum vídeo encontrado</p>
          </div>
        ) : (
          filtered.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              metrics={mockMetrics[video.id]}
            />
          ))
        )}
      </div>
    </div>
  );
}
