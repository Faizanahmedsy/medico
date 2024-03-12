import { Button } from "@/components/ui/button";
import React from "react";
import AddProductBtn from "../_components/add-product-btn";
import { TextH2 } from "@/components/modules";

export default function ProductPage() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between   items-center p-4">
        <TextH2>Product</TextH2>
        <div>
          <AddProductBtn />
        </div>
      </div>
      {/* <div>Product aadded in differt layes</div>

      <div>Add product</div>

      <div>Manufacting name</div>

      <div>Product name</div>

      <div>company name</div>

      <div> return policy</div>

      <div>12 fileds are there</div>

      <div>Save button</div>

      <div>After save next page</div> */}
    </div>
  );
}
