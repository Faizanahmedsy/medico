import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CardForm({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </div>
  );
}
