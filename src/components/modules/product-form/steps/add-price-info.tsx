"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashHeader } from "../..";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addPriceForBuyerApi } from "@/services/product/product.api";
import useGlobalState from "@/store";
import { useRouter } from "next/navigation";

export default function AddPriceInfo({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();

  // State to hold the input values for each row
  const [prices, setPrices] = useState<Array<{ name: string; price: string }>>(
    []
  );

  const selectedBuyers = useGlobalState((state) => state.selectedBuyers);

  console.log("selectedBuyers", selectedBuyers);

  const addPriceForBuyerMutation = useMutation({
    mutationFn: addPriceForBuyerApi,
    onSuccess: (resp) => {
      console.log("addPriceForBuyerApi response", resp);
      // toast.success("Product added successfully");
    },
  });

  // // Handler to update the price for a specific row
  // const handlePriceChange = (index: number, value: string) => {
  //   setPrices((prevPrices) => {
  //     const newPrices = [...prevPrices];
  //     newPrices[index].price = value;
  //     return newPrices;
  //   });
  // };

  const [payload, setPayload] = useState<
    Array<{ buyerId: number; price: string }>
  >([]);

  const handlePriceChange = (index: number, value: string) => {
    console.log("foooo index", index);
    console.log("foooo value", value);

    setPayload((prevPayload) => {
      // Check if the payload already contains an entry for the current buyer ID
      const existingIndex = prevPayload.findIndex(
        (item) => item.buyerId === index
      );
      if (existingIndex !== -1) {
        // If the buyer ID exists, update the price
        const updatedPayload = [...prevPayload];
        updatedPayload[existingIndex].price = value;
        return updatedPayload;
      } else {
        // If the buyer ID doesn't exist, add a new entry
        return [...prevPayload, { buyerId: index, price: value }];
      }
    });

    // const payload = {
    //   buyerId: index,
    //   productId: 0,
    //   priceL: parseInt(value),
    // };

    // const newArr = [];
    // newArr.push(payload);

    // console.log("newArr", newArr);

    // alert("foooo");
    // setPrices((prevPrices) => {
    //   const newPrices = [...prevPrices];

    //   // Check if index is within bounds
    //   if (index >= 0 && index < newPrices.length) {
    //     newPrices[index].price = value;
    //   } else {
    //     console.error(`Index ${index} is out of bounds for prices array.`);
    //   }

    //   return newPrices;
    // });
  };

  // Handler to handle saving prices
  const handleSave = () => {
    // Here you can access prices array which contains the prices for each row
    console.log(prices);

    console.log("payload", payload);

    // const payload = [
    //   {
    //     buyerId: 0,
    //     productId: 0,
    //     priceL: 0,
    //   },
    // ];
    addPriceForBuyerMutation.mutate(payload);
    // Perform any other action, e.g., sending data to backend
    // Reset step or perform any other action as needed
    // setStep((prev) => prev + 1);

    //TODO move this to onSuccess of mutation
    // toast.success("Product added successfully");
    // router.push("/dashboard/product");
  };

  return (
    <div>
      <DashHeader
        title={"Add pricing"}
        button={
          <Button variant={"company"} onClick={handleSave}>
            SAVE
          </Button>
        }
      />
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-left">State</TableHead>
            <TableHead className="text-left">District</TableHead>
            <TableHead className="text-left">Taluka</TableHead>
            <TableHead className="text-left">Degree</TableHead>
            <TableHead className="text-left">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedBuyers.map((buyer, index) => (
            <TableRow key={buyer.id}>
              <TableCell className="font-medium">{buyer.name}</TableCell>
              <TableCell>{buyer.state}</TableCell>
              <TableCell>{buyer.district}</TableCell>
              <TableCell>{buyer.taluka}</TableCell>
              <TableCell>{buyer.degree}</TableCell>
              <TableCell className="text-left w-[200px]">
                <Input
                  value={buyer.price}
                  onChange={(e) => handlePriceChange(buyer.id, e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
