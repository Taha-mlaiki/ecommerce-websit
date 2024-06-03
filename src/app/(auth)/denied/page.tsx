import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const pages = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
          <Image className='-mt-20' src="/403.svg" width={600} height={600} alt='404 page' />
          <div className='text-center'>
            <h1 className="text-5xl font-bold mb-4">We are sorry...</h1>
              <p>The page you're trying to access has restricted access.</p>
              <p>Please refer to your system administrator</p>
          </div>
        <Button className='mt-10'>
          <Link href="/">
            go Back
          </Link>
        </Button>
    </div>
  )
}

export default pages
