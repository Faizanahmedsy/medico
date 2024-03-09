"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getItem, setItem } from "@/lib/localStorage";
import {
  checkIsEmailVerifiedApi,
  verifyOtpApi,
} from "@/services/auth/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { verify } from "crypto";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
      console.log("verifyOtpMutation data", data);
    },
    onError: (error) => {
      console.log("verifyOtpMutation error", error);
    },
  });

  const checkIsEmailVerifiedQuery = useQuery({
    queryKey: ["checkIsEmailVerified"],
    queryFn: checkIsEmailVerifiedApi,
  });

  const handleOtpSubmit = () => {
    if (!otp) return toast.error("Please enter OTP");
    // verifyOtpMutation.mutate({
    //   otp: otp,
    // });

    console.log("is veridied", checkIsEmailVerifiedQuery.data);

    const type = getItem("test-type");

    if (otp !== "1001") return toast.error("Invalid OTP");

    if (otp === "1001") {
      toast.success("OTP Verified");
      setItem("test-isVerified", "true");
    }

    const token: any = getItem("medico_access_token");

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
      router.push("/register/as-company");
    }

    if (userRole === "Buyer") {
      router.push("/register/as-buyer");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Card className="min-w-[400px]">
          <CardHeader>
            <CardTitle>Verify Email</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter OTP"
              value={otp}
              type="number"
              onChange={(e) => setOtp(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleOtpSubmit}>
              Verify
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
