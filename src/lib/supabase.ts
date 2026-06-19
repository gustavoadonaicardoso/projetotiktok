import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      videos: {
        Row: {
          id: string;
          title: string;
          description: string;
          file_url: string;
          thumbnail_url: string | null;
          status: "draft" | "scheduled" | "published" | "failed";
          platform: "tiktok" | "instagram" | "both";
          scheduled_at: string | null;
          published_at: string | null;
          tiktok_post_id: string | null;
          instagram_post_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["videos"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["videos"]["Insert"]>;
      };
      metrics: {
        Row: {
          id: string;
          video_id: string;
          platform: "tiktok" | "instagram";
          views: number;
          likes: number;
          comments: number;
          shares: number;
          followers_gained: number;
          recorded_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["metrics"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["metrics"]["Insert"]>;
      };
      account_stats: {
        Row: {
          id: string;
          platform: "tiktok" | "instagram";
          followers: number;
          following: number;
          total_likes: number;
          total_videos: number;
          recorded_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["account_stats"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["account_stats"]["Insert"]>;
      };
    };
  };
};
