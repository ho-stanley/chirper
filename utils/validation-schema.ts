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

export const newPostSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title must contain at least 1 character' })
    .max(50, { message: 'Title must contain at most 50 characters' })
    .trim(),
  body: z
    .string()
    .min(1, { message: 'Message must contain at least 1 character' })
    .max(250, { message: 'Message must contain at most 250 characters' })
    .trim(),
});

export const newCommentSchema = z.object({
  body: z
    .string()
    .min(1, { message: 'Comment must contain at least 1 character' })
    .max(256, { message: 'Comment must contain at most 256 characters' })
    .trim(),
});

export const searchSchema = z.object({
  keyword: z
    .string()
    .min(1, { message: 'Search word must contain at least 1 character' })
    .max(50, { message: 'Search word must contain at most 50 characters' })
    .trim(),
});
