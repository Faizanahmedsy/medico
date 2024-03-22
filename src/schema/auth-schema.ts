import { z } from "zod";

export const registrationSchema = z
  .object({
    type: z.string().refine((value) => ["company", "buyer"].includes(value)),
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

export const loginSchema = z.object({
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
});

export const registerAsCompany = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  companyEmail: z.string().email(),
  companyType: z
    .string()
    .refine((value) => ["SelfSelling", "AdminSelling"].includes(value)),
  chargesType: z.string(),
  charges: z.optional(z.string()),
  email: z.string().email(),
});

export const registerAsBuyerSchema = z.object({
  firstName: z
    .string()
    .refine((value) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value), {
      message:
        "First name should not have special characters and more than 1 space",
    }),
  lastName: z
    .string()
    .refine((value) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value), {
      message:
        "Last name should not have special characters and more than 1 space",
    }),
  occupation: z.string().min(1, {
    message: "Occupation is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  district: z.string().min(1, {
    message: "District is required",
  }),
  taluka: z.string().min(1, {
    message: "Taluka is required",
  }),
  emailAddress: z.string().email(),
});
