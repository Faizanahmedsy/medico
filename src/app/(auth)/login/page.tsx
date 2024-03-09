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
import { loginSchema, registrationSchema } from "@/schema/auth-schema";
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
import { loginApi, signUpApi } from "@/services/auth/auth.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { getItem } from "@/lib/localStorage";
import { jwtDecode } from "jwt-decode";
import { extractRoleFromToken } from "@/lib/helpers";

export default function LoginShopPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const loginInMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: any) => {
      console.log("data", data);

      // Or get token from api
      let token = getItem("medico_access_token");

      let decodedToken: any = jwtDecode(token);

      const userRole = extractRoleFromToken(decodedToken);

      console.log("login time decodedToken", decodedToken);

      if (
        decodedToken?.isEmailVerified === "True" &&
        decodedToken?.isCompleted === "True" &&
        decodedToken?.isVerified === "True"
      ) {
        router.push("/dashboard");
      }

      // if (
      //   decodedToken?.isEmailVerified === "True" &&
      //   decodedToken?.isVerified === "False"
      // ) {
      //   toast("Please wait for admin to verify your account");
      // }

      if (
        decodedToken?.isCompleted === "False" &&
        decodedToken?.isEmailVerified === "True"
      ) {
        toast("Please complete your profile");
        if (userRole === "Company") {
          router.push("/register/as-company");
        }
        if (userRole === "Buyer") {
          router.push("/register/as-buyer");
        }
      }

      if (decodedToken?.isEmailVerified === "False") {
        toast("Please verify your email");
        router.push("/register/verify-email");
      }

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

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log("Login Payload", data);

    loginInMutation.mutate(data);

    //TODO: PUSH ALL THE BELOW LOGIC TO A ON SUCCESS MUTATION

    // let token = getItem("medico_access_token");

    // let decodedToken: any = jwtDecode(token);

    // const userRole = extractRoleFromToken(decodedToken);

    // console.log("login time decodedToken", decodedToken);

    // TEST-------------------------------------------------------------------------------

    // const decodedToken = {
    //   isEmailVerified: "True",
    //   isCompleted: "True",
    //   isVerified: "False",
    // };

    // const userRole: any = "Buyer";

    // if (
    //   decodedToken?.isEmailVerified === "True" &&
    //   decodedToken?.isCompleted === "True" &&
    //   decodedToken?.isVerified === "True"
    // ) {
    //   router.push("/dashboard");
    // }

    // // if (
    // //   decodedToken?.isEmailVerified === "True" &&
    // //   decodedToken?.isVerified === "False"
    // // ) {
    // //   toast("Please wait for admin to verify your account");
    // // }

    // if (
    //   decodedToken?.isCompleted === "False" &&
    //   decodedToken?.isEmailVerified === "True"
    // ) {
    //   toast("Please complete your profile");
    //   if (userRole === "Company") {
    //     router.push("/register/as-company");
    //   }
    //   if (userRole === "Buyer") {
    //     router.push("/register/as-buyer");
    //   }
    // }

    // if (decodedToken?.isEmailVerified === "False") {
    //   toast("Please verify your email");
    //   router.push("/register/verify-email");
    // }

    // -------------------------------------------------------------------------------TEST

    // if (
    //   decodedToken?.isCompleted === "False" &&
    //   decodedToken?.isEmailVerified === "True"
    // ) {
    //   toast("Please complete your profile");
    //   if (userRole === "Company") {
    //     router.push("/register/as-company");
    //   }
    //   if (userRole === "Buyer") {
    //     router.push("/register/as-buyer");
    //   }
    // }

    // if (
    //   decodedToken?.isEmailVerified === "True" &&
    //   decodedToken?.isCompleted === "True" &&
    //   decodedToken?.isVerified === "True"
    // ) {
    //   router.push("/dashboard");
    // }

    // if (
    //   decodedToken?.isEmailVerified === "False" &&
    //   decodedToken?.isCompleted === "False"
    // ) {
    //   toast("Please verify your email");
    //   router.push("/register/verify-email");
    // }

    // if (!getItem("test-isCompleted")) {
    //   toast("Please complete your profile");
    //   if (getItem("test-type") == "company") {
    //     router.push("/register/as-company");
    //   }
    //   if (getItem("test-type") == "buyer") {
    //     router.push("/register/as-buyer");
    //   }
    // }

    // if (getItem("test-isVerified") == "true") {
    //   router.push("/dashboard");
    // }

    // if (!getItem("test-isVerified")) {
    //   toast("Please verify your email");
    //   router.push("/register/verify-email");
    // }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card>
          {/* <div className="flex flex-col lg:w-[700px]"> */}
          <div className="flex flex-col">
            <CardHeader>
              <CardTitle>Login</CardTitle>
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
                className=" md:w-[700px]  min-w-[250px] mx-auto my-5"
              >
                <CardContent>
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
                  </div>
                  <Link href="/register">
                    <div className="mt-5  text-sm text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <span className="text-blue-500"> Sign Up </span>{" "}
                    </div>
                  </Link>
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
