import { z } from "zod";

export const registrationSchema = z
  .object({
    // firstName: z
    //   .string()
    //   .min(2, {
    //     message: "First name must be at least 2 characters",
    //   })
    //   .max(50)
    //   .refine((value) => /^[a-zA-Z]+$/.test(value), {
    //     message: "First name must not contain special characters or numbers",
    //   }),
    // lastName: z
    //   .string()
    //   .min(2, {
    //     message: "Last name must be at least 2 characters",
    //   })
    //   .max(50)
    //   .refine((value) => /^[a-zA-Z]+$/.test(value), {
    //     message: "Last name must not contain special characters or numbers",
    //   }),
    // type: z.enum(["company", "buyer"]),
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

export const registerAsCompany = z.object({
  companyName: z.string(),
  companyEmail: z.string(),
  companyType: z.string(),
  chargeType: z.string(),
  charges: z.string(),
  email: z.string().email(),
});

export const registerAsBuyerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  occupation: z.string(),
  degree: z.string(),
  state: z.string(),
  district: z.string(),
  taluka: z.string(),
  emailAddress: z.string().email(),
});
