export type MediaSourceType = "image" | "direct-video" | "instagram" | "youtube" | "tiktok";

export interface MediaParsedInfo {
  isVideo: boolean;
  sourceType: MediaSourceType;
  embedUrl: string;
  thumbnailUrl?: string;
  code?: string;
}

export function parseMediaUrl(url: string, explicitMediaType?: string): MediaParsedInfo {
  if (!url) {
    return {
      isVideo: explicitMediaType === "video",
      sourceType: explicitMediaType === "video" ? "direct-video" : "image",
      embedUrl: "",
    };
  }

  const cleanUrl = url.trim();

  // 1. Instagram (Reels, Posts, TV)
  // Format: instagram.com/reel/CODE/, instagram.com/p/CODE/, instagram.com/tv/CODE/
  const igMatch = cleanUrl.match(
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/i
  );
  if (igMatch) {
    const code = igMatch[1];
    return {
      isVideo: true,
      sourceType: "instagram",
      embedUrl: `https://www.instagram.com/p/${code}/embed/captioned/`,
      code,
    };
  }

  // 2. YouTube (Watch, Shorts, youtu.be)
  const ytMatch = cleanUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch) {
    const code = ytMatch[1];
    return {
      isVideo: true,
      sourceType: "youtube",
      embedUrl: `https://www.youtube.com/embed/${code}?autoplay=1&mute=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${code}/hqdefault.jpg`,
      code,
    };
  }

  // 3. TikTok
  const ttMatch = cleanUrl.match(
    /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/.*\/video\/(\d+)/i
  );
  if (ttMatch) {
    const code = ttMatch[1];
    return {
      isVideo: true,
      sourceType: "tiktok",
      embedUrl: `https://www.tiktok.com/embed/v2/${code}`,
      code,
    };
  }

  // 4. Direct video files (.mp4, .webm, .mov, etc)
  const isDirectVideo = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(cleanUrl);
  if (isDirectVideo || explicitMediaType === "video") {
    return {
      isVideo: true,
      sourceType: "direct-video",
      embedUrl: cleanUrl,
    };
  }

  // 5. Default image
  return {
    isVideo: false,
    sourceType: "image",
    embedUrl: cleanUrl,
  };
}
