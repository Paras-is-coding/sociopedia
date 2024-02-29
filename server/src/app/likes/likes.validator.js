const { z } = require('zod');

const likeSchema = z.object({
  postId: z.string().uuid().required(),
  userId: z.string().uuid().required(),
});

module.exports = { likeSchema };
