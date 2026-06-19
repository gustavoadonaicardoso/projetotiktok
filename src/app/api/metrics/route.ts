import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getTikTokUserInfo, getTikTokVideoList } from "@/lib/tiktok";
import { getInstagramAccountStats, getInstagramInsights } from "@/lib/instagram";

export async function GET() {
  const { data: connections } = await supabase
    .from("platform_connections")
    .select("*");

  const metrics: Record<string, unknown> = {};

  for (const conn of connections ?? []) {
    if (conn.platform === "tiktok") {
      try {
        const user = await getTikTokUserInfo(conn.access_token);
        const videos = await getTikTokVideoList(conn.access_token);

        metrics.tiktok = {
          followers: user.follower_count,
          following: user.following_count,
          likes: user.likes_count,
          videos: user.video_count,
          recentVideos: videos.slice(0, 10).map((v: Record<string, unknown>) => ({
            id: v.id,
            title: v.title,
            views: v.view_count,
            likes: v.like_count,
            comments: v.comment_count,
            shares: v.share_count,
          })),
        };

        await supabase.from("account_stats").insert({
          platform: "tiktok",
          followers: user.follower_count,
          following: user.following_count,
          total_likes: user.likes_count,
          total_videos: user.video_count,
          recorded_at: new Date().toISOString(),
        });
      } catch (e) {
        metrics.tiktok_error = "Failed to fetch TikTok metrics";
      }
    }

    if (conn.platform === "instagram") {
      try {
        const stats = await getInstagramAccountStats(conn.platform_user_id, conn.access_token);
        const insights = await getInstagramInsights(conn.platform_user_id, conn.access_token);

        metrics.instagram = {
          followers: stats.followers_count,
          following: stats.follows_count,
          mediaCount: stats.media_count,
          insights: insights.data,
        };

        await supabase.from("account_stats").insert({
          platform: "instagram",
          followers: stats.followers_count,
          following: stats.follows_count,
          total_likes: 0,
          total_videos: stats.media_count,
          recorded_at: new Date().toISOString(),
        });
      } catch (e) {
        metrics.instagram_error = "Failed to fetch Instagram metrics";
      }
    }
  }

  return NextResponse.json(metrics);
}
