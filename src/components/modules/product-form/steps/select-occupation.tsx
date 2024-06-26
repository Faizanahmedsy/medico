"use client";
import React, { useState } from "react";
import { DashHeader } from "@/components/modules";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getItem } from "@/lib/localStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addOccupationApi } from "@/services/product/product.api";
import useGlobalState from "@/store";

export default function SelectOccupation({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const setBuyerList = useGlobalState((state) => state.setBuyerList);
  const [selectedOccupation, setSelectedOccupation] = useState<string>("");

  const [selectedDegree, setSelectedDegree] = useState<string>("");

  const addOccupationMutation = useMutation({
    mutationFn: addOccupationApi,
    onSuccess: (data: any) => {
      // setStep((prev) => prev + 1);
      console.log("addOccupationApi", data);

      setBuyerList(data);
    },
  });

  // setStep((prev) => prev + 1); //TODO: remove this line

  const handleSave = () => {
    const payload: any = {
      groupId: getItem("medico-groupId"),
      payload: {
        occupations: [selectedOccupation],
      },
    };

    if (selectedOccupation === "doctor") {
      payload.payload.degrees = [selectedDegree];
    }

    addOccupationMutation.mutate(payload);
    setStep((prev) => prev + 1);
  };

  return (
    <div>
      <DashHeader
        title={"Occupation"}
        button={
          <Button variant={"company"} onClick={handleSave}>
            SAVE AND CONTINUE
          </Button>
        }
      />

      <div className="flex justify-center items-center gap-6">
        <div className="py-6">
          <Select
            onValueChange={(value) => {
              setSelectedOccupation(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a occupation" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="storeOwner">Medical Store Owner</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {selectedOccupation === "doctor" && (
          <div>
            <Select
              onValueChange={(value) => {
                setSelectedDegree(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ms">Master of Surgery </SelectItem>
                  <SelectItem value="dm">Doctor of Medicine</SelectItem>
                  <SelectItem value="mbbs">
                    Bachelor of Medicine, Bachelor of Surgery
                  </SelectItem>

                  <SelectItem value="bds">
                    Bachelor of Dental Surgery
                  </SelectItem>

                  <SelectItem value="bhms">
                    Bachelor of Homeopathy Medicine and Surgery
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
