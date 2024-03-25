"use client";
import React, { useEffect, useState } from "react";
import { Header, Sidebar } from "@/components/layout";
import { useRouter } from "next/navigation";
import { getItem } from "@/lib/localStorage";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isMounted, setIsMounted] = useState(false);

  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  let isComplete: any;
  if (isMounted) {
    isComplete = getItem("medico-isComplete");
  }

  useEffect(() => {
    const isComplete: any = getItem("medico-isComplete");

    setAuthorized(isComplete);

    // setIsMounted(true);

    console.log("isComplete", isComplete);

    if (!isComplete) {
      toast("You are not authorized to access this page. Please register.");
      router.push("/register");
    }
  }, []);

  return (
    <>
      {authorized && (
        <>
          <Header />
          <div className="flex overflow-hidden">
            <Sidebar />
            <main className="w-full pt-16 min-h-screen">{children}</main>
          </div>
        </>
      )}
    </>
  );
}
