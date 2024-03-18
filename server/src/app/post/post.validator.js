const { z } = require('zod');

const postSchema = z.object({
  user: z.string().refine(data=>!!data,{message:"User field is required"}),
  caption: z.string().optional(),
  picturePath: z.string().optional(),
  location: z.string().optional(),
});

module.exports = { postSchema };
