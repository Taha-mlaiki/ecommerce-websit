import React from 'react'
import { db } from '../../../../../../prisma/client'
import { redirect } from 'next/navigation'
import SettingsForm from './_components/settingsForm'
import Container from '@/components/Container'
export const revalidate = 0 
const page = async ({params}:{params:{storeName:string}}) => {

    const store = await db.store.findUnique({
        where:{
            name:params.storeName
        }
    })
    if(!store){
        return redirect("/createStore")
    }
  return (
    <Container className='flex flex-col'>
            <SettingsForm storeData={store} />
    </Container>
  )
}

export default page
