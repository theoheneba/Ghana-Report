import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string().uuid(),
  report_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string().min(1, 'Comment content is required'),
  created_at: z.string().datetime(),
});

export type Comment = z.infer<typeof CommentSchema>;