import { DashboardNav } from "./dashboard-nav";
import { buyerNavItems, companyNavItems } from "@/constants/data";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const role = "company" as "company" | "buyer";

  return (
    <nav className={cn(`relative hidden border-r pt-16 md:block w-72`)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            {role === "company" && <DashboardNav items={companyNavItems} />}
            {role === "buyer" && <DashboardNav items={buyerNavItems} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
