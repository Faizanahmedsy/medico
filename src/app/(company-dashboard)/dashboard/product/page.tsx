import { Button } from "@/components/ui/button";
import React from "react";
import AddProductBtn from "../_components/add-product-btn";
import { DashHeader, TextH2 } from "@/components/modules";

export default function ProductPage() {
  return (
    <div className="min-h-screen px-10 py-4">
      <DashHeader title="Product" button={<AddProductBtn />} />
    </div>
  );
}
