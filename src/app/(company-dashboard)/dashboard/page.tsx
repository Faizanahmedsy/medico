"use client";
import useOnMount from "@/hooks/useOnMount";
import { extractRoleFromToken } from "@/lib/helpers";
import { getItem } from "@/lib/localStorage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

// interface decodedToken extends jwtDecode {
//   isCompleted?: string;
//   type?: string;
// }

export default function DashboardPage() {
  const router = useRouter();

  // useEffect(() => {
  //   const isCompleted = getItem("test-isCompleted") ? true : false;

  //   console.log("isCompleted", isCompleted);

  //   if (!isCompleted) {
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
  //     decodedToken?.isCompleted === "False"
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

  return <div>DashboardPage</div>;
}
