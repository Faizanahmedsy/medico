"use client";
import { DisplayFormStep, TextH2 } from "@/components/modules";
import DashHeader from "@/components/modules/dash-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addProductSchema } from "@/schema/company-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import CardForm from "@/components/modules/card-form";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SellingPriceCardForm from "./selling-price-card-form";
import ManufacturerFormCard from "./manufacturer-form-card";
import ProductInfoFormCard from "./product-info-form-card";

export default function ProductDetailsForm({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const [calculatedPrice, setCalculatedPrice] = useState("");

  const form: any = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productName: "",
      pricingMethodPreference: "",
      sellingPrice: "",
      discount: "",
      margin: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const calculatePrice = () => {
    const pricingMethodPreference: any = form.watch("pricingMethodPreference");
    const sellingPrice: any = form.watch("sellingPrice");
    const discount: any = form.watch("discount");
    const margin: any = form.watch("margin");
    if (pricingMethodPreference === "discountOnMrp") {
      const discountedPrice = sellingPrice * (1 - discount / 100);
      setCalculatedPrice(discountedPrice.toFixed(2));
    } else if (pricingMethodPreference === "marginOnSP") {
      const calculatedMargin = (100 - margin) / 100;
      const calculatedPrice = sellingPrice / calculatedMargin;
      setCalculatedPrice(calculatedPrice.toFixed(2));
    }
  };
  return (
    <div>
      <DashHeader
        title={(step === 1 && "Add Product") || (step === 2 && "select")}
        button={
          <Button
            variant={"company"}
            type="submit"
            onClick={() => {
              if (step < 6) {
                setStep((prev) => prev + 1);
              } else {
                router.push("/dashboard/product");
              }
            }}
          >
            SAVE
          </Button>
        }
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  my-5 md:min-w-[700px]"
        >
          <ProductInfoFormCard form={form} />
          <ManufacturerFormCard form={form} />
          <SellingPriceCardForm form={form} />
        </form>
      </Form>
    </div>
  );
}
