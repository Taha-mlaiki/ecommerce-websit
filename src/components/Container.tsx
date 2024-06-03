import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const Container = ({children,className}:{children:ReactNode,className?:string}) => {
  return (
    <div className={cn('max-w-7xl mx-auto px-5 md:px-10 lg:px-16 xl:px-20 2xl:px-0',className)}>
      {children}
    </div>
  )
}

export default Container
