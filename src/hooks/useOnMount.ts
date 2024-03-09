import React, { useEffect } from "react";

export default function useOnMount({ onMount }: { onMount: () => void }) {
  return useEffect(() => {
    onMount();
  }, []);
}
