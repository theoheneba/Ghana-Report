import { z } from 'zod';

export const ReportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum([
    'corruption',
    'fraud',
    'misconduct',
    'harassment',
    'discrimination',
    'environmental',
    'other'
  ]),
  description: z.string().min(1, 'Description is required'),
  date: z.string(),
  location: z.string().min(1, 'Location is required'),
  willing_to_testify: z.boolean().default(false),
  involved_parties: z.string().optional(),
});

export type Report = z.infer<typeof ReportSchema>;