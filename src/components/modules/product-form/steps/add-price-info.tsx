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

export default function AddPriceInfo({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  // State to hold the input values for each row
  const [prices, setPrices] = useState<Array<{ name: string; price: string }>>([
    { name: "Example", price: "" },
    { name: "Example 2", price: "" },
  ]);

  // Handler to update the price for a specific row
  const handlePriceChange = (index: number, value: string) => {
    setPrices((prevPrices) => {
      const newPrices = [...prevPrices];
      newPrices[index].price = value;
      return newPrices;
    });
  };

  // Handler to handle saving prices
  const handleSave = () => {
    // Here you can access prices array which contains the prices for each row
    console.log(prices);
    // Perform any other action, e.g., sending data to backend
    // Reset step or perform any other action as needed
    // setStep((prev) => prev + 1);
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
          {prices.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>Gujarat</TableCell>
              <TableCell>Ahmedabad</TableCell>
              <TableCell>Ahmedabad</TableCell>
              <TableCell>MBBS</TableCell>
              <TableCell className="text-left w-[200px]">
                <Input
                  value={row.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
