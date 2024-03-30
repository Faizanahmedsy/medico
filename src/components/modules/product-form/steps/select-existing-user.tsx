"use client";
import React, { useEffect, useState } from "react";
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
import { any } from "zod";
import { getItem } from "@/lib/localStorage";

export default function SelectExistingUser({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const [groupData, setGroupData] = useState<any[]>([]);

  const groupQuery = useQuery({
    queryKey: ["getGroups"],
    queryFn: () =>
      getGroupApi({
        companyId: getItem("medico-companyId"),
      }),
    retry: 1,
  });

  console.log("groupQuery DATA", groupQuery.data);

  // useEffect(() => {
  //   if (groupQuery.data) {
  //     setGroupData(groupQuery.data);
  //   }
  // }, [groupQuery.data]);

  useEffect(() => {
    setGroupData([
      {
        id: "1",
        name: "Group 1",
        description: "Medical Store Owner",
        buyers: "Jhon, James, Jaggu",
        talukas: "Nakhatrana, Bhachau, Mundra",
        products: "Amoxicillin, Amphetamine, Amphetamine",
      },
      {
        id: "2",
        name: "Group 2",
        description: "Medical Store Owner",
        buyers: "Jhon, James, Jaggu",
        talukas: "Nakhatrana, Bhachau, Mundra",
        products: "Amoxicillin, Amphetamine, Amphetamine",
      },
      {
        id: "3",
        name: "Group 3",
        description: "Medical Store Owner",
        buyers: "Jhon, James, Jaggu",
        talukas: "Nakhatrana, Bhachau, Mundra",
        products: "Amoxicillin, Amphetamine, Amphetamine",
      },
      {
        id: "4",
        name: "Group 4",
        description: "Medical Store Owner",
        buyers: "Jhon, James, Jaggu",
        talukas: "Nakhatrana, Bhachau, Mundra",
        products: "Amoxicillin, Amphetamine, Amphetamine",
      },
      {
        id: "5",
        name: "Group 5",
        description: "Medical Store Owner",
        buyers: "Jhon, James, Jaggu",
        talukas: "Nakhatrana, Bhachau, Mundra",
        products: "Amoxicillin, Amphetamine, Amphetamine",
      },
      {
        id: "6",
        name: "Group 6",
        description: "Medical Store Owner",
        buyers: "Jhon, James, Jaggu",
        talukas: "Nakhatrana, Bhachau, Mundra",
        products: "Amoxicillin, Amphetamine, Amphetamine",
      },
      {
        id: "7",
        name: "Group 7",
        description: "Medical Store Owner",
        buyers: "Jhon, James, Jaggu",
        talukas: "Nakhatrana, Bhachau, Mundra",
        products: "Amoxicillin, Amphetamine, Amphetamine",
      },
    ]);
  }, []);

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
              {/* {groupData.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))} */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {selectedGroup && (
        <div className="py-6">
          <GroupDetails selectedGroup={selectedGroup} groupData={groupData} />
        </div>
      )}
    </>
  );
}

const GroupDetails = ({
  groupData,
  selectedGroup,
}: {
  groupData: any;
  selectedGroup: any;
}) => (
  <>
    {groupData
      .filter((group: any) => group.id === selectedGroup)
      .map((group: any) => (
        <div key={group.id} className="border-2 rounded-md p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">{group.name}</div>
            <div className="text-[#7D7D7D]">Medical Store Owner</div>
          </div>
          <div className="text-[#7D7D7D]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
            iste eos numquam laborum rerum natus dolorem dolores illum id
            possimus!
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium">Buyers</div>
            <div className="text-[#7D7D7D]">{group.buyers}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium">Talukas</div>
            <div className="text-[#7D7D7D]">{group.talukas}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium">Products</div>
            <div className="text-[#7D7D7D]">{group.products}</div>
          </div>
        </div>
      ))}
  </>
);
