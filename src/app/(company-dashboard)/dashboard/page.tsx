"use client";
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

  // useEffect(() => {
  //   let token = getItem("medico_access_token");

  //   if (!token) {
  //     toast("Please login to continue");
  //     router.push("/login");
  //   }

  //   const decodedToken: any = jwtDecode(token);

  //   console.log("dashboard redirect decodedToken", decodedToken);

  //   if (decodedToken?.isCompleted === "False") {
  //     toast("Please complete your profile");
  //     if (decodedToken?.type === "company") {
  //       router.push("/register/as-company");
  //     }
  //     if (decodedToken?.type === "buyer") {
  //       router.push("/register/as-buyer");
  //     }
  //   }
  // }, []);

  return <div>DashboardPage</div>;
}
