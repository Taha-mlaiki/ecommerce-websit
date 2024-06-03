"use client"

import StoreModel from "@/app/createStore/_components/StoreModel";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted,setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted) return null

    return <StoreModel />

}

export default ModalProvider
