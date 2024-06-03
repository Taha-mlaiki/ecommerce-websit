import React from 'react'
import StoreLink from './StoreLink'
import UserMenu from './UserMenu'
import StoreSwitcher from './StoreSwitcher'
import { db } from '../../../prisma/client'
import  Container from '@/components/Container'
import ChangeTheme from '@/app/(marketing)/_components/navbar/ChangeTheme'


const StoreNavbar = async () => {
  const stores = await db.store.findMany();
  
  return (
    <div className='h-16 border-b '>
      <Container className='flex h-16 items-center justify-between'>
            <StoreSwitcher stores={stores} />
            <StoreLink />
            <div className='flex gap-4 items-center'>
            <UserMenu />
            <ChangeTheme />
            </div>
      </Container>
    </div>
  )
}

export default StoreNavbar
