"use client";

import { Video, Clock, CheckCircle, XCircle, Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
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
  metrics?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export function VideoCard({ video, metrics, onEdit, onDelete }: VideoCardProps) {
  const status = statusConfig[video.status];
  const StatusIcon = status.icon;

  return (
    <Card className="hover:border-white/20 transition-colors">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-24 h-16 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {video.thumbnail_url ? (
            <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
          ) : (
            <Video className="w-6 h-6 text-white/30" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-medium text-white truncate">{video.title}</h3>
            <Badge variant={status.variant} className="flex-shrink-0">
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {(video.platform === "tiktok" || video.platform === "both") && (
              <span className="text-xs text-[#fe2c55] font-medium">TikTok</span>
            )}
            {(video.platform === "instagram" || video.platform === "both") && (
              <span className="text-xs text-purple-400 font-medium">Instagram</span>
            )}
            <span className="text-xs text-white/30">
              {video.scheduled_at
                ? `Agendado: ${formatDate(video.scheduled_at)}`
                : video.published_at
                ? `Publicado: ${formatDate(video.published_at)}`
                : formatDate(video.created_at)}
            </span>
          </div>

          {metrics && (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Eye className="w-3 h-3" /> {formatNumber(metrics.views)}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Heart className="w-3 h-3" /> {formatNumber(metrics.likes)}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <MessageCircle className="w-3 h-3" /> {formatNumber(metrics.comments)}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Share2 className="w-3 h-3" /> {formatNumber(metrics.shares)}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={onEdit}>Editar</Button>
          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={onDelete}>
            Excluir
          </Button>
        </div>
      </div>
    </Card>
  );
}
