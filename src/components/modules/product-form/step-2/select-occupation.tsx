import React from "react";
import { DashHeader } from "@/components/modules";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SelectOccupation({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <DashHeader
        title={"Occupation"}
        button={
          <Button variant={"company"} type="submit">
            SAVE
          </Button>
        }
      />
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
                {/* {getStatesQuery.isFetched &&
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
                  ))} */}
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
  );
}
