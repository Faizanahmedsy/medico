import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="px-40">
      <nav className="flex items-center justify-between py-5 px-5 gap-2">
        <div>Super Pharma</div>

        <div className="flex items-center  gap-8">
          <Button variant={"outline"}>Login</Button>
          <Button variant={"outline"}>Register</Button>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
