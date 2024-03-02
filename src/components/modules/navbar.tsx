import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="px-40">
      <nav className="flex items-center justify-between py-5 px-5 gap-2">
        <div className="font-bold text-3xl">Medico</div>

        <div className="flex items-center  gap-8">
          <Button variant={"outline"}>Login</Button>
          <Link href="/register">
            <Button variant={"outline"}>Register</Button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
