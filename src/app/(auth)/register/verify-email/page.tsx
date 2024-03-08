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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleOtpSubmit = () => {
    console.log("Otp submitted");

    const type = getItem("test-type");

    if (otp !== "1001") return toast.error("Invalid OTP");

    if (otp === "1001") {
      toast.success("OTP Verified");
      setItem("test-isVerified", "true");
    }

    if (type === "company") {
      router.push("/register/as-company");
    }

    if (type === "buyer") {
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

        {/* Otp linout  */}
      </div>
    </div>
  );
}
