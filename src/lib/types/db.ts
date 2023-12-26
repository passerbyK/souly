export type User = {
  id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type Post = {
  id: string;
  userId: string;
  topic: string;
  created_at: string;
  description: string;
  image: string;
};
