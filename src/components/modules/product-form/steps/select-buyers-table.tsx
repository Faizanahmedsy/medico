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
      <DashHeader
        title={"Whom to show this product to?"}
        button={
          <Button
            variant={"company"}
            onClick={() => {
              setStep((prev) => prev + 1);
            }}
          >
            SAVE AND CONTINUE
          </Button>
        }
      />

      <CustomerProductVisibilityTable />
    </div>
  );
}
