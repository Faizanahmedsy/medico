import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
      <p>This is only for test</p>
      {/* <Button></Button> */}
    </div>
  );
}
