"use client";

import {
  AddPriceInfo,
  DisplayFormStep,
  SelectBuyersTable,
  SelectOccupation,
} from "@/components/modules";
import { group } from "console";
import { useState } from "react";

export default function AddGroupPage() {
  const [step, setStep] = useState(2);
  return (
    <div className="min-h-screen px-10 py-4">
      <div className="flex-center  py-7">
        <DisplayFormStep activeStep={step} variant={"group"} />
      </div>

      {step === 1 && <SelectOccupation step={step} setStep={setStep} />}

      {step === 2 && <SelectBuyersTable step={step} setStep={setStep} />}

      {step === 3 && <AddPriceInfo step={step} setStep={setStep} />}
    </div>
  );
}
