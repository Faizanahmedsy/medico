import { z } from "zod";

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters",
      })
      .max(50)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "First name must not contain special characters or numbers",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters",
      })
      .max(50)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "Last name must not contain special characters or numbers",
      }),
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters",
      })
      .max(50)
      .refine((value) => /^[a-z]+$/.test(value), {
        message: "Username must be in lowercase",
      }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(50)
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
