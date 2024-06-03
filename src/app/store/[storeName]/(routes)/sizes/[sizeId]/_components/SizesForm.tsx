"use client";
import { Size } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DeleteAlert from "./DeleteAlert";


const categorySchema = z.object({
  name: z.string(),
  value:z.string()
});


const SizesForm = ({
  sizeData,
}: {
  sizeData: Size | null;
}) => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: sizeData || {
      name:"",
      value:""
    }
  });

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    try {
      setLoading(true);
      if (sizeData) {
        const res = await axios.patch(
          `/api/sizes/${sizeData.id}`, {
            ...data,
            storeName: params.storeName,
          }
        );
        toast.success(res.data.success);
        return router.refresh()
      }
      const res = await axios.post(`/api/sizes`, {
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
  const title = sizeData ? "Edit size":"Create size"
  const description = sizeData ? "Edit a size":"Add a new size"
  const actions = sizeData ? "Save changes":"Create"
  

  return (
    <div className="mt-10">
      <div className="flex justify-between items-end">
        <Heading title={title} description={description} />
        {sizeData && (
          <DeleteAlert  disabled={loading} id={sizeData.id}>
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
          <div className="grid md:grid-cols-3 gap-3">
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
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} placeholder="Value" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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

export default SizesForm;
