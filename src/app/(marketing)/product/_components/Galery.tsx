"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import ProductPreview from './ProductPreview'

const Galery = ({images}:{images:string[]}) => {

const [mainImage,setMainImage] = useState(images[0])

  const [open,setOpen] = useState(false)

  return (
    <div className='w-full'>
      <ProductPreview setOpen={setOpen} open={open} images={images} mainImage={mainImage} setMainImage={setMainImage} />
      <div
        onClick={()=> setOpen(true)}
       className='w-full max-w-sm rounded-xl relative aspect-[1.5/2] mt-20 cursor-pointer'>
        <Image src={mainImage} fill alt='main image' className='rounded-xl' />
      </div>
      {images.length > 1 && 
        <div className='flex items-center gap-4 mt-4'>
            {images.map((img)=> (
                <div
                key={img}
                onClick={()=> setMainImage(img)}
                className='w-20 relative aspect-square '>
                    <Image fill src={img} alt='sub images' className={cn('rounded-xl border object-cover border-gray-500 ')}
                    style={{ border: img === mainImage ? "4px solid black" : "2px solid rgb(107 114 128 / var(--tw-border-opacity))" }}
                    />
                </div>
        ))}
       </div>   
      }
    </div>
  )
}

export default Galery
