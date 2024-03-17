"use client";
import { useEffect } from "react";

export default function useOnMount(onMount: () => void) {
  useEffect(() => {
    onMount();
  }, []);
}
