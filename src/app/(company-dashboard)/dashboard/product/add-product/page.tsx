"use client";
import React, { useState } from "react";
import { DisplayFormStep } from "@/components/modules";

import ProductDetailsForm from "@/components/modules/product-form/basic-info/basic-details";
import SelectExistingUser from "@/components/modules/product-form/step-2/select-existing-user";
import SelectLocations from "@/components/modules/product-form/step-2/select-locations";

export default function AddProductDetailsPage() {
  const [step, setStep] = useState(1);

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
