import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

export default function CardForm({
  title,
  content,
  className,
}: {
  title: string;
  content: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </div>
  );
}
