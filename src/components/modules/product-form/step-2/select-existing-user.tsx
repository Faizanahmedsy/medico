import React from "react";
import { DashHeader } from "@/components/modules";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getGroupApi } from "@/services/group/group.api";

export default function SelectExistingUser({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const groupQuery = useQuery({
    queryKey: ["groups"],
    queryFn: getGroupApi,
    retry: 1,
  });

  console.log("groupQuery", groupQuery);

  return (
    <DashHeader
      title="Select Existing User"
      button={
        <Button
          variant={"company"}
          type="submit"
          onClick={() => {
            // router.push("/dashboard/product/add-product/where-to-show");
            if (step < 6) {
              setStep((prev) => prev + 1);
            }
          }}
        >
          SAVE
        </Button>
      }
    />
  );
}
