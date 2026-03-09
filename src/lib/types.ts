export type BlogPost = {
  title: string;
  description: string;
  date: string;
  isPublished: boolean;
  slug: string;
};

export type GuestbookMessage = {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
  website: string | null;
  replies: GuestbookReply[];
};

export type GuestbookReply = {
  id: number;
  messageId: number;
  username: string;
  content: string;
  createdAt: Date;
}

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: string[];
  album: string;
  covers: string[];
};
