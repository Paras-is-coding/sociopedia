const { z } = require('zod');

const createNotificationSchema = z.object({
  sender: z.string().refine((data) => !!data, {
    message: 'Sender ID is required',
  }),
  recipient: z.string().refine((data) => !!data, {
    message: 'Recipient ID is required',
  }),
  type: z.enum(['like', 'comment', 'follow', 'post']).refine((data) => !!data, {
    message: 'Invalid notification type',
  }),
  postId: z.string().optional(),
  commentId: z.string().optional(),
});

module.exports = { createNotificationSchema };
