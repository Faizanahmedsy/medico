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

export default function ProductInfoFormCard({ form }: { form: any }) {
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
                      <SelectItem value="rx">Rx</SelectItem>
                      <SelectItem value="nRx">nRx</SelectItem>
                      <SelectItem value="g">G</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sizeX"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Size X </FormLabel>
                    <FormControl>
                      <Input placeholder=" " {...field} />
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
