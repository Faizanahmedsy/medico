import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="px-10 py-4">{children}</div>;
}
