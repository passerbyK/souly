import { z } from "zod";

export const postSchema = z.object({
  userId: z.string(),
  topic: z.string(),
  description: z.string(),
  image: z.string(),
});
