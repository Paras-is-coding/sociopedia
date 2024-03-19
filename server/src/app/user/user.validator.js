const { z } = require('zod')

const editProfileSchema = z.object({
  // picturePath: z.string(), // You may want to adjust the type based on your backend storage mechanism
  firstname: z.string().min(1, 'First Name is required'),
  lastname: z.string().min(1, 'Last Name is required'),
  bio: z.string().max(255, 'Bio must be at most 255 characters'),
  occupation: z.string(),
  location: z.string(),
  phone: z.string(),
});

module.exports = {editProfileSchema}
