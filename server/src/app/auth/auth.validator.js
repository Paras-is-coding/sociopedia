const { z } = require('zod');

const regSchema = z.object({
  firstname: z.string().min(2).max(50).refine(data => data.length > 0, {
    message: 'First name is required',
  }),
  lastname: z.string().min(2).max(50).refine(data => data.length > 0, {
    message: 'Last name is required',
  }),
  email: z.string().email().refine(data => data.length > 0, {
    message: 'Email is required',
  }),
});


const passwordSchema = z.object({
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/),
  confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm Password does not match",
  path: ["confirmPassword"]
})


const loginSchema = z.object({
  email : z.string().email().min(1),
  password : z.string().min(8)
})

const forgetPasswordSchema = z.object({
  email: z.string().email().min(1)
})

module.exports = { regSchema,passwordSchema,loginSchema, forgetPasswordSchema};
