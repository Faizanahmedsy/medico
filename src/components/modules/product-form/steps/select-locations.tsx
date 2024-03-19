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
import { set } from "zod";
import { Separator } from "@/components/ui/separator";
import { addGroupApi } from "@/services/group/group.api";

export default function SelectLocations({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [groupName, setGroupName] = useState("");
  const [groupDec, setGroupDec] = useState("");

  const selectedTalukas = useGlobalState((state) => state.selectedTalukas);
  const setSelectedTalukas = useGlobalState(
    (state) => state.setSelectedTalukas
  );

  const removeSelectedTalukas = useGlobalState(
    (state) => state.removeSelectedTalukas
  );

  const selectedDistricts = useGlobalState((state) => state.selectedDistricts);

  console.log("selectedDistricts", selectedDistricts);
  const setSelectedDistricts = useGlobalState(
    (state) => state.setSelectedDistricts
  );

  const removeSelectedDistricts = useGlobalState(
    (state) => state.removeSelectedDistricts
  );

  const selectedStates = useGlobalState((state) => state.selectedStates);

  const setSelectedStates = useGlobalState((state) => state.setSelectedStates);

  const removeSelectedStates = useGlobalState(
    (state) => state.removeSelectedStates
  );

  const zustProductId = useGlobalState((state) => state.zustProductId);

  const [taluka, setTaluka] = useState<any>();

  // FOR STATE --------------------------------------
  const [stateArr, setStateArr] = useState<any>();

  const getStatesQuery = useQuery({
    queryKey: ["states"],
    queryFn: getStatesApi,
    retry: 1,
  });

  useEffect(() => {
    if (getStatesQuery.isFetched) {
      setStateArr(getStatesQuery.data);
    }
  }, [getStatesQuery.isFetched]);

  console.log("getStatesQuery", getStatesQuery);

  //---------------------------------------------

  // FOR DISTRICTS --------------------------------------

  const [districtsArr, setDistrictsArr] = useState<any>();

  const getDistrictsByStateMutation = useMutation({
    mutationFn: getDistrictsByStateApi,
    onSuccess: (data) => {
      console.log("getDistrictsByStateMutation data", data);

      setDistrictsArr(data);
    },
  });

  console.log("getDistrictsByStateMutation", getDistrictsByStateMutation);

  //---------------------------------------------

  // FOR TALUKA --------------------------------------

  const [talukaArr, setTalukaArr] = useState<any>();

  const getTalukaByDistrictsMutation = useMutation({
    mutationFn: getTalukasByDistrictApi,
    onSuccess: (data) => {
      console.log("getTalukaByDistrictsMutation data", data);

      setTalukaArr(data);
    },
  });

  console.log("getTalukaByDistrictsMutation", getTalukaByDistrictsMutation);

  //---------------------------------------------

  // useEffect(() => {
  //   setTaluka([
  //     { id: 1, name: "Taluka 1" },
  //     { id: 2, name: "Taluka 2" },
  //     { id: 3, name: "Taluka 3" },
  //     { id: 4, name: "Taluka 4" },
  //     { id: 5, name: "Taluka 5" },
  //     { id: 6, name: "Taluka 6" },
  //     { id: 7, name: "Taluka 7" },
  //     { id: 8, name: "Taluka 8" },
  //     { id: 9, name: "Taluka 9" },
  //     { id: 10, name: "Taluka 10" },
  //   ]);
  // }, []);

  const removeTalukaFromOptions = (id: number) => {
    setTaluka((prev: any) => prev.filter((t: any) => t.id !== id));
  };

  const addGroupMutation = useMutation({
    mutationFn: addGroupApi,
    onSuccess: (data) => {
      console.log("addGroupMutation data", data);
    },
  });

  const handleSave = () => {
    console.log("superrrr groupName", groupName);
    console.log("superrrr groupDec", groupDec);
    console.log("superrrr selectedStates", selectedStates);
    console.log("superrrr selectedDistricts", selectedDistricts);
    console.log("superrrr selectedTalukas", selectedTalukas);

    const talukaIds = selectedTalukas.map((t: any) => t.id);

    const payload = {
      name: groupName,
      description: groupDec,
      talukaIds: talukaIds,
      productIds: [zustProductId],
    };

    addGroupMutation.mutate(payload);
  };

  return (
    <>
      <DashHeader
        title="Select Locations"
        button={
          <Button
            variant={"company"}
            type="submit"
            //   onClick={
            //     () => {
            //     if (step < 6) {
            //       setStep((prev) => prev + 1);
            //     }
            //   }
            // }
            onClick={handleSave}
          >
            SAVE AND CONTINUE
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
      <div className="flex justify-center items-center gap-6">
        <div className="py-4 flex gap-1 flex-col ">
          <div>Group Name</div>
          <Input
            placeholder="Search"
            className="w-[280px]"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="py-4 flex gap-1 flex-col ">
          <div>Group Description</div>
          <Input
            placeholder="Search"
            className="w-[280px]"
            value={groupDec}
            onChange={(e) => setGroupDec(e.target.value)}
          />
        </div>
      </div>

      {/* -----------------SELECT STATE ----------------- */}
      <div className="grid grid-cols-1 px-[300px] gap-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Select State</div>
                <div
                  className="rounded-xl text-xs p-1 px-2 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight cursor-pointer"
                  onClick={() => {
                    const selectedStatesId = selectedStates.map(
                      (t: any) => t.id
                    );
                    getDistrictsByStateMutation.mutate({
                      stateIds: selectedStatesId,
                    });
                  }}
                >
                  Load District
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>
                  {/* {taluka?.map((t: any) => (/ */}
                  {stateArr &&
                    stateArr.length > 0 &&
                    stateArr.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedStates(t);
                          // removeTalukaFromOptions(t.id);

                          //remove this state from state arr on click
                          setStateArr((prev: any) =>
                            prev.filter((s: any) => s.id !== t.id)
                          );

                          // getDistrictsByStateMutation.mutate({
                          //   stateIds: [t.id],
                          // });
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
                      {selectedStates.map((t: any) => (
                        <div
                          key={t.id}
                          className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                          onClick={() => {
                            removeSelectedStates(t);

                            setStateArr((prev: any) => [t, ...prev]);
                          }}
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

        <Separator />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Select District</div>
                <div
                  className="rounded-xl text-xs p-1 px-2 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight cursor-pointer"
                  onClick={() => {
                    const selectedDistrictIds = selectedDistricts.map(
                      (t: any) => t.id
                    );
                    console.log("on save selectedTalukas", selectedDistrictIds);
                    getTalukaByDistrictsMutation.mutate({
                      districtIds: selectedDistrictIds,
                    });
                  }}
                >
                  Load Taluka
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
                          setSelectedDistricts(t);
                          // getTalukaByDistrictsMutation.mutate({
                          //   districtIds: [t.id],
                          // });

                          setDistrictsArr((prev: any) =>
                            prev.filter((d: any) => d.id !== t.id)
                          );
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
                      {selectedDistricts.map((t: any) => (
                        <div
                          key={t.id}
                          className="cursor-pointer bg-gray-200  hover:bg-gray-200 p-2 rounded-md"
                          onClick={() => {
                            removeSelectedDistricts(t);

                            setDistrictsArr((prev: any) => [t, ...prev]);
                          }}
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

        {/* -----------------SELECT TALUKA ----------------- */}

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Select Taluka</div>
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
                          setSelectedTalukas(t);
                          // removeTalukaFromOptions(t.id);

                          setTalukaArr((prev: any) =>
                            prev.filter((d: any) => d.id !== t.id)
                          );
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
      </div>
    </>
  );
}
