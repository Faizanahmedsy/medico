"use client";
import React, { useState } from "react";
import {
  AddPriceInfo,
  DisplayFormStep,
  ProductDetailsForm,
  SelectBuyersTable,
  SelectExistingUser,
  SelectLocations,
  SelectOccupation,
} from "@/components/modules";

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
        {step === 4 && <SelectOccupation step={step} setStep={setStep} />}

        {step === 5 && <SelectBuyersTable step={step} setStep={setStep} />}

        {step === 6 && <AddPriceInfo step={step} setStep={setStep} />}

        {/* 
        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />}

        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />}

        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />}

        {step === 3 && <SelectExistingUser step={step} setStep={setStep} />} */}
      </div>
    </>
  );
}
