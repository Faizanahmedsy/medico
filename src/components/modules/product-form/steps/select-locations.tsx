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
import { getItem, setItem } from "@/lib/localStorage";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function SelectLocations({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [groupName, setGroupName] = useState("");
  const [groupDec, setGroupDec] = useState("");

  const [disableDistrict, setDisableDistrict] = useState(true);
  const [disableTaluka, setDisableTaluka] = useState(true);

  console.log("disableTaluka", disableTaluka);

  const selectedTalukas = useGlobalState((state) => state.selectedTalukas);
  const setSelectedTalukas = useGlobalState(
    (state) => state.setSelectedTalukas
  );

  const removeSelectedTalukas = useGlobalState(
    (state) => state.removeSelectedTalukas
  );

  const removeSelectedTalukasBasedOnDistrictId = useGlobalState(
    (state) => state.removeSelectedTalukasBasedOnDistrictId
  );

  const removeSelectedDistrictsBasedOnStateId = useGlobalState(
    (state) => state.removeSelectedDistrictsBasedOnStateId
  );

  const selectedDistricts = useGlobalState((state) => state.selectedDistricts);

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

  const {
    mutateSelectedDistricts,
    mutateSelectedStates,
    mutateSelectedTalukas,
  } = useGlobalState((state) => state);

  const zustProductId = useGlobalState((state) => state.zustProductId);

  const [taluka, setTaluka] = useState<any>();

  // FOR STATE --------------------------------------
  // const [stateArr, setStateArr] = useState<any>([
  //   {
  //     id: 1,
  //     name: "Maharashtra",
  //   },
  //   {
  //     id: 2,
  //     name: "Karnataka",
  //   },
  //   {
  //     id: 3,
  //     name: "Goa",
  //   },
  //   {
  //     id: 4,
  //     name: "Gujarat",
  //   },
  // ]);

  const [stateArr, setStateArr] = useState<any>([]);

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

  // const [districtsArr, setDistrictsArr] = useState<any>([
  //   {
  //     id: 1,
  //     name: "District 1",
  //   },
  //   {
  //     id: 2,
  //     name: "District 2",
  //   },
  //   {
  //     id: 3,
  //     name: "District 3",
  //   },
  //   {
  //     id: 4,
  //     name: "District 4",
  //   },
  // ]);

  const [districtsArr, setDistrictsArr] = useState<any>([]);

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

  // const [talukaArr, setTalukaArr] = useState<any>([
  //   {
  //     id: 1,
  //     name: "Taluka 1",
  //   },
  //   {
  //     id: 2,
  //     name: "Taluka 2",
  //   },
  //   {
  //     id: 3,
  //     name: "Taluka 3",
  //   },
  //   {
  //     id: 4,
  //     name: "Taluka 4",
  //   },
  //   {
  //     id: 5,
  //     name: "Taluka 5",
  //   },
  //   {
  //     id: 6,
  //     name: "Taluka 6",
  //   },
  //   {
  //     id: 7,
  //     name: "Taluka 7",
  //   },
  //   {
  //     id: 8,
  //     name: "Taluka 8",
  //   },
  //   {
  //     id: 9,
  //     name: "Taluka 9",
  //   },
  //   {
  //     id: 10,
  //     name: "Taluka 10",
  //   },
  // ]);

  const [talukaArr, setTalukaArr] = useState<any>([]);

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

      console.log("group id", data.id);

      setItem("medico-groupId", data.id);

      console.log("products", data.products);

      mutateSelectedTalukas([]);

      mutateSelectedStates([]);

      mutateSelectedDistricts([]);

      setStep((prev) => prev + 1);
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
      companyEmail: getItem("test-email"),
      name: groupName,
      description: groupDec,
      talukaIds: talukaIds,
      productIds: [getItem("medico-productId")],
    };

    addGroupMutation.mutate(payload);
  };

  console.log("getStatesQueryisFetched", getStatesQuery.isFetched);

  useEffect(() => {
    if (getDistrictsByStateMutation.isSuccess) {
      setDisableDistrict(false);
    } else {
      setDisableDistrict(true);
    }
  }, [getDistrictsByStateMutation.isSuccess]);

  useEffect(() => {
    // Enable taluka selection if at least one district is selected and districts are successfully loaded
    if (getTalukaByDistrictsMutation.isSuccess) {
      setDisableTaluka(false);
    } else {
      setDisableTaluka(true);
    }
  }, [getTalukaByDistrictsMutation.isSuccess]);

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
            // disabled={true}
            disabled={
              //TODO: enble this
              selectedDistricts.length === 0 ||
              selectedTalukas.length === 0 ||
              groupName === "" ||
              groupDec === "" ||
              selectedStates.length === 0
            }
          >
            {addGroupMutation.isPending && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
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
      <div className="flex md:flex-row flex-col justify-center items-center md:gap-6">
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
      <div className="grid grid-cols-1 md:px-[300px] px-[0px] gap-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex md:flex-row gap-2 md:gap-0 flex-col justify-between items-center">
                <div>Select State</div>
                <div
                  className="rounded-xl text-xs p-3 px-5 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight cursor-pointer"
                  onClick={() => {
                    const selectedStatesId = selectedStates.map(
                      (t: any) => t.id
                    );
                    getDistrictsByStateMutation.mutate({
                      stateIds: selectedStatesId,
                    });
                  }}
                >
                  <div className="flex">
                    {getDistrictsByStateMutation.isPending && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Load District
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
                            // alert(selectedStates.length);

                            setDisableDistrict(true);

                            if (selectedStates.length === 1) {
                              setDistrictsArr([]);
                              setTalukaArr([]);
                            }
                            removeSelectedDistrictsBasedOnStateId(t.id);

                            // setDistrictsArr((prev: any) => [t, ...prev]);

                            // removeSelectedTalukasBasedOnDistrictId(t.id);

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

        {/* -----------------SELECT DISTRICT ----------------- */}
        <Card
          className={cn(
            "w-full",
            disableDistrict ? "bg-slate-200 cursor-not-allowed" : ""
          )}
        >
          <CardHeader>
            <CardTitle>
              <div className="flex md:flex-row gap-2 md:gap-0 flex-col justify-between items-center">
                <div>Select District</div>
                <div
                  className="rounded-xl text-xs p-3 px-5 bg-emerald-200 text-emerald-800 font-bold leading-2  -tracking-tight cursor-pointer"
                  onClick={() => {
                    const selectedDistrictIds = selectedDistricts.map(
                      (t: any) => t.id
                    );
                    getTalukaByDistrictsMutation.mutate({
                      districtIds: selectedDistrictIds,
                    });
                  }}
                >
                  <div className="flex">
                    {getTalukaByDistrictsMutation.isPending && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Load Taluka
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>

                  {getDistrictsByStateMutation.isSuccess &&
                    districtsArr.length > 0 &&
                    districtsArr.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          if (disableDistrict) {
                            return;
                          }

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
                            setDisableTaluka(true);

                            removeSelectedDistricts(t);

                            removeSelectedTalukasBasedOnDistrictId(t.id);

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

        <Separator />

        {/* -----------------SELECT TALUKA ----------------- */}

        <Card
          className={cn(
            "w-full",
            disableTaluka ? "bg-slate-200 cursor-not-allowed" : ""
          )}
        >
          <CardHeader>
            <CardTitle>
              <div className="flex md:flex-row gap-2 md:gap-0 flex-col justify-between items-center">
                <div>Select Taluka</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>

                  {getTalukaByDistrictsMutation.isSuccess &&
                    talukaArr.length > 0 &&
                    talukaArr.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          if (disableTaluka) {
                            return;
                          }

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
