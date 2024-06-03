"use client";
import { useStoreModal } from "@/hooks/use-store-model";
import React, { useEffect } from "react";
import ModalProvider from '@/providers/ModalProvider'
import "../globals.css"
const page = () => {
  const isOpen = useStoreModal((state)=> state.isOpen)
  const onOpen = useStoreModal((state)=> state.onOpen)
  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[isOpen,onOpen])
  return (
    <div>
      <ModalProvider />
    </div>
  );
};

export default page;
