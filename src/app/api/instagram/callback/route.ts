import { NextRequest, NextResponse } from "next/server";
import { exchangeInstagramCode, getLongLivedToken, getInstagramAccountId, getInstagramAccountStats } from "@/lib/instagram";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/settings?error=instagram_auth_failed", request.url));
  }

  try {
    const { access_token, user_id } = await exchangeInstagramCode(code);
    const longLivedToken = await getLongLivedToken(access_token);
    const igAccountId = await getInstagramAccountId(longLivedToken, user_id);
    const stats = await getInstagramAccountStats(igAccountId, longLivedToken);

    await supabase.from("platform_connections").upsert({
      platform: "instagram",
      access_token: longLivedToken,
      platform_user_id: igAccountId,
      username: stats.name,
      expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    });

    return NextResponse.redirect(new URL("/settings?connected=instagram", request.url));
  } catch (err) {
    console.error("Instagram callback error:", err);
    return NextResponse.redirect(new URL("/settings?error=instagram_callback_failed", request.url));
  }
}
