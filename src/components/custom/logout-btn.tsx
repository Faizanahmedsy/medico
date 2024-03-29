"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getItem } from "@/lib/localStorage";

export default function LogoutButton() {
  const [auth, setAuth] = useState(false);

  const token = getItem("medico_access_token");

  console.log("myyyyyyyy token", token);

  useEffect(() => {
    if (token) {
      setAuth(true);
    }
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("You have been logged out successfully");
    sessionStorage.clear();
    router.push("/login");
  };

  if (!auth) return null;

  return (
    <>
      <Button variant={"outline"} onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </>
  );
}
