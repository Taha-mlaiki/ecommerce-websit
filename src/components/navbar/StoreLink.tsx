"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { useEffect, useState } from "react";

const StoreLink = () => {
  const params = useParams();
  const pathname = usePathname();
  const [isMounted,setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }
  const Links = [
    {
      href: `/store/${params.storeName}`,
      label: "Overview",
      active: pathname === `/store/${params.storeName}`,
    },
    {
      href: `/store/${params.storeName}/billboards`,
      label: "Billboards",
      active: pathname === `/store/${params.storeName}/billboards`,
    },
    {
      href: `/store/${params.storeName}/categories`,
      label: "Categories",
      active: pathname === `/store/${params.storeName}/categories`,
    },
    {
      href: `/store/${params.storeName}/sizes`,
      label: "Sizes",
      active: pathname === `/store/${params.storeName}/sizes`,
    },
    {
      href: `/store/${params.storeName}/colors`,
      label: "Colors",
      active: pathname === `/store/${params.storeName}/colors`,
    },
    {
      href: `/store/${params.storeName}/products`,
      label: "Products",
      active: pathname === `/store/${params.storeName}/products`,
    },
    {
      href: `/store/${params.storeName}/orders`,
      label: "Orders",
      active: pathname === `/store/${params.storeName}/orders`,
    },
    {
      href: `/store/${params.storeName}/settings`,
      label: "Settings",
      active: pathname === `/store/${params.storeName}/settings`,
    }
  ];

  return (
    <>
      <div className="hidden md:flex items-center gap-3">
        {Links.map((link) => (
          <Link
            className={cn(
              "text-sm font-semibold transition hover:text-slate-700 text-slate-400",
              link.active && "text-slate-700"
            )}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger>
          <Menu className="h-7 w-7 mt-1" />
          </SheetTrigger>
          <SheetContent  className="flex flex-col gap-7 ms-20">
            <div className="mt-28" />
          {Links.map((link) => (
          <Link
            className={cn(
              "text-sm font-semibold transition hover:text-slate-600 text-slate-400",
              link.active && "text-slate-600"
            )}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default StoreLink;
