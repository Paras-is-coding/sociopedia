const { z } = require('zod');

const postSchema = z.object({
  user: z.string().uuid().ref('User').required(),
  caption: z.string().optional(),
  picturePath: z.string().optional(),
  location: z.string().optional(),
});

module.exports = { postSchema };
