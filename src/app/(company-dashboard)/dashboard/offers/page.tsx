"use client";
import { Wrapper } from "@/components/custom";
import { DashHeader } from "@/components/modules";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function OffersPage() {
  const router = useRouter();
  return (
    <Wrapper>
      <DashHeader
        title="Offer"
        button={
          <Button
            variant={"company"}
            onClick={() => router.push("/dashboard/offers/add-offer")}
          >
            Add Offer
          </Button>
        }
      />
    </Wrapper>
  );
}
