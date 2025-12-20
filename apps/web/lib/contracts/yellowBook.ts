import { z } from "zod";

export const YellowBookEntrySchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  department: z.string(),
  city: z.string(),
});

export type YellowBookEntry = z.infer<typeof YellowBookEntrySchema>;
