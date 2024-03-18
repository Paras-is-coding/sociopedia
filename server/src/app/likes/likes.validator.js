const { z } = require('zod');

const likeSchema = z.object({
  postId: z.string().refine((data) => !!data, {
    message: 'postId is required',
  }),
  userId: z.string().refine((data) => !!data, {
    message: 'userId is required',
  }),
});


module.exports = { likeSchema };
