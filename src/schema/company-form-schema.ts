import { z } from "zod";

export const addProductSchema = z.object({
  // productName: z.string().min(1, { message: "Product name is required" }),
  // pricingMethodPreference: z
  //   .string()
  //   .min(1, { message: "Pricing method is required" }),
  // discount: z.string().min(1, { message: "Discount is required" }),
  // margin: z.string().min(1, { message: "Margin is required" }),
  // sellingPrice: z.string().min(1, { message: "Selling price is required" }),
  type: z.string().refine((value) => ["capsule", "tablet"].includes(value)),
  sizeX: z.string().min(1, { message: "Size X is required" }),
  sizeY: z.string().min(1, { message: "Size Y is required" }),
  contains: z.string().min(1, { message: "Contains is required" }),

  drugName: z.string().min(1, { message: "Drug name is required" }),
  // brandName: z.string().min(1, { message: "Brand name is required" }),
  manufactureName: z
    .string()
    .min(1, { message: "Manufacturing name is required" }),
  division: z.string().refine((value) => ["item1", "item2"].includes(value)),
  prescription: z
    .string()
    .refine((value) => ["rx", "nRx", "g"].includes(value)),

  manufactureLicenseNumber: z
    .string()
    .min(1, { message: "License number is required" }),
  // contents: z.string().min(1, { message: "Contents is required" }),
  mrp: z.string().min(1, { message: "MRP is required" }),
  // retailPrice: z.string().min(1, { message: "Retail price is required" }),
  // packSize: z.string().min(1, { message: "Selling price is required" }),
  returnDays: z.string().min(1, { message: "Return days is required" }),
  allowReturn: z.string().min(1, { message: "Allow return is required" }),
  allowExchange: z.string().min(1, { message: "Allow exchange is required" }),
});
