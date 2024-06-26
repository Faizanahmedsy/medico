"use client";
import React, { useEffect, useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { getItem, setItem } from "@/lib/localStorage";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LogoutButton } from "@/components/custom";
import { extractRoleFromToken } from "@/lib/helpers";

interface PayloadType {
  companyName: string;
  companyEmail: string;
  companyType: string;
  emailAddress: string;
  subscription?: string; // Update the type of charges property if needed
  chargesType?: string;
  percentage?: string;
  documentLinks?: {
    name: string;
    link: string;
  }[];
}

function RegisterAsCompanyPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerAsCompany>>({
    resolver: zodResolver(registerAsCompany),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyType: "",
      chargesType: "",
      charges: "",
      email: "",
    },
    mode: "onChange",
  });
  registerAsCompanyApi;
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string>("");

  console.log("uploadedImage", uploadedImage);

  const registerAsCompanyMutation = useMutation({
    mutationFn: registerAsCompanyApi,
    onSuccess: (resp: any) => {
      console.log("test-token registerAsCompanyApi resp", resp);

      setItem("medico-companyId", resp?.data?.id);

      setItem("medico_access_token", resp?.data?.accessToken);

      if (resp?.status === 201) {
        toast.success("Company registered successfully");
        router.push("/dashboard");
        setItem("medico-isComplete", "true");
      }

      // if (data.type === "company") {
      //   router.push("register/as-company");
      // } else {
      //   router.push("register/as-buyer");
      // }
    },
    onError: (error) => {
      console.log("registerAsCompanyApi error", error);

      let errormssage: any = error;

      if (errormssage?.response?.data?.detail) {
        toast.error(errormssage?.response?.data?.detail);
        return;
      }

      toast.error("Something went wrong");
    },
  });

  function onSubmit(data: z.infer<typeof registerAsCompany>) {
    console.log("as company form data", data);

    if (data.charges) {
      delete data.charges;
    }

    // data.charges = selectedPlan;

    // const payload: {
    //   companyName: string;
    //   companyEmail: string;
    //   companyType: string;
    //   chargesType: string;
    //   email?: string;
    //   charges: string;
    // } = {
    //   ...data,
    //   charges: selectedPlan,
    // };

    // if (data?.companyEmail) {
    //   setItem("test-email", data?.companyEmail);
    // }

    const payload: PayloadType = {
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyType: data.companyType,
      emailAddress: data.email,
      documentLinks: [
        {
          name: "example",
          link: uploadedImage,
        },
      ],
    };

    // if (data.percentage) {
    //   payload.percentage = data.percentage;
    // }

    console.log("selectedPlan", selectedPlan);
    console.log('form.watch("chargesType")', form.watch("chargesType"));

    if (selectedPlan && form.watch("chargesType") === "subscription") {
      payload.subscription = selectedPlan;
    }

    if (data.chargesType === "percentageOnMargin") {
      payload.chargesType = "Percentage";
    }

    if (data.chargesType === "subscription") {
      payload.chargesType = "Subscription";
    }

    console.log("payload", payload);
    registerAsCompanyMutation.mutate(payload);

    setItem("test-isComplete", "true");
  }

  const handleCardClick = (plan: string) => {
    setSelectedPlan(plan);

    console.log("plan", plan);
  };

  useEffect(() => {
    console.log("uploadedImage", uploadedImage);

    const email = getItem("test-email");
    if (email) {
      form.setValue("email", email);
    }

    // const token: any = getItem("medico_access_token");

    // if (token) {
    //   if (typeof token !== "string") {
    //     console.error("Invalid token: not a string");
    //     return;
    //   }

    //   const decodedToken: any = jwtDecode(token);

    //   const userRole = extractRoleFromToken(decodedToken);

    //   if (userRole === "Buyer") {
    //     toast.error("You are not authorized to access this page");
    //     router.push("/register/as-buyer");
    //     return;
    //   }
    // }
  }, []);

  return (
    <>
      <LogoutButton />

      <div className="min-h-screen flex md:flex-col justify-center items-center">
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
              className="mt-5 md:min-w-[700px]"
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
                          <Input
                            placeholder=" "
                            {...field}
                            disabled={form.watch("email") !== ""}
                          />
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
                            <SelectItem value="SelfSelling">
                              Self Selling
                            </SelectItem>
                            <SelectItem value="AdminSelling">
                              Company selling
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("companyType") === "SelfSelling" && (
                    <>
                      <FormField
                        control={form.control}
                        name="chargesType"
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
                      {form.watch("chargesType") === "subscription" && (
                        <FormField
                          control={form.control}
                          name="charges"
                          render={({ field }) => (
                            <FormItem className="w-full flex flex-col justify-between pt-1">
                              <FormLabel>Charges</FormLabel>
                              <FormControl>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">
                                      Select a plan
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[625px] ">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Select a Subscription plan
                                      </DialogTitle>
                                      <DialogDescription>
                                        Pick what suites you the best
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-3 gap-3">
                                      <Card
                                        onClick={() =>
                                          handleCardClick("PERMONTH_3000")
                                        }
                                        className={cn(
                                          "cursor-pointer",
                                          selectedPlan === "PERMONTH_3000"
                                            ? "bg-teal-800 text-white"
                                            : ""
                                        )}
                                      >
                                        <CardHeader>
                                          <CardTitle>3000 INR</CardTitle>
                                        </CardHeader>
                                        <CardContent>Per Month</CardContent>
                                      </Card>
                                      <Card
                                        onClick={() =>
                                          handleCardClick("PERSIXMONTH_15000")
                                        }
                                        className={cn(
                                          "cursor-pointer",
                                          selectedPlan === "PERSIXMONTH_15000"
                                            ? "bg-teal-800 text-white"
                                            : ""
                                        )}
                                      >
                                        <CardHeader>
                                          <CardTitle>15000 INR</CardTitle>
                                        </CardHeader>
                                        <CardContent>Per 6 Month</CardContent>
                                      </Card>
                                      <Card
                                        onClick={() =>
                                          handleCardClick("PERYEAR_25000")
                                        }
                                        className={cn(
                                          "cursor-pointer",
                                          selectedPlan === "PERYEAR_25000"
                                            ? "bg-teal-800 text-white"
                                            : ""
                                        )}
                                      >
                                        <CardHeader>
                                          <CardTitle>25000 INR</CardTitle>
                                        </CardHeader>
                                        <CardContent> Per Year</CardContent>
                                      </Card>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          type="button"
                                          variant="secondary"
                                        >
                                          Save changes
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}

                      {/* {form.watch("chargesType") === "percentageOnMargin" && (
                        <>
                          <FormField
                            control={form.control}
                            name="percentage"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Percentage</FormLabel>
                                <FormControl>
                                  <Input placeholder=" " {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )} */}
                    </>
                  )}
                </div>

                <div className="py-4">
                  <CldUploadWidget
                    uploadPreset="nezbeiii"
                    options={{
                      sources: ["local", "url", "google_drive", "dropbox"],
                    }}
                    onUploadAdded={(file) => {
                      console.log("CldUploadWidget file", file);
                    }}
                    onSuccess={(response) => {
                      console.log("CldUploadWidget response", response);

                      if (response?.event === "success") {
                        const info =
                          response.info as CloudinaryUploadWidgetInfo;
                        setUploadedImage(info.url);
                      }
                    }}
                  >
                    {({ open }) => {
                      return (
                        <Button
                          onClick={() => open()}
                          variant={"secondary"}
                          type="button"
                          // className="w-full"
                        >
                          Upload an Image
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  size={"sm"}
                  className="w-full"
                  disabled={registerAsCompanyMutation.isPending}
                >
                  {registerAsCompanyMutation.isPending && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
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

export default dynamic(() => Promise.resolve(RegisterAsCompanyPage), {
  ssr: false,
});
