import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { LayoutGrid, Settings } from 'lucide-react';
  import { LogOut } from 'lucide-react';
  import { Store } from 'lucide-react';
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
  
const UserMenu = async() => {
    const session = await auth()
  return (
        <Popover>
        <PopoverTrigger>
            <Avatar>
                <AvatarImage alt='user' src={`${session?.user?.image}`} />
                <AvatarFallback className="uppercase font-bold">
                    {session?.user?.name?.slice(0,2)}
                </AvatarFallback>
            </Avatar>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col gap-2 absolute right-0'>
            <Link href="/">
                    <Button className='w-full gap-2 ' variant="outline">
                        <Store className='-ms-5' size={18} />
                        Store
                    </Button>       
            </Link>
            {
             // @ts-ignore 
            session?.user.role === "admin" &&
                <Link href="/store/mlaiki-store">
                    <Button className='w-full gap-2 ' variant="outline">
                        <LayoutGrid className='ms-4' size={18} />
                        Dashboard
                    </Button>       
                </Link>
            }
            <Link href="/">
                <Button className='w-full gap-2' variant="outline">
                    <Settings size={18} />
                    Settings
                </Button>
            </Link>
            <form action={async()=>{
                "use server"
                await signOut()
                redirect("/")
            }}>
                <Button className='w-full gap-2' variant="destructive">
                    <LogOut size={18} />
                    Logout
                </Button>
            </form>
        </PopoverContent>
        </Popover>
  )
}

export default UserMenu
