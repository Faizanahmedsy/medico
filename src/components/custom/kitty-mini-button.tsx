import React from "react";

export default function KittyMiniButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className: string;
}) {
  return (
    <div
      className="rounded-xl text-xs p-1 px-2 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
