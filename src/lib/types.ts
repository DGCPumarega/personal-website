export type BlogPost = {
  title: string;
  description: string;
  date: string;
  isPublished: boolean;
  slug: string;
};

export type GuestbookMessage = {
  username: string;
  content: string;
  createdAt: Date;
  website?: string | null;
  replies?: { username: string, content: string }[] | null;
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: string[];
  album: string;
  covers: string[];
};
