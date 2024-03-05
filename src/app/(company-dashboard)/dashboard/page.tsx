"use client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const data = { isComplete: true };
  if (!data?.isComplete) router.push("/register/as-company");

  return <div>DashboardPage</div>;
}
