"use client";
import { DisplayFormStep, TextH2 } from "@/components/modules";
import DashHeader from "@/components/modules/dash-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addProductSchema } from "@/schema/company-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import CardForm from "@/components/modules/card-form";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SellingPriceCardForm({
  form,
}: {
  form: ReturnType<typeof useForm>;
}) {
  return (
    <>
      <CardForm
        title="Pricing Information"
        content={
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="retailPrice"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Retail Price</FormLabel>
                    <FormControl>
                      <Input placeholder=" " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricingMethodPreference"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Pricing Method Preference</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="discountOnMrp" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Discount on Mrp
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="marginOnSP" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Margin on retail price
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("pricingMethodPreference") === "discountOnMrp" && (
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Discount on Mrp</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {form.watch("pricingMethodPreference") === "marginOnSP" && (
                <FormField
                  control={form.control}
                  name="margin"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Margin</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <Input placeholder=" " {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        }
      />
    </>
  );
}
