"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getItem } from "@/lib/localStorage";

function useAuthorization() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isComplete = getItem("medico-isComplete");
    setAuthorized(isComplete);

    if (!isComplete) {
      toast.error(
        "You are not authorized to access this page. Please register."
      );
      router.push("/register");
    }
  }, []);

  return authorized;
}
