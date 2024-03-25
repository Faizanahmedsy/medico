"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("You have been logged out successfully");
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <>
      <Button variant={"outline"} onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </>
  );
}
