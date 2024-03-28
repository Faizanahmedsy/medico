"use client";
import React, { useState } from "react";
import { Wrapper } from "@/components/custom";
import { DisplayFormStep } from "@/components/modules";
import { useRouter } from "next/navigation";
import OfferBasicDetailsForm from "@/components/modules/offer/basic-details/offer-basic-details-form";
import OfferSelectedProductsModule from "@/components/modules/offer/selected-products/offer-selected-products-module";
import SelectProduct from "@/components/modules/offer/select-product/select-product";

export default function AddOfferModule() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  return (
    <Wrapper className="h-[calc(100vh-50px)]  my-0">
      <div className="flex-center  py-7">
        <DisplayFormStep activeStep={step} variant="offer" />
      </div>

      {step === 1 && <OfferBasicDetailsForm step={step} setStep={setStep} />}
      {step === 2 && <SelectProduct step={step} setStep={setStep} />}
    </Wrapper>
  );
}
