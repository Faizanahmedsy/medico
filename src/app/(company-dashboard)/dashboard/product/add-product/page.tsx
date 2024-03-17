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

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardForm from "@/components/modules/card-form";
import ProductDetailsForm from "@/components/modules/product-form/basic-info/basic-details";
import SelectExistingUser from "@/components/modules/product-form/step-2/select-existing-user";
import SelectLocations from "@/components/modules/product-form/step-2/select-locations";

export default function AddProductDetailsPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productName: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="min-h-screen px-10 py-4">
        {/* STEP COUNTER  */}
        <div className="flex-center  py-7">
          <DisplayFormStep activeStep={step} />
        </div>

        {step === 1 && <ProductDetailsForm step={step} setStep={setStep} />}

        {step === 2 && <SelectExistingUser step={step} setStep={setStep} />}

        {step === 3 && <SelectLocations step={step} setStep={setStep} />}
        {/* 
        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />}

        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />}

        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />}

        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />} */}
      </div>
    </>
  );
}
