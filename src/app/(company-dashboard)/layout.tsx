"use client";
import React, { useEffect, useState } from "react";
import { Header, Sidebar } from "@/components/layout";
import { useRouter } from "next/navigation";
import { getItem } from "@/lib/localStorage";
import { toast } from "sonner";
import { useAuthorization } from "@/hooks/useAuthorization";
import { useSuperAuth } from "@/hooks/useSuperAuth";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  // const authorized = useAuthorization();

  // console.log("dashboard time token", token);

  const handleAuth = useSuperAuth();

  // useEffect(() => {}, []);

  return (
    <>
      {/* {authorized && ( */}
      <>
        <Header />
        <div className="flex overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16 min-h-screen">{children}</main>
        </div>
      </>
      {/* )} */}
    </>
  );
}
