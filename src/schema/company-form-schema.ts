import { z } from "zod";

export const addProductSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  pricingMethodPreference: z
    .string()
    .min(1, { message: "Pricing method is required" }),
  discount: z.string().min(1, { message: "Discount is required" }),
  margin: z.string().min(1, { message: "Margin is required" }),
  sellingPrice: z.string().min(1, { message: "Selling price is required" }),
  // productType: z.string().min(1, { message: "Product type is required" }),
  // productCategory: z
  //   .string()
  //   .min(1, { message: "Product category is required" }),
  // productSubCategory: z
  //   .string()
  //   .min(1, { message: "Product sub category is required" }),
  // productDescription: z
  //   .string()
  //   .min(1, { message: "Product description is required" }),
  // productPrice: z.string().min(1, { message: "Product price is required" }),
  // productQuantity: z
  //   .string()
  //   .min(1, { message: "Product quantity is required" }),
  // productUnit: z.string().min(1, { message: "Product unit is required" }),
  // productImages: z
  //   .array(z.string())
  //   .min(1, { message: "Product images are required" }),
});
