import { cn } from "@/lib/utils";
import React from "react";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-10 py-4", className)}>{children}</div>;
}
