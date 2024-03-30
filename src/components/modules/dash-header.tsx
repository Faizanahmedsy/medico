import React from "react";
import { TextH2 } from ".";

export default function DashHeader({
  title,
  button,
}: {
  title: string | React.ReactNode;
  button?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center pb-7 md:flex-row flex-col">
      <TextH2>{title}</TextH2>
      {button}
    </div>
  );
}
