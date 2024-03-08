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
import { registrationSchema } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpApi } from "@/services/auth/auth.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import { Eye } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { setItem } from "@/lib/localStorage";

export default function RegisterShopPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      type: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const signUpMutation = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data: any) => {
      console.log("data", data);

      // if (data.type === "company") {
      //   router.push("register/as-company");
      // } else {
      //   router.push("register/as-buyer");
      // }
    },
    onError: (error: any) => {
      console.log("error", error);
      toast.error("An error occurred");
    },
  });

  console.log("signUpMutation", signUpMutation);

  function onSubmit(data: z.infer<typeof registrationSchema>) {
    console.log(data);

    setItem("test-email", data.email);

    setItem("test-type", data.type);

    toast.success("Please check your email to verify your account");

    signUpMutation.mutate(data);

    router.push("/register/verify-email");

    // if (data.type === "company") {
    //   router.push("register/as-company");
    // } else {
    //   router.push("register/as-buyer");
    // }
  }

  return (
    <>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div> */}
      {/* <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div> */}

      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}

      <div className="flex justify-center items-center h-screen">
        <Card>
          {/* <div className="flex flex-col lg:w-[700px]"> */}
          <div className="flex flex-col">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
            </CardHeader>
            {/* <h1 className="text-3xl font-semibold py-4">Register</h1> */}
            <hr />

            <div className="" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 md:w-[700px]  min-w-[250px] mx-auto my-5"
              >
                <CardContent>
                  {/* <div className="flex gap-5 flex-col md:flex-row">
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
            </div> */}

                  <div className="flex gap-5 flex-col md:flex-row">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder=" " {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Register as</FormLabel>
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
                              <SelectItem value="company">Company</SelectItem>
                              <SelectItem value="buyer">Buyer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full py-6">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-5 flex-col md:flex-row">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            {/* <div className="flex w-full max-w-sm items-center space-x-2"> */}
                            <PasswordInput placeholder="" {...field} />
                            {/* <div>
                                <Eye />
                              </div>
                            </div> */}
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <PasswordInput placeholder=" " {...field} />
                          </FormControl>

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
          </div>
        </Card>

        {/* <div className="mx-10">
        <Image src="medicine.svg" alt="logo" width={600} height={600} />
      </div> */}
      </div>
    </>
  );
}
