const { z } = require('zod');

const commentSchema = z.object({
  userId: z.string().uuid().ref('User').required(),
  postId: z.string().uuid().ref('Post').required(),
  text: z.string().min(1).max(500).required(),
});

module.exports = { commentSchema };
