import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfferSelectedProductsModule from "@/components/modules/offer/selected-products/offer-selected-products-module";
import OfferProductsModule from "../products/offer-products-module";

export default function SelectProduct({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="h-full flex justify-between">
      <Tabs defaultValue="product-options" className="w-full h-full">
        <div
          className="flex flex-col justify-between"
          style={
            {
              // height: "inherit",
            }
          }
        >
          <TabsContent value="product-options">
            <OfferProductsModule />
          </TabsContent>
          <TabsContent value="product-selected">
            <OfferSelectedProductsModule />
          </TabsContent>
          <div>
            <TabsList>
              <TabsTrigger value="product-options">Products</TabsTrigger>
              <TabsTrigger value="product-selected">
                Selected Products
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
