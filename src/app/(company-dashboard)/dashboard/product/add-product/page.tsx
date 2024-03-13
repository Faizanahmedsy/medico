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

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardForm from "@/components/modules/card-form";

export default function AddProductFormFirstStepPage() {
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
    <>
      <div className="min-h-screen px-10 py-4">
        {/* STEP COUNTER  */}
        <div className="flex-center  py-7">
          <DisplayFormStep activeStep={1} />
        </div>

        {/* HEADER */}

        <DashHeader
          title="Add Product"
          button={
            <Button
              variant={"default"}
              type="submit"
              onClick={() => {
                router.push("/dashboard/product/add-product/where-to-show");
              }}
            >
              SAVE
            </Button>
          }
        />

        {/* FORM  */}

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
                title={"Manufacturer Information"}
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
                  </div>
                }
              />

              <div className="grid md:grid-cols-3 gap-6">
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
                      <FormLabel>Mrp</FormLabel>
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
                      <FormLabel>Selling Price</FormLabel>
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
                      <FormLabel>Selling Price 2</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="item1">
                            Margin on selling
                          </SelectItem>
                          <SelectItem value="item2">Discount on Mrp</SelectItem>
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
                      <FormLabel>Selling Price 3</FormLabel>
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
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
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
                      <FormLabel>Foo</FormLabel>
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
                      <FormLabel>Foo</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
