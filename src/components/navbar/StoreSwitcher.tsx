"use client"
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle, Store as StoreIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Store as store } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandList } from "cmdk";
import { useStoreModal } from "@/hooks/use-store-model";

const StoreSwitcher =({stores}:{stores:store[]}) => {
  const storeModel = useStoreModal()
  const params = useParams()
  const router  = useRouter()
  const [open, setOpen] = useState(false)
  const formatedStores = stores.map((store)=> ({label:store.name,value:store.id,}))
  const currentStore = formatedStores.find((item)=> item.label === params.storeName)
  const [isMounted,setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }

  const onStoreSelect = (store:{label:string,value:string})=>{
    setOpen(false)
    router.push(`/store/${store.label}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild >
        <Button variant="outline" role="combobox" className="gap-2 w-[170px] justify-start">
            <StoreIcon size={20} />
            {currentStore?.label.length && currentStore?.label.length > 7 ?
             <p className="text-xs">
              {currentStore?.label} </p> 
              : currentStore?.label  }
            <ChevronsUpDown className="ms-auto w-4 h-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[170px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>
              No Store found.
            </CommandEmpty>
            <CommandGroup heading="Stores">
              {formatedStores.map((store)=> (
                <CommandItem
                key={store.value}
                onSelect={()=> onStoreSelect(store)}
                className="flex justify-between"
                >
                  {store.label}
                  <StoreIcon className="h-4 w-4" />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
              onSelect={()=> {
                setOpen(false)
                storeModel.onOpen()
              }}
              className="flex justify-between">
                Create Store 
                <PlusCircle className="w-4 h-4 opacity-70" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
};

export default StoreSwitcher;
