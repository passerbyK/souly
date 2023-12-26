export type User = {
  display_id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type Post = {
  display_id: string;
  user_id: string;
  topic: string;
  created_at: string;
  description: string;
  image: string;
}