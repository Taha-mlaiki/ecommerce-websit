"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-model";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import FormError from "@/components/FormStatus/FormError";
import { useRouter } from "next/navigation";

const storeSchema = z.object({
  name: z.string().min(3, {
    message: "store name must at least contain 3 charachters",
  }),
});

const StoreModel = () => {
    const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")
  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof storeSchema>) => {
    setLoading(true)
    try {
      const res = await axios.post("/api/stores", data);
      toast.success(res.data.success);
      router.refresh();
      router.push(`/store/${res.data.store.name}`)
      storeModal.onClose()
    } catch (error:any) {
      form.reset()
      setError(error.response.data.error)
    }finally{
      setLoading(false)
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to mange products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Store name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3">
            <FormError error={error} />   
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button disabled={loading} type="button" onClick={storeModal.onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Create Store
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModel;
