import { z } from 'zod'

export const YellowBookEntrySchema = z.object({
  id: z.string(),
  fullName: z.string(),
  title: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string(),
  city: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  avatarUrl: z.string().url().optional()
})
export type YellowBookEntry = z.infer<typeof YellowBookEntrySchema>
