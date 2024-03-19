"use client";
import React, { useState } from "react";
import { DashHeader } from "@/components/modules";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getGroupApi } from "@/services/group/group.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectExistingUser({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const groupQuery = useQuery({
    queryKey: ["getGroups"],
    queryFn: () =>
      getGroupApi({
        companyId: "1db330f2-3fbc-45fc-b102-60ed0343db02",
      }),
    retry: 1,
  });

  console.log("groupQuery", groupQuery);

  return (
    <>
      <DashHeader
        title="Select Existing Group"
        button={
          <Button
            variant={"company"}
            type="submit"
            onClick={() => {
              // router.push("/dashboard/product/add-product/where-to-show");
              if (step < 6) {
                setStep((prev) => prev + 1);
              }
            }}
          >
            SAVE
          </Button>
        }
      />

      {/* <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Buyers</TableHead>
              <TableHead className="text-right">Talukas</TableHead>
              <TableHead className="text-right">Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Group 1</TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aperiam iste eos numquam laborum rerum natus dolorem dolores
                illum id possimus!
              </TableCell>
              <TableCell>Jhon, James, Jaggu</TableCell>
              <TableCell className="text-right">
                Nakhatrana, Bhachau, Mundra
              </TableCell>
              <TableCell className="text-right">
                Amoxicillin, Amphetamine, Amphetamine
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}

      <div className="py-6">
        <Select
          onValueChange={(value) => {
            setSelectedGroup(value);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a existing group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <div>no data</div> */}
              {/* <SelectItem value="storeOwner">Medical Store Owner</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
