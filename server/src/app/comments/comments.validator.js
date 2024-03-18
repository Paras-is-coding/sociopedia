const { z } = require('zod');

const commentSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  text: z.string().min(1).max(500),
});

module.exports = { commentSchema };
