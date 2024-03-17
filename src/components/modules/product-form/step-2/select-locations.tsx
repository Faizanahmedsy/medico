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

  console.log("selectedTalukas", selectedTalukas);

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

      <div className="flex gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Select State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>
                  {taluka &&
                    taluka.length > 0 &&
                    taluka.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedTalukas(t);
                          removeTalukaFromOptions(t.id);
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
            <CardTitle>Select Taluka</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>
                  {taluka &&
                    taluka.length > 0 &&
                    taluka.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedTalukas(t);
                          removeTalukaFromOptions(t.id);
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
            <CardTitle>Select District</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="font-bold">Options</div>
                  {taluka &&
                    taluka.length > 0 &&
                    taluka.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedTalukas(t);
                          removeTalukaFromOptions(t.id);
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
