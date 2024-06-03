import { create } from "zustand";

interface storeInterface {
    isOpen:boolean;
    onClose: ()=> void;
    onOpen: ()=> void;
}


export const useStoreModal = create<storeInterface>((set)=> ({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false})
}))