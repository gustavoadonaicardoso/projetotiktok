const GRAPH_API = "https://graph.facebook.com/v19.0";

export async function getInstagramAuthUrl(): Promise<string> {
  const appId = process.env.INSTAGRAM_APP_ID!;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI!;
  const scope = "instagram_basic,instagram_content_publish,instagram_manage_insights,pages_read_engagement";

  return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
}

export async function exchangeInstagramCode(code: string): Promise<{ access_token: string; user_id: string }> {
  const res = await fetch(`${GRAPH_API}/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.INSTAGRAM_APP_ID!,
      client_secret: process.env.INSTAGRAM_APP_SECRET!,
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
      code,
    }),
  });
  return res.json();
}

export async function getLongLivedToken(shortToken: string): Promise<string> {
  const res = await fetch(
    `${GRAPH_API}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.INSTAGRAM_APP_ID}&client_secret=${process.env.INSTAGRAM_APP_SECRET}&fb_exchange_token=${shortToken}`
  );
  const data = await res.json();
  return data.access_token;
}

export async function getInstagramAccountId(accessToken: string, userId: string): Promise<string> {
  const res = await fetch(`${GRAPH_API}/${userId}/accounts?access_token=${accessToken}`);
  const data = await res.json();
  const page = data.data?.[0];
  if (!page) throw new Error("No Facebook page found");

  const igRes = await fetch(`${GRAPH_API}/${page.id}?fields=instagram_business_account&access_token=${page.access_token}`);
  const igData = await igRes.json();
  return igData.instagram_business_account?.id;
}

export async function getInstagramAccountStats(igAccountId: string, accessToken: string) {
  const res = await fetch(
    `${GRAPH_API}/${igAccountId}?fields=followers_count,follows_count,media_count,name,profile_picture_url&access_token=${accessToken}`
  );
  return res.json();
}

export async function getInstagramInsights(igAccountId: string, accessToken: string) {
  const res = await fetch(
    `${GRAPH_API}/${igAccountId}/insights?metric=impressions,reach,follower_count,profile_views&period=day&access_token=${accessToken}`
  );
  return res.json();
}

export async function publishInstagramReel(
  igAccountId: string,
  accessToken: string,
  videoUrl: string,
  caption: string
): Promise<string> {
  const containerRes = await fetch(`${GRAPH_API}/${igAccountId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      media_type: "REELS",
      video_url: videoUrl,
      caption,
      access_token: accessToken,
    }),
  });
  const container = await containerRes.json();

  // Wait for container to be ready
  await new Promise((r) => setTimeout(r, 10000));

  const publishRes = await fetch(`${GRAPH_API}/${igAccountId}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creation_id: container.id, access_token: accessToken }),
  });
  const published = await publishRes.json();
  return published.id;
}

export async function getInstagramMediaInsights(mediaId: string, accessToken: string) {
  const res = await fetch(
    `${GRAPH_API}/${mediaId}/insights?metric=impressions,reach,likes,comments,shares,saved,plays&access_token=${accessToken}`
  );
  return res.json();
}
