"use client";
import { DashHeader } from "@/components/modules";
import React from "react";
import AddProductBtn from "../_components/add-product-btn";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Group() {
  const router = useRouter();
  return (
    <div className="min-h-screen px-10 py-4">
      <DashHeader
        title="Group"
        button={
          <Button
            variant={"company"}
            onClick={() => router.push("/dashboard/group/add-group")}
          >
            Add Group
          </Button>
        }
      />
    </div>
  );
}
