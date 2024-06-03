"use client";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ReactNode, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DeleteAlert = ({
  children,
  disabled,
  id,
  className
}: {
  children?: ReactNode;
  disabled?: boolean;
  id?: string | unknown;
  className?:string

}) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [loading,setLoading]  = useState(false)
  const onDelete = async () => {
    try {
      setLoading(true)
      const res = await axios.delete(`/api/products/${id}`);
      toast.success(res.data.success);
      setOpen(false);
      router.push(`/store/${params.storeName}/products`);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }finally{
      setLoading(false)
      setOpen(false)
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(className)}
          disabled={disabled || loading}
          variant="destructive"
          size="icon"
        >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Product from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button className="gap-2" disabled={disabled || loading} variant="destructive" onClick={() => onDelete()}>
            {disabled || loading && <Loader2 className=" animate-spin w-5 h-5" />}
            {disabled || loading ? "loading...":"Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
