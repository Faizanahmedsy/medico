"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { registrationSchema } from "@/schema/auth-schema";
import { signUpApi } from "@/services/auth/auth.api";
import { setItem } from "@/lib/localStorage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LogoutButton } from "@/components/custom";

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
      console.log("signUpMutation onSucces data", data);

      // if (data?.accessToken) {
      //   toast.success("Account created successfully");
      // }

      console.log("signUpMutation token", data?.accessToken);

      const decodeedToken: any = jwtDecode(data?.accessToken);

      console.log("signUpMutation decodeedToken", decodeedToken);

      setItem("medico_access_token", data?.accessToken);

      console.log(
        "decodeedToken?.isEmailVerified",
        decodeedToken?.isEmailVerified
      );

      if (decodeedToken?.isEmailVerified === "False") {
        toast.success("Please check your email to verify your account");
        router.push("/register/verify-email");
      }

      // if (data.type === "company") {
      //   router.push("register/as-company");
      // } else {
      //   router.push("register/as-buyer");
      // }
    },
    onError: (error: any) => {
      console.log("signUpMutation error", error);

      if (error?.response?.status) {
        if (error?.response?.status === 409) {
          toast.error("Email already exists");
        }
      }
      // toast.error("An error occurred");
    },
  });

  console.log("signUpMutation", signUpMutation);

  function onSubmit(data: z.infer<typeof registrationSchema>) {
    console.log(data);

    setItem("test-email", data.email);

    setItem("test-type", data.type);

    const payload: {
      email: string;
      type?: string;
      role: string;
    } = {
      ...data,
      role: "",
    };
    if (data.type === "company") {
      payload.role = "Company";
    }

    if (data.type === "buyer") {
      payload.role = "Buyer";
    }

    delete payload.type;
    signUpMutation.mutate(payload);

    // router.push("/register/verify-email");

    // if (data.type === "company") {
    //   router.push("register/as-company");
    // } else {
    //   router.push("register/as-buyer");
    // }
  }

  return (
    <>
      <LogoutButton />
      <div className="flex justify-center items-center h-screen">
        <Card>
          <div className="flex flex-col">
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <hr />

            <div className="" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 md:w-[700px]  min-w-[250px] mx-auto my-5"
              >
                <CardContent>
                  <div className="flex gap-5 flex-col md:flex-row">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="exampleuser" {...field} />
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
                            <PasswordInput placeholder="" {...field} />
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
                    disabled={signUpMutation.isPending}
                  >
                    {signUpMutation.isPending && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
}
