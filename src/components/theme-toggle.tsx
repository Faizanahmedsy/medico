"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Switch } from "./ui/switch";
import { setItem } from "@/lib/localStorage";
import useGlobalState from "@/store";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [checked, setChecked] = useState(true);

  const toggleTheme = useGlobalState((state) => state.toggleTheme);

  useEffect(() => {
    // ENABLE THIS IF YOU WANT TO USE SYSTEM THEME AS DEFAULT

    const checkTheSystemThemeIsDark =
      document.documentElement.classList.contains("dark");

    if (checkTheSystemThemeIsDark) {
      setChecked(true);
      setIsThemeDark(true);
    } else {
      setIsThemeDark(false);
      setChecked(false);
    }

    // //THEME SHOULD BE DARK BY DEFAULT
    // setTheme("dark");
    // setChecked(true);
  }, []);

  return (
    <div className="flex justify-center">
      <Switch
        aria-readonly
        checked={checked}
        onCheckedChange={(e) => {
          toggleTheme();
          if (e) {
            setTheme("dark");
            setChecked(true);
          } else {
            setTheme("light");
            setChecked(false);

            setItem("theme", "light");
          }
        }}
      />
    </div>
  );
}
