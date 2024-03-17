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
    <div className="flex-between pb-7">
      <TextH2>{title}</TextH2>
      {button && button}
    </div>
  );
}
