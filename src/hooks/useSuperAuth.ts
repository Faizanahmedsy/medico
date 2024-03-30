"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getItem } from "@/lib/localStorage";
import { superTokenFormatter } from "@/lib/helpers";

export function useSuperAuth() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getItem("medico_access_token");

    if (!token) {
      toast.error(
        "You are not authorized to access this page. Please register."
      );
      router.push("/register");
    }

    if (token) {
      const formattedToken = superTokenFormatter(token);

      console.log("formattedToken", formattedToken);

      if (formattedToken?.role != "Company") {
        toast.error(
          "You are not authorized to access this page. Please register."
        );
        router.push("/register");
      }

      if (formattedToken?.isComplete != "True") {
        toast.error(
          "You are not authorized to access this page. Please register."
        );
        router.push("/register");
      }

      // if (formattedToken?.isEmailVerified != "True") {
      //   toast.error("Your email is not verified, please verify");
      //   router.push("/login");
      // }

      // if (formattedToken?.isVerified != "True") {
      //   toast.error("You are not verified by the admin.");
      //   router.push("/register");
      // }
    }
  }, []);

  return authorized;
}
