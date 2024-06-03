"use client"
import axios from "axios"
import { Trash } from "lucide-react"

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
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"

const DeleteAlert = ({disabled,id}:{disabled:boolean,id:string}) => {
  const [open,setOpen] = useState(false)
  const router = useRouter()
const onDelete = async()=>{
        try {
            const res = await axios.delete(`/api/stores/${id}`)
            toast.success(res.data.success)
            setOpen(false)
            router.push("/store/24234234")
            router.refresh()
        } catch (error:any) {
            toast.error(error.response.data.error)
        }
    }

  return (
    <AlertDialog open={open} onOpenChange={()=> setOpen((prev)=> !prev)}>
  <AlertDialogTrigger asChild >
    <Button disabled={disabled} variant="destructive" size="icon">
        <Trash />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your store
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button variant="destructive" onClick={()=> onDelete()}>
            Continue
        </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteAlert
