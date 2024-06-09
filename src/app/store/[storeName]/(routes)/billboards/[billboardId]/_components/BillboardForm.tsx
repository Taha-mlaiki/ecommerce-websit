"use client";
import { Billboard } from "@prisma/client";
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
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

const billboardSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string(),
});

const BillboardForm = ({
  billboardData,
}: {
  billboardData: Billboard;
}) => {
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [imageUrl,setImage] = useState( billboardData?.imageUrl ||"")
  const [editeImg,setEditImg] = useState(imageUrl ? false : true )
  const router = useRouter();

  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
    defaultValues: billboardData || {
      label: "",
      imageUrl:""
    },
  });

  const onSubmit = async (data: z.infer<typeof billboardSchema>) => {
    try {
      setLoading(true);
      if (billboardData) {
        //check backend
        const res = await axios.patch(
          `/api/billboards/${billboardData.id}`, {
            ...data,
            imageUrl,
          }
        );
        toast.success(res.data.success);
        form.reset()
        setImage("")
        return router.refresh()
      }
      const res = await axios.post(`/api/billboards`, {
        ...data,
        imageUrl,
        storeName: params.storeName
      });
      toast.success(res.data.success);
      form.reset()
      setImage("")
      router.refresh()
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const title = billboardData ? "Edit billboard":"Create billboard"
  const description = billboardData ? "Edit a billboard":"Add a new billboard"
  const actions = billboardData ? "Save changes":"Create"
  

  return (
    <div className="mt-10">
      <div className="flex justify-between items-end">
        <Heading title={title} description={description} />
        {billboardData && (
          <DeleteAlert  disabled={loading} id={billboardData.id}>
            <Trash />
          </DeleteAlert>
        ) }
      </div>
      <Separator className="my-5" />
        <Button className="mt-4 gap-1" onClick={()=> router.back()}>
          <ArrowBigLeft className="w-7 h-7" />
            Back
        </Button> <br />
        {imageUrl &&
          <Button className="mt-5" variant="outline" onClick={()=> setEditImg((prev)=> !prev)}>
            {editeImg ? "Cancel" : "Edite image"}
          </Button>     
        }
        <div className="my-5 grid md:grid-cols-3 xl:grid-cols-4 gap-3">
          {editeImg ? <div className="relative my-10 h-56 rounded-md" >
                  <UploadDropzone
                    endpoint="billboardImage"
                    onClientUploadComplete={(res)=> {
                      setImage(res[0].url)
                      setEditImg(false)
                    }}
                  />
                  </div>:
                  <div className="relative my-10 h-64 rounded-md ">
                  {imageUrl ? <Image src={imageUrl} fill className="object-cover rounded-md" alt="billboard image" />:
                  <UploadDropzone
                    endpoint="billboardImage"
                    onClientUploadComplete={(res)=> {
                      console.log(res)
                      setImage(res[0].url)
                    }}
                  />       
                  }
                </div>  
                  }
        </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} placeholder="Label" />
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

export default BillboardForm;
