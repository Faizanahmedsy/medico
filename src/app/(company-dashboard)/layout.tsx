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
  const router = useRouter();

  let isComplete: any;
  if (isMounted) {
    isComplete = getItem("medico-isComplete");
  }

  useEffect(() => {
    // const isComplete: any = getItem("medico-isComplete");

    setIsMounted(true);

    if (!isComplete) {
      toast("You are not authorized to access this page. Please register.");
      router.push("/register");
    }
  }, []);

  if (!isComplete) return null;

  return (
    <>
      {isComplete && (
        <>
          <Header />
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="w-full pt-16">{children}</main>
          </div>
        </>
      )}
    </>
  );
}
