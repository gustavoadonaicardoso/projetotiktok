import { NextRequest, NextResponse } from "next/server";
import { exchangeTikTokCode, getTikTokUserInfo } from "@/lib/tiktok";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/settings?error=tiktok_auth_failed", request.url));
  }

  try {
    const tokens = await exchangeTikTokCode(code);
    const user = await getTikTokUserInfo(tokens.access_token);

    await supabase.from("platform_connections").upsert({
      platform: "tiktok",
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      platform_user_id: user.open_id,
      username: user.display_name,
    });

    return NextResponse.redirect(new URL("/settings?connected=tiktok", request.url));
  } catch (err) {
    console.error("TikTok callback error:", err);
    return NextResponse.redirect(new URL("/settings?error=tiktok_callback_failed", request.url));
  }
}
