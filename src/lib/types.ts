export type BlogPost = {
  title: string;
  description: string;
  date: string;
  isPublished: boolean;
  slug: string;
}

export type GuestbookMessage = {
  username: string,
  content: string,
  replies?: { username: string, content: string }[],
}
