const { z } = require('zod');

const addMessageSchema = z.object({
  from: z.string().uuid().ref('User').required(),
  to: z.string().uuid().ref('User').required(),
  message: z.string().min(1).max(500).required(),
});

module.exports = { addMessageSchema };
