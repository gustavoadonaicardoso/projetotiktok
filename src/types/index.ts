export type Platform = "tiktok" | "instagram" | "both";

export type VideoStatus = "draft" | "scheduled" | "published" | "failed";

export interface Video {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url?: string;
  status: VideoStatus;
  platform: Platform;
  scheduled_at?: string;
  published_at?: string;
  tiktok_post_id?: string;
  instagram_post_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Metrics {
  id: string;
  video_id: string;
  platform: "tiktok" | "instagram";
  views: number;
  likes: number;
  comments: number;
  shares: number;
  followers_gained: number;
  recorded_at: string;
}

export interface AccountStats {
  id: string;
  platform: "tiktok" | "instagram";
  followers: number;
  following: number;
  total_likes: number;
  total_videos: number;
  recorded_at: string;
}

export interface DashboardStats {
  totalFollowers: number;
  followersGrowth: number;
  totalLikes: number;
  likesGrowth: number;
  totalViews: number;
  viewsGrowth: number;
  engagementRate: number;
  engagementGrowth: number;
}

export interface ChartData {
  date: string;
  tiktok: number;
  instagram: number;
}
