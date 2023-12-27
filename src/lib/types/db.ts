export type User = {
  id: string;
  name: string;
  email: string;
  provider: "github" | "credentials";
};