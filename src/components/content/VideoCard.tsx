"use client";

import { Video, Clock, CheckCircle, XCircle, Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber, formatDate } from "@/lib/utils";
import type { Video as VideoType } from "@/types";

const statusConfig = {
  draft: { label: "Rascunho", variant: "default" as const, icon: Clock },
  scheduled: { label: "Agendado", variant: "info" as const, icon: Clock },
  published: { label: "Publicado", variant: "success" as const, icon: CheckCircle },
  failed: { label: "Falhou", variant: "error" as const, icon: XCircle },
};

interface VideoCardProps {
  video: VideoType;
  metrics?: { views: number; likes: number; comments: number; shares: number };
  onEdit?: () => void;
  onDelete?: () => void;
}

export function VideoCard({ video, metrics, onEdit, onDelete }: VideoCardProps) {
  const status = statusConfig[video.status];
  const StatusIcon = status.icon;

  return (
    <div className="video-row">
      <div className="video-thumb">
        {video.thumbnail_url ? (
          <img src={video.thumbnail_url} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Video style={{ width: 20, height: 20, color: "rgba(255,255,255,0.25)" }} />
        )}
      </div>

      <div className="video-info">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
          <h3 className="video-title">{video.title}</h3>
          <Badge variant={status.variant} style={{ flexShrink: 0 }}>
            <StatusIcon style={{ width: 11, height: 11, marginRight: 3 }} />
            {status.label}
          </Badge>
        </div>

        <div className="video-meta">
          {(video.platform === "tiktok" || video.platform === "both") && (
            <span style={{ color: "#fe2c55", fontWeight: 500 }}>TikTok</span>
          )}
          {(video.platform === "instagram" || video.platform === "both") && (
            <span style={{ color: "#a78bfa", fontWeight: 500 }}>Instagram</span>
          )}
          <span>
            {video.scheduled_at ? `Agendado: ${formatDate(video.scheduled_at)}` : video.published_at ? `Publicado: ${formatDate(video.published_at)}` : formatDate(video.created_at)}
          </span>
        </div>

        {metrics && (
          <div className="video-meta" style={{ marginTop: 6 }}>
            <span><Eye style={{ width: 11, height: 11 }} /> {formatNumber(metrics.views)}</span>
            <span><Heart style={{ width: 11, height: 11 }} /> {formatNumber(metrics.likes)}</span>
            <span><MessageCircle style={{ width: 11, height: 11 }} /> {formatNumber(metrics.comments)}</span>
            <span><Share2 style={{ width: 11, height: 11 }} /> {formatNumber(metrics.shares)}</span>
          </div>
        )}
      </div>

      <div className="video-actions">
        <Button variant="ghost" size="sm" onClick={onEdit}>Editar</Button>
        <Button variant="ghost" size="sm" style={{ color: "#f87171" }} onClick={onDelete}>Excluir</Button>
      </div>
    </div>
  );
}
