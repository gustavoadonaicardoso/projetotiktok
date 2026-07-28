const TIKTOK_API_BASE = "https://open.tiktokapis.com/v2";

export interface TikTokTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function getTikTokAuthUrl(): Promise<string> {
  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI!;
  const scope = "user.info.basic,video.upload,video.publish,video.list";
  const state = Math.random().toString(36).substring(7);

  return `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
}

export async function exchangeTikTokCode(code: string): Promise<TikTokTokens> {
  const res = await fetch(`${TIKTOK_API_BASE}/oauth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
    }),
  });
  const data = await res.json();
  return data;
}

export async function getTikTokUserInfo(accessToken: string) {
  const res = await fetch(`${TIKTOK_API_BASE}/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count,following_count,likes_count,video_count`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  return data.data?.user;
}

export async function getTikTokVideoList(accessToken: string) {
  const res = await fetch(`${TIKTOK_API_BASE}/video/list/?fields=id,title,cover_image_url,create_time,share_url,view_count,like_count,comment_count,share_count`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ max_count: 20 }),
  });
  const data = await res.json();
  return data.data?.videos ?? [];
}

export async function initTikTokVideoUpload(accessToken: string, videoSize: number): Promise<{ upload_url: string; video_id: string }> {
  const res = await fetch(`${TIKTOK_API_BASE}/post/publish/inbox/video/init/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_info: {
        source: "FILE_UPLOAD",
        video_size: videoSize,
        chunk_size: videoSize,
        total_chunk_count: 1,
      },
    }),
  });
  const data = await res.json();
  return data.data;
}

export async function publishTikTokVideo(
  accessToken: string,
  videoId: string,
  title: string
): Promise<{ publish_id: string }> {
  const res = await fetch(`${TIKTOK_API_BASE}/post/publish/video/init/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_info: {
        title,
        privacy_level: "PUBLIC_TO_EVERYONE",
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
        video_cover_timestamp_ms: 1000,
      },
      source_info: {
        source: "PULL_FROM_URL",
        video_url: videoId,
      },
    }),
  });
  const data = await res.json();
  return data.data;
}
