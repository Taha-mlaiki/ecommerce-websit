"use client";
import { Color } from "@prisma/client";
import { ArrowBigLeft, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DeleteAlert from "./DeleteAlert";


const colorSchema = z.object({
  name: z.string(),
  value:z.string()
});


const ColorForm = ({
  colorData,
}: {
  colorData: Color | null;
}) => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: colorData || {
      name:"",
      value:""
    }
  });

  const onSubmit = async (data: z.infer<typeof colorSchema>) => {
    try {
      setLoading(true);
      if (colorData) {
        const res = await axios.patch(
          `/api/colors/${colorData.id}`, {
            ...data,
            storeName: params.storeName,
          }
        );
        toast.success(res.data.success);
         await router.refresh()
        return router.push(`/store/${params.storeName}/colors`)
      }
      const res = await axios.post(`/api/colors`, {
        ...data,
        storeName: params.storeName,
      });
      toast.success(res.data.success);
      form.reset()
      router.refresh()
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const title = colorData ? "Edit color":"Create color"
  const description = colorData ? "Edit a color":"Add a new color"
  const actions = colorData ? "Save changes":"Create"
  

  return (
    <div className="mt-10">
      <div className="flex justify-between items-end">
        <Heading title={title} description={description} />
        {colorData && (
          <DeleteAlert  disabled={loading} id={colorData.id}>
            <Trash />
          </DeleteAlert>
        ) }
      </div>
      <Separator className="my-5" />
      <Button className="my-4 gap-1" onClick={()=> router.back()}>
        <ArrowBigLeft className="w-7 h-7" />
          Back
      </Button>            
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <div className="flex items-end gap-2">
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} placeholder="Value" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <div className="h-10 w-10 rounded-full border" style={{ backgroundColor : field.value}}  />
                </div>
              )}
            />
          </div>
          <Button disabled={loading} className="mt-4">
            {actions}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ColorForm;
