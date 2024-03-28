"use client";
import { Wrapper } from "@/components/custom";
import useOnMount from "@/hooks/useOnMount";
import { extractRoleFromToken } from "@/lib/helpers";
import { getItem } from "@/lib/localStorage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// interface decodedToken extends jwtDecode {
//   isComplete?: string;
//   type?: string;
// }

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   const isComplete = getItem("test-isComplete") ? true : false;

  //   console.log("isComplete", isComplete);

  //   if (!isComplete) {
  //     if (getItem("test-isVerified") === "true") {
  //       if (getItem("test-type") === "company") {
  //         router.push("/register/as-company");
  //       } else {
  //         router.push("/register/as-buyer");
  //       }
  //     } else {
  //       toast("Please verify your email");
  //       router.push("/register");
  //     }
  //   }
  // }, []);

  // TODO: ENABLE THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

  // useEffect(() => {
  //   let token = getItem("medico_access_token");

  //   if (!token) {
  //     toast("Please login to continue");
  //     router.push("/login");
  //   }

  //   const decodedToken: any = jwtDecode(token);

  //   const userRole = extractRoleFromToken(decodedToken);

  //   console.log("dashboard redirect decodedToken", decodedToken);

  //   if (decodedToken?.isEmailVerified === "False") {
  //   }

  //   if (
  //     decodedToken?.isEmailVerified === "True" &&
  //     decodedToken?.isComplete === "False"
  //   ) {
  //     toast("Please complete your profile");
  //     if (userRole === "Company") {
  //       router.push("/register/as-company");
  //     }
  //     if (userRole === "Buyer") {
  //       router.push("/register/as-buyer");
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   const isComplete: any = getItem("medico-isComplete");

  //   if (!isComplete)) {
  //     router.push("/register");
  //   }
  // }, []);

  let isComplete: any;
  if (isMounted) {
    isComplete = getItem("medico-isComplete");
  }

  console.log("isComplete", isComplete);

  // useEffect(() => {
  //   // const isComplete: any = getItem("medico-isComplete");

  //   setIsMounted(true);

  //   if (!isComplete) {
  //     toast("You are not authorized to access this page. Please register.");
  //     router.push("/register");
  //   }
  // }, []);

  return <Wrapper>DashboardPage</Wrapper>;
}
