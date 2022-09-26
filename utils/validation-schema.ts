import { z } from 'zod';

export const signupSchema = z
  .object({
    username: z
      .string()
      .regex(/^\w+$/, {
        message: 'Only A-Z letters, numbers and underscore are allowed',
      })
      .min(3, { message: 'Username must contain at least 3 characters' })
      .max(25, { message: 'Username must contain at most 25 characters' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .trim()
      .max(250, { message: 'Password must contain at most 250 characters' })
      .trim(),
    repeatPassword: z
      .string()
      .min(8, { message: 'Repeat password must contain at least 8 characers' })
      .max(250, {
        message: 'Repeat password must contain at most 250 characters',
      })
      .trim(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export const signinSchema = z.object({});
