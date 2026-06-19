-- Platform connections (TikTok & Instagram tokens)
CREATE TABLE IF NOT EXISTS platform_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  platform_user_id TEXT,
  username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (platform)
);

-- Videos
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  platform TEXT NOT NULL DEFAULT 'both' CHECK (platform IN ('tiktok', 'instagram', 'both')),
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  tiktok_post_id TEXT,
  instagram_post_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Per-video metrics snapshots
CREATE TABLE IF NOT EXISTS metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  followers_gained INTEGER DEFAULT 0,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Account-level stats over time
CREATE TABLE IF NOT EXISTS account_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  total_videos INTEGER DEFAULT 0,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_platform ON videos(platform);
CREATE INDEX IF NOT EXISTS idx_metrics_video_id ON metrics(video_id);
CREATE INDEX IF NOT EXISTS idx_account_stats_platform ON account_stats(platform);
CREATE INDEX IF NOT EXISTS idx_account_stats_recorded_at ON account_stats(recorded_at);
