"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerAsCompany, registrationSchema } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { registerAsCompanyApi } from "@/services/user/user.api";

export default function RegisterAsCompanyPage() {
  const form = useForm<z.infer<typeof registerAsCompany>>({
    resolver: zodResolver(registerAsCompany),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyType: "",
      chargeType: "",
      charges: "",
      email: "",
    },
    mode: "onChange",
  });

  const registerAsCompanyMutation = useMutation({
    mutationFn: registerAsCompanyApi,
    onSuccess: (data: any) => {
      console.log("data", data);
      // if (data.type === "company") {
      //   router.push("register/as-company");
      // } else {
      //   router.push("register/as-buyer");
      // }
    },
  });

  function onSubmit(data: z.infer<typeof registerAsCompany>) {
    console.log("form", form);
    console.log(data);

    registerAsCompanyMutation.mutate(data);
  }

  console.log("form chageType", form.watch("chargeType"));

  return (
    <>
      <div className="min-h-screen flex md:flex-col justify-center items-center">
        {/* <div className="flex flex-col "> */}
        {/* <h1 className="text-3xl font-semibold py-6 text-center">
          Register your company
        </h1> */}
        <Card>
          <CardHeader>
            <CardTitle>Register your company</CardTitle>
            {/* <CardDescription>
              Register your company to start selling or buying products.
            </CardDescription> */}
          </CardHeader>
          <hr />
          <div className="" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8  my-5 md:min-w-[700px]"
            >
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyEmail"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company Email</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a company type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="selfSelling">
                              Self Selling
                            </SelectItem>
                            <SelectItem value="companySelling">
                              Company selling
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="chargeType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Charge Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a charge type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percentageOnMargin">
                              Percentage on Margin
                            </SelectItem>
                            <SelectItem value="subscription">
                              Subscription
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("chargeType") === "subscription" && (
                    <FormField
                      control={form.control}
                      name="charges"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Charges</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">
                                <div>
                                  <div>3000 INR</div>
                                  <div>Per Month</div>
                                </div>
                              </SelectItem>
                              <SelectItem value="2">
                                <div>
                                  <div>15000 INR</div>
                                  <div>Per 6 Month</div>
                                </div>
                              </SelectItem>
                              <SelectItem value="3">
                                <div>
                                  <div>25000 INR</div>
                                  <div>Per Year</div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                        // <FormItem className="w-full flex flex-col justify-between">
                        //   <FormLabel>Charges</FormLabel>
                        //   <FormControl>
                        //     <Button variant={"outline"}>Select a Plan</Button>
                        //   </FormControl>
                        // </FormItem>
                      )}
                    />
                    // <FormField
                    //   control={form.control}
                    //   name="charges"
                    //   render={({ field }) => (
                    //     <FormItem className="w-full">
                    //       <FormLabel>Charges</FormLabel>
                    //       <FormControl>
                    //         <Input placeholder=" " {...field} />
                    //       </FormControl>
                    //       <FormMessage />
                    //     </FormItem>
                    //   )}
                    // />
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  size={"sm"}
                  className="w-full"
                  disabled={!form.formState.isDirty}
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      {/* </div> */}
    </>
  );
}
