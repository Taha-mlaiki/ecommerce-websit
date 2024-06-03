import { Billboard as BillboardType} from '@prisma/client'

const Billboard = ({data}:{data:BillboardType}) => {
  return (
    <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden'>
        <div className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'
        style={{backgroundImage: `url(${data.imageUrl})`}}>
        <div className='h-full w-full text-white flex flex-col justify-center items-center text-center gap-y-8'>
            <div className='font-bold leading-relaxed z-30 text-4xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs'>
                {data.label}
            </div>
        </div>
        <div className='absolute w-full h-full bg-black/20  top-0 left-0' />
        </div>
    </div>
  )
}

export default Billboard
