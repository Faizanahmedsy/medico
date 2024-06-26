"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { FormattedPayload } from "../../../../types/company-dashboard-types";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function ProductDetailsForm({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const [calculatedPrice, setCalculatedPrice] = useState("");

  const [letterPadDocument, setLetterPadDocument] = useState<string>("");

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

      let thiserror: any = error;

      toast.error(thiserror?.response?.data?.title || "Something went wrong");
    },
  });

  const onSubmit = (payload: any) => {
    console.log("add product", payload);

    const formattedPayload: FormattedPayload = {
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
      effectivePriceCalculationType:
        payload.pricingMethodPreference === "marginOnSP"
          ? "MarginOnSellingPrice"
          : "DiscountOnMRP",
      retailPrice: Number(payload.retailPrice),
      sellingPrice: Number(payload.sellingPrice),
      packSize: {
        x: Number(payload.sizeX),
        y: Number(payload.sizeY),
      },
      returnPolicy: {
        allowExchange: payload.allowExchange === "true" ? true : false,
        allowReturn: payload.allowReturn === "true" ? true : false,
      },
      value: 1,
      // effectivePriceCalculationType: 0,
    };

    if (payload.pricingMethodPreference === "discountOnMrp") {
      formattedPayload.value = Number(payload.discount);
    }

    if (payload.pricingMethodPreference === "marginOnSP") {
      formattedPayload.value = Number(payload.margin);
    }
    if (payload.prescription === "nRx") {
      formattedPayload.letterPadDocumentLink = letterPadDocument;
    }

    if (payload.allowReturn === "true") {
      formattedPayload.returnPolicy.returnDays = Number(payload.returnDays);
    }

    console.log("product add payload", formattedPayload);

    addProductMutation.mutate(formattedPayload);
  };

  const calculatePrice = () => {
    const pricingMethodPreference: any = form.watch("pricingMethodPreference");
    const mrp: number = parseFloat(form.watch("mrp"));
    const retailPrice: number = parseFloat(form.watch("retailPrice"));

    const discount: number = parseFloat(form.watch("discount"));
    const margin: number = parseFloat(form.watch("margin"));

    if (pricingMethodPreference === "discountOnMrp") {
      const discountedPrice = mrp * (1 - discount / 100);
      setCalculatedPrice(discountedPrice.toFixed(2));
    } else if (pricingMethodPreference === "marginOnSP") {
      console.log("fhfh margin", margin);
      const calculatedMargin = (100 - margin) / 100;

      console.log("fhfh calculatedMargin", calculatedMargin);
      const calculatedPrice = retailPrice / calculatedMargin;
      setCalculatedPrice(calculatedPrice.toFixed(2));
    }
  };

  // CALCULATE SELLING PRICE WHEN EVER ANY OF THIS FIELDS CHANGE
  useEffect(() => {
    calculatePrice();
  }, [
    form.watch("pricingMethodPreference"),
    form.watch("mrp"),
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
              <>
                {/* <Dialog>
                  <DialogTrigger>Open</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      </DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog> */}

                {/* <Button>test</Button> */}
                <Button
                  variant={"company"}
                  type="submit"
                  disabled={addProductMutation.isPending}
                >
                  {addProductMutation.isPending && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  SAVE
                </Button>
              </>
            }
          />
          <ProductInfoFormCard
            form={form}
            setLetterPadDocument={setLetterPadDocument}
          />
          <div className="pb-4">
            <ManufacturerFormCard form={form} />
          </div>
          <SellingPriceCardForm form={form} />
        </form>
      </Form>
    </div>
  );
}
