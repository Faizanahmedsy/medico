"use client";
import { getItem } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isCompleted = getItem("test-isCompleted") ? true : false;

    console.log("isCompleted", isCompleted);

    if (!isCompleted) {
      if (getItem("test-isVerified") === "true") {
        if (getItem("test-type") === "company") {
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

  return getItem("test-isCompleted") && <div>DashboardPage</div>;
}
