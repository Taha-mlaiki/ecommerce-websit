"use client"
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod"

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DeleteAlert from "./DeleteAlert";

const settingSchema = z.object({
  name: z.string().min(3)
})

const settingsForm = ({ storeData }: { storeData: Store }) => {
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof settingSchema>>({
    resolver:zodResolver(settingSchema),
    defaultValues:storeData
  })

  const onSubmit = async(data:z.infer<typeof settingSchema>)=>{
    try {
      setLoading(true)
      const res = await axios.patch(`/api/stores/${storeData.id}`,data)
      toast.success(res.data.success)
      router.push(`/store/${res.data.store.name}`)
    } catch (error:any) {
      toast.error(error.response.data.error)
    }finally {
      setLoading(false)
    }
  }


  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <Heading title="Settings" description="Manage store preferences" />
        <DeleteAlert disabled={loading} id={storeData.id} />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({field})=> (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <Button disabled={loading} className="mt-4">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default settingsForm;
