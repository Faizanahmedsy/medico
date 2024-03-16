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

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ProductDetailsForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productName: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  my-5 md:min-w-[700px]"
        >
          <CardForm
            title={"Product Information"}
            content={
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Product Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a primises" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="item1">Item 1</SelectItem>
                          <SelectItem value="item2">Item 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a primises" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="item1">Item 1</SelectItem>
                          <SelectItem value="item2">Item 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Primises</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a primises" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="item1">Item 1</SelectItem>
                          <SelectItem value="item2">Item 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Size X </FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Size Y</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Product Detail</FormLabel>
                      <FormControl>
                        <Textarea placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Contains</FormLabel>
                      <FormControl>
                        <Textarea placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            }
          />

          <CardForm
            title={"Manufacturer and Pricing Information"}
            content={
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Manufacture Name</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Manufacture License Number</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Return Policy</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        <div className="flex justify-between">
                          <div>MRP</div>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <QuestionMarkCircledIcon />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    Maximum Retail Price , This will be visible
                                    to end consumers
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            }
          />

          <CardForm
            title="Selling Price"
            content={
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Selling Price</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Pricing Method Preference</FormLabel>
                        <FormControl>
                          <RadioGroup defaultValue="comfortable">
                            <div className="flex flex-col gap-2 w-full border p-4 rounded-xl">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Discount on Mrp</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">
                                  Margin on selling price
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productName"
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
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Calculated Price</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            }
          />
        </form>
      </Form>
    </div>
  );
}
