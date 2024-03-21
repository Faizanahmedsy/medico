import React from "react";
import { DashHeader } from "../..";
import { Button } from "@/components/ui/button";
import { CustomerProductVisibilityTable } from "@/app/(company-dashboard)/dashboard/_components/customer-product-visibility-table";

export default function SelectBuyersTable({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <CustomerProductVisibilityTable step={step} setStep={setStep} />
    </div>
  );
}
