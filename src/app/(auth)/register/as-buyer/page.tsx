"use client";
import React, { useEffect, useState } from "react";
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
  SelectGroup,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getItem, setItem } from "@/lib/localStorage";
import { jwtDecode } from "jwt-decode";
import { extractRoleFromToken } from "@/lib/helpers";
import {
  getDistrictsByStateApi,
  getStatesApi,
  getTalukasByDistrictApi,
} from "@/services/location/location.api";
import dynamic from "next/dynamic";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LogoutButton } from "@/components/custom";

interface BuyerPayload {
  firstName: string;
  lastName: string;
  emailAddress: string;
  occupation: string;
  degree?: string;
  address: {
    state: string;
    district: string;
    taluka: string;
  };
  talukaId: string;
}

function RegisterAsBuyerPage() {
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
      console.log("test-token registerAsBuyerApi resp", resp);

      // setItem("medico_access_token", resp?.data?.accessToken);

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
    // alert("submit");
    let payload: BuyerPayload = {
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
      talukaId: data.taluka,
    };

    if (data.occupation === "doctor") {
      payload = {
        ...payload,
        degree: data.degree,
      };
    }

    console.log("payload", payload);

    registerAsBuyerMutation.mutate(payload);
  }

  const [stateArr, setStateArr] = useState<any>([]);

  const getStatesQuery = useQuery({
    queryKey: ["states"],
    queryFn: getStatesApi,
    retry: 1,
  });
  console.log("getStatesQuery.data", getStatesQuery.data);
  useEffect(() => {
    if (getStatesQuery.isFetched) {
      setStateArr(getStatesQuery.data);
    }
  }, [getStatesQuery.isFetched]);

  console.log("getStatesQuery", getStatesQuery);

  const [districtsArr, setDistrictsArr] = useState<any>([]);

  const getDistrictsByStateMutation = useMutation({
    mutationFn: getDistrictsByStateApi,
    onSuccess: (data) => {
      console.log("getDistrictsByStateMutation data", data);

      setDistrictsArr(data);
    },
  });

  console.log("getDistrictsByStateMutation", getDistrictsByStateMutation);

  const [talukaArr, setTalukaArr] = useState<any>([]);

  const getTalukaByDistrictsMutation = useMutation({
    mutationFn: getTalukasByDistrictApi,
    onSuccess: (data) => {
      console.log("getTalukaByDistrictsMutation data", data);

      setTalukaArr(data);
    },
  });

  console.log("getTalukaByDistrictsMutation", getTalukaByDistrictsMutation);

  useEffect(() => {
    const email = getItem("test-email");
    if (email) {
      form.setValue("emailAddress", email);
    }
  }, []);

  const token: any = getItem("medico_access_token");

  if (typeof token !== "string") {
    console.error("Invalid token: not a string");
    // Handle the error appropriately
    return;
  }

  const decodedToken: any = jwtDecode(token);

  const userRole = extractRoleFromToken(decodedToken);

  console.log("debug decodedToken", decodedToken);

  console.log("debug userRole", userRole);

  //   if(decodedToken?.http://schemas.microsoft.com/ws/2008/06/identity/claims/role === "company") {

  // }
  //Todo: enable this
  if (userRole === "Company") {
    toast.error("You are not authorized to access this page");
    router.push("/register/as-company");

    return;
  }

  return (
    <>
      <LogoutButton />

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
                        <Select
                          onValueChange={(newValue) => {
                            field.onChange(newValue);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="storeOwner">
                                Medical Store Owner
                              </SelectItem>
                              <SelectItem value="doctor">Doctor</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("occupation") === "doctor" && (
                    <FormField
                      control={form.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Degree</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            // defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Degree" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* <SelectGroup> */}
                              <SelectItem value="ms">
                                Master of Surgery{" "}
                              </SelectItem>
                              <SelectItem value="dm">
                                Doctor of Medicine
                              </SelectItem>
                              <SelectItem value="mbbs">
                                Bachelor of Medicine, Bachelor of Surgery
                              </SelectItem>

                              <SelectItem value="bds">
                                Bachelor of Dental Surgery
                              </SelectItem>

                              <SelectItem value="bhms">
                                Bachelor of Homeopathy Medicine and Surgery
                              </SelectItem>
                              {/* </SelectGroup> */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>State</FormLabel>
                        <Select
                          onValueChange={(newValue) => {
                            getDistrictsByStateMutation.mutate({
                              stateIds: [newValue],
                            });

                            field.onChange(newValue);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stateArr.map((item: any) => (
                              <SelectItem
                                value={item?.id.toString()}
                                key={item?.id}
                              >
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <Select
                          onValueChange={(newValue) => {
                            getTalukaByDistrictsMutation.mutate({
                              districtIds: [newValue],
                            });

                            field.onChange(newValue);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a district" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {districtsArr.map((item: any) => (
                              <SelectItem
                                value={item?.id.toString()}
                                key={item?.id}
                              >
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                          onValueChange={(newValue) => {
                            field.onChange(newValue);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a taluka" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {talukaArr.map((item: any) => (
                              <SelectItem
                                value={item?.id.toString()}
                                key={item?.id}
                              >
                                {item?.name}
                              </SelectItem>
                            ))}
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
                  disabled={registerAsBuyerMutation.isPending}
                >
                  {registerAsBuyerMutation.isPending && (
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
export default dynamic(() => Promise.resolve(RegisterAsBuyerPage), {
  ssr: false,
});
