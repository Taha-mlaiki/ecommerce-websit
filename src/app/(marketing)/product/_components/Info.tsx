 "use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import useCart from "@/hooks/useCartStore";
import { formatter } from "@/lib/utils";
import { Product ,Size,Color,Category } from "@prisma/client"
import { ShoppingCart } from 'lucide-react';
type InfoProps = Product& {
    size:Size,
    color:Color,
    category:Category
}

export type productProps = {
    data: InfoProps
}
const Info = ({data}:productProps) => {
  const addProduct = useCart((state)=> state.addProduct)
  return (
    <div className="flex flex-col max-w-md my-10">
        <h2 className="uppercase mb-3 font-semibold text-neutral-500">Store BAll</h2>
        <h1 className="font-extrabold text-4xl md:6xl">{data.name}</h1>
        <h2 className="text-neutral-400">{data.category.name}</h2>
        <div className="flex items-center gap-3 mt-5">
              <p className="font-bold">Size:</p>
              <Badge>
                {data.size.name}
              </Badge>
        </div>
        <div className="flex items-center gap-3 mt-5">
              <p className="font-bold">Color:</p>
              <div className="w-6 h-6 rounded-full border"
              style={{backgroundColor:data.color.value}}
              />
        </div>
        <div className="flex items-center justify-between gap-3 mt-5">
              <p className="font-bold">Price:</p>
              <span className="font-bold text-xl px-3 bg-neutral-300">{formatter.format(data.price)}</span>
        </div>
        <div className="mt-10 flex place-self-end">
          <Button className="ms-auto gap-2" onClick={()=> addProduct(data)}>
            <ShoppingCart />
            Add To Cart
          </Button>
        </div>
    </div>
  )
}

export default Info
