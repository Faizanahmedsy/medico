import React from "react";
import { ThemeToggle } from "../theme-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-around py-5">
      <div>Road Craft</div>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
}
