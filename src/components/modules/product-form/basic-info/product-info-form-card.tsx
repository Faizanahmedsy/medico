"use client";
import { DisplayFormStep, TextH2 } from "@/components/modules";
import DashHeader from "@/components/modules/dash-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import CardForm from "@/components/modules/card-form";

import React from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

import { restrictPositiveNumbersOnly } from "@/lib/helpers/form-input";

export default function ProductInfoFormCard({
  form,
  setLetterPadDocument,
}: {
  form: any;
  setLetterPadDocument: any;
}) {
  return (
    <>
      <CardForm
        className="pb-4"
        title={"Product Information"}
        content={
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="drugName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder=" " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="capsule">Capsule</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="item1">Item 1</SelectItem>
                      <SelectItem value="item2">Item 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Prescription</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a primises" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Rx">Rx</SelectItem>
                      <SelectItem value="nRx">nRx</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("prescription") === "nRx" && (
              <div className="flex justify-center items-center">
                <CldUploadWidget
                  uploadPreset="nezbeiii"
                  options={{
                    sources: ["local", "url", "google_drive", "dropbox"],
                  }}
                  onUploadAdded={(file) => {
                    console.log("CldUploadWidget file", file);
                  }}
                  onSuccess={(response) => {
                    console.log("CldUploadWidget response", response);

                    if (response?.event === "success") {
                      const info = response.info as CloudinaryUploadWidgetInfo;
                      setLetterPadDocument(info.url);
                    }
                  }}
                >
                  {({ open }) => {
                    return (
                      <Button
                        onClick={() => open()}
                        variant={"secondary"}
                        // className="w-full"
                      >
                        Upload Letter Pad Document File
                      </Button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sizeX"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Size X </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" "
                        {...field}
                        onKeyDown={restrictPositiveNumbersOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeY"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Size Y</FormLabel>
                    <FormControl>
                      <Input placeholder=" " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contains"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contains</FormLabel>
                  <FormControl>
                    <Textarea placeholder=" " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        }
      />
    </>
  );
}
