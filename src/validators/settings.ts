import { z } from "zod";

export const settingsSchema = z.object({
  userId: z.string(),
  subject: z.string(),
  lastingDays: z.number().max(60).min(21),
  isNotified: z.boolean(),
  paintingTime: z.string(),
});
