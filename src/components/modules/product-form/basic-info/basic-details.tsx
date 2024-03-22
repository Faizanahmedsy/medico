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
import { set, z } from "zod";
import CardForm from "@/components/modules/card-form";

import React, { use, useEffect, useState } from "react";

import SellingPriceCardForm from "./selling-price-card-form";
import ManufacturerFormCard from "./manufacturer-form-card";
import ProductInfoFormCard from "./product-info-form-card";
import { useMutation } from "@tanstack/react-query";
import { addProductApi } from "@/services/product/product.api";
import { toast } from "sonner";
import { getItem, setItem } from "@/lib/localStorage";
import useGlobalState from "@/store";

export default function ProductDetailsForm({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const [calculatedPrice, setCalculatedPrice] = useState("");

  const setZustProductId = useGlobalState((state) => state.setZustProductId);

  const form: any = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      drugName: "",
      type: "",
      division: "",
      prescription: "",
      sizeX: "",
      sizeY: "",
      contains: "",
      mrp: "",
      manufactureLicenseNumber: "",
      manufactureName: "",
    },
    mode: "onChange",
  });

  const addProductMutation = useMutation({
    mutationFn: addProductApi,
    onSuccess: (data) => {
      console.log("addProductMutation", data);

      setZustProductId(data?.id);

      setItem("medico-productId", data?.id);

      setStep(2);

      toast.success("Product added successfully");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmit = (payload: any) => {
    const formattedPayload = {
      companyEmail: getItem("test-email"),
      type: payload.type,
      brandName: payload.manufactureName,
      drugName: payload.drugName,
      manufacturingName: payload.manufactureName,
      division: payload.division,
      prescription: payload.prescription,
      licenseNo: payload.manufactureLicenseNumber,
      manufacturerName: payload.manufactureName,
      contents: payload.contains,
      // margin: payload.margin,
      mrp: Number(payload.mrp),
      effectivePriceCalculationType: payload.pricingMethodPreference,
      retailPrice: Number(payload.retailPrice),
      sellingPrice: Number(payload.sellingPrice),
      // sizeX: payload.sizeX,
      // sizeY: payload.sizeY,
      packSize: {
        x: Number(payload.sizeX),
        y: Number(payload.sizeY),
      },
      returnPolicy: {
        allowExchange: payload.allowExchange === "true" ? true : false,
        allowReturn: payload.allowReturn,
        returnDays: Number(payload.returnDays),
      },
      value: 1,
      // effectivePriceCalculationType: 0,
    };

    console.log("product add payload", formattedPayload);

    addProductMutation.mutate(formattedPayload);

    // setStep(2); //TODO: move this to the second step

    // toast.success("Product added successfully");
  };

  const calculatePrice = () => {
    const pricingMethodPreference: any = form.watch("pricingMethodPreference");
    const retailPrice: number = parseFloat(form.watch("retailPrice"));
    const discount: number = parseFloat(form.watch("discount"));
    const margin: number = parseFloat(form.watch("margin"));

    if (pricingMethodPreference === "discountOnMrp") {
      const discountedPrice = retailPrice * (1 - discount / 100);
      setCalculatedPrice(discountedPrice.toFixed(2));
    } else if (pricingMethodPreference === "marginOnSP") {
      const calculatedMargin = (100 - margin) / 100;
      const calculatedPrice = retailPrice / calculatedMargin;
      setCalculatedPrice(calculatedPrice.toFixed(2));
    }
  };

  // CALCULATE SELLING PRICE WHEN EVER ANY OF THIS FIELDS CHANGE
  useEffect(() => {
    calculatePrice();
  }, [
    form.watch("pricingMethodPreference"),
    form.watch("retailPrice"),
    form.watch("discount"),
    form.watch("margin"),
  ]);

  useEffect(() => {
    form.setValue("sellingPrice", calculatedPrice);
  }, [calculatedPrice]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-5 md:min-w-[700px]"
        >
          <DashHeader
            title={"Product"}
            button={
              <Button variant={"company"} type="submit">
                SAVE
              </Button>
            }
          />
          <ProductInfoFormCard form={form} />
          <ManufacturerFormCard form={form} />
          <SellingPriceCardForm form={form} />
        </form>
      </Form>
    </div>
  );
}
