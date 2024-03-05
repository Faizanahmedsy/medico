import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import TanstackProvider from "@/components/tanstack-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TanstackProvider>
  );
}
