"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddProductBtn() {
  const router = useRouter();

  return (
    <Button
      variant={"default"}
      onClick={() => router.push("/dashboard/product/add-product")}
    >
      {" "}
      Add Product
    </Button>
  );
}
