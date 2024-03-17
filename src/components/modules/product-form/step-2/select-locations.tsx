"use client";
import React, { useEffect, useState } from "react";
import { DashHeader } from "@/components/modules";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGlobalState from "@/store";
import useOnMount from "@/hooks/useOnMount";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDistrictsByStateApi,
  getStatesApi,
  getTalukasByDistrictApi,
} from "@/services/location/location.api";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

export default function SelectLocations({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const selectedTalukas = useGlobalState((state) => state.selectedTalukas);
  const setSelectedTalukas = useGlobalState(
    (state) => state.setSelectedTalukas
  );

  const [taluka, setTaluka] = useState<any>();

  const [districtsArr, setDistrictsArr] = useState<any>();
  const [talukaArr, setTalukaArr] = useState<any>();

  const getStatesQuery = useQuery({
    queryKey: ["states"],
    queryFn: getStatesApi,
    retry: 1,
  });

  console.log("getStatesQuery", getStatesQuery);

  const getDistrictsByStateMutation = useMutation({
    mutationFn: getDistrictsByStateApi,
    onSuccess: (data) => {
      console.log("getDistrictsByStateMutation data", data);

      setDistrictsArr(data);
    },
  });

  console.log("getDistrictsByStateMutation", getDistrictsByStateMutation);

  const getTalukaByDistrictsMutation = useMutation({
    mutationFn: getTalukasByDistrictApi,
    onSuccess: (data) => {
      console.log("getTalukaByDistrictsMutation data", data);

      setTalukaArr(data);
    },
  });

  console.log("getTalukaByDistrictsMutation", getTalukaByDistrictsMutation);

  useEffect(() => {
    setTaluka([
      { id: 1, name: "Taluka 1" },
      { id: 2, name: "Taluka 2" },
      { id: 3, name: "Taluka 3" },
      { id: 4, name: "Taluka 4" },
      { id: 5, name: "Taluka 5" },
      { id: 6, name: "Taluka 6" },
      { id: 7, name: "Taluka 7" },
      { id: 8, name: "Taluka 8" },
      { id: 9, name: "Taluka 9" },
      { id: 10, name: "Taluka 10" },
    ]);
  }, []);

  const removeTalukaFromOptions = (id: number) => {
    setTaluka((prev: any) => prev.filter((t: any) => t.id !== id));
  };

  return (
    <>
      <DashHeader
        title="Select Locations"
        button={
          <Button
            variant={"company"}
            type="submit"
            onClick={() => {
              if (step < 6) {
                setStep((prev) => prev + 1);
              }
            }}
          >
            SAVE
          </Button>
        }
      />

      {/* <div
        onClick={() =>
          getDistrictsByStateMutation.mutate({
            stateIds: [1],
          })
        }
      >
        Test
      </div>

      <div
        onClick={() =>
          getTalukaByDistrictsMutation.mutate({
            districtIds: [1],
          })
        }
      >
        Test
      </div> */}

      <div className="py-4 flex gap-1 flex-col ">
        <div>Group Name</div>
        <Input placeholder="Search" className="w-[300px]" />
      </div>

      <div className="flex gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Select State</div>
                <div className="rounded-xl text-xs p-1 px-2 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight">
                  Save
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>
                  {getStatesQuery.isFetched &&
                    getStatesQuery.data.length > 0 &&
                    getStatesQuery.data.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedTalukas(t);
                          removeTalukaFromOptions(t.id);

                          getDistrictsByStateMutation.mutate({
                            stateIds: [t.id],
                          });
                        }}
                        className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                      >
                        {t.name}
                      </div>
                    ))}
                </div>
              </ScrollArea>
              <div>
                <div>
                  <ScrollArea className="h-72">
                    <div className="space-y-2">
                      <div className="font-bold">Selected</div>
                      {selectedTalukas.map((t: any) => (
                        <div
                          key={t.id}
                          className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                        >
                          {t.name}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Select District</div>
                <div className="rounded-xl text-xs p-1 px-2 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight">
                  Save
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>

                  {getDistrictsByStateMutation.isSuccess &&
                    districtsArr.length > 0 &&
                    districtsArr.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          getTalukaByDistrictsMutation.mutate({
                            districtIds: [t.id],
                          });
                        }}
                        className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                      >
                        {t.name}
                      </div>
                    ))}
                </div>
              </ScrollArea>
              <div>
                <div>
                  <ScrollArea className="h-72">
                    <div className="space-y-2">
                      <div className="font-bold">Selected</div>
                      {/* {selectedTalukas.map((t: any) => (
                        <div
                          key={t.id}
                          className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                        >
                          {t.name}
                        </div>
                      ))} */}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Select Taluka</div>
                <div className="rounded-xl text-xs p-1 px-2 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight">
                  Save
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>

                  {getTalukaByDistrictsMutation.isSuccess &&
                    talukaArr.length > 0 &&
                    talukaArr.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          // setSelectedTalukas(t);
                          // removeTalukaFromOptions(t.id);
                        }}
                        className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                      >
                        {t.name}
                      </div>
                    ))}
                </div>
              </ScrollArea>
              <div>
                <div>
                  <ScrollArea className="h-72">
                    <div className="space-y-2">
                      <div className="font-bold">Selected</div>
                      {/* {selectedTalukas.map((t: any) => (
                        <div
                          key={t.id}
                          className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                        >
                          {t.name}
                        </div>
                      ))} */}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
      </div>
    </>
  );
}
