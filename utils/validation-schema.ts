import { z } from 'zod';

// Validations
const usernameValidation = z
  .string()
  .regex(/^\w+$/, {
    message: 'Only A-Z letters, numbers and underscore are allowed',
  })
  .min(3, { message: 'Username must contain at least 3 characters' })
  .max(25, { message: 'Username must contain at most 25 characters' })
  .trim();

const passwordValidation = z
  .string()
  .min(8, { message: 'Password must contain at least 8 characters' })
  .max(250, { message: 'Password must contain at most 250 characters' })
  .trim();

const repeatPasswordValidation = z
  .string()
  .min(8, { message: 'Repeat password must contain at least 8 characers' })
  .max(250, {
    message: 'Repeat password must contain at most 250 characters',
  })
  .trim();

const titleValidation = z
  .string()
  .min(1, { message: 'Title must contain at least 1 character' })
  .max(50, { message: 'Title must contain at most 50 characters' })
  .trim();

const bodyValidation = z
  .string()
  .min(1, { message: 'Message must contain at least 1 character' })
  .max(250, { message: 'Message must contain at most 250 characters' })
  .trim();

const keywordValidation = z
  .string()
  .min(1, { message: 'Search word must contain at least 1 character' })
  .max(50, { message: 'Search word must contain at most 50 characters' })
  .trim();

// Schemas
export const signupSchema = z
  .object({
    username: usernameValidation,
    password: passwordValidation,
    repeatPassword: repeatPasswordValidation,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export const signinSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
});

export const newPostSchema = z.object({
  title: titleValidation,
  body: bodyValidation,
});

export const newCommentSchema = z.object({
  body: bodyValidation,
});

export const searchSchema = z.object({
  keyword: keywordValidation,
});

export const newUserSchema = z
  .object({
    username: usernameValidation,
    password: passwordValidation,
    repeatPassword: repeatPasswordValidation,
    role: z.enum(['ADMIN', 'USER']),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });
