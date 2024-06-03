import React, { ReactNode } from "react";
import { db } from "../../../../prisma/client";
import { redirect } from "next/navigation";
import ModalProvider from "@/providers/ModalProvider";
import StoreNavbar from "@/components/navbar/StoreNavbar";
const layout = async ({
  children,
  params
}: {
  params:{storeName:string}
  children: ReactNode;
}) => {

    const findStore = await db.store.findUnique({
      where:{
        name: params.storeName
      }
    })
    if(!findStore){
      const firstStore = await db.store.findFirst()
      if(!findStore){
        redirect("/createStore")
      }
      redirect(`/store/${firstStore?.name}`)
    }

  return (
    <>
      <ModalProvider />
      <StoreNavbar />
      {children}
    </>
  );

};

export default layout;
