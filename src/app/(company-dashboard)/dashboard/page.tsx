"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const data = { isComplete: localStorage.getItem("test-isCompleted") };
  if (!data?.isComplete) router.push("/register/as-company");

  useEffect(() => {
    const isCompleted = localStorage.getItem("test-isCompleted") ? true : false;

    console.log("isCompleted", isCompleted);

    if (!isCompleted) {
      if (localStorage.getItem("test-isVerified") === "true") {
        if (localStorage.getItem("test-type") === "company") {
          router.push("/register/as-company");
        } else {
          router.push("/register/as-buyer");
        }
      } else {
        toast("Please verify your email");
        router.push("/register");
      }
    }
  }, []);

  return localStorage.getItem("test-isCompleted") && <div>DashboardPage</div>;
}
