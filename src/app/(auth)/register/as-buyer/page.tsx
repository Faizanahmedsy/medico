"use client";
import React, { useEffect } from "react";
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
import {
  registerAsBuyerSchema,
  registrationSchema,
} from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerAsBuyerApi } from "@/services/user/user.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getItem, setItem } from "@/lib/localStorage";
import { jwtDecode } from "jwt-decode";

export default function RegisterAsBuyerPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerAsBuyerSchema>>({
    resolver: zodResolver(registerAsBuyerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      occupation: "",
      // degree: "",
      state: "",
      district: "",
      taluka: "",
    },
    mode: "onChange",
  });

  const registerAsBuyerMutation = useMutation({
    mutationFn: registerAsBuyerApi,
    onSuccess: (resp: any) => {
      if (resp?.status === 201) {
        setItem("medico-isComplete", "true");
        toast.success("Welcome to medico");
        router.push("/dashboard");
      }

      console.log("registerAsBuyerApi data", resp);

      // if (data.type === "company") {
      //   router.push("register/as-company");
      // } else {
      //   router.push("register/as-buyer");
      // }
    },
    onError: (error: any) => {
      console.log("error", error);
      toast.error("Something went wrong");
    },
  });

  function onSubmit(data: z.infer<typeof registerAsBuyerSchema>) {
    let payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      occupation: data.occupation,
      // degree: data.degree,
      address: {
        state: data.state,
        district: data.district,
        taluka: data.taluka,
      },
    };

    console.log("payload", payload);

    registerAsBuyerMutation.mutate(payload);
  }

  useEffect(() => {
    const email = getItem("test-email");
    if (email) {
      form.setValue("emailAddress", email);
    }
  }, []);

  const token = getItem("medico_access_token");

  const decodedToken: any = jwtDecode(token);

  const userRole =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  console.log("debug decodedToken", decodedToken);

  console.log("debug userRole", userRole);

  //   if(decodedToken?.http://schemas.microsoft.com/ws/2008/06/identity/claims/role === "company") {

  // }

  if (userRole === "Company") {
    toast.error("You are not authorized to access this page");
    router.push("/register/as-company");

    return;
  }

  return (
    <>
      <div className="md:px-32 py-2 flex md:flex-col justify-center items-center min-h-screen w-full ">
        {/* <div className="flex flex-col "> */}
        <Card className="w-[800px]">
          <CardHeader>
            <CardTitle>Register as buyer</CardTitle>
            {/* <CardDescription>
              Register yourself as a buyer to start buying products.
            </CardDescription> */}
          </CardHeader>
          {/* <h1 className="text-3xl font-semibold py-6 text-center">
            Register as buyer
          </h1> */}
          <hr />
          <div className="" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8  my-5"
            >
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=" "
                            {...field}
                            disabled={getItem("test-email") ? true : false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input placeholder=" " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="taluka"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Taluka</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Taluka" />
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
