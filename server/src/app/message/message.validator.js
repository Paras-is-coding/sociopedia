const { z } = require('zod');

const addMessageSchema = z.object({
  from: z.string().uuid().refine(data => !!data, {
    message: 'From is required',
  }),
  to: z.string().uuid().refine(data => !!data, {
    message: 'To is required',
  }),
  message: z.string().min(1).max(500).refine(data => !!data, {
    message: 'Message is required',
  }),
});


module.exports = { addMessageSchema };
