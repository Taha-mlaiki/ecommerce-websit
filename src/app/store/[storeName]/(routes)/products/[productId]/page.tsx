import Container from "@/components/Container"
import { db } from "../../../../../../../prisma/client"
import ProductsForm from "./_components/ProductsForm"
export const revalidate = 0 
const page = async({params}:{params:{productId:string,storeName:string}}) => {

  const product = await db.product.findUnique({
    where:{
      id: params.productId,
    }
  })
  const sizes = await db.size.findMany({
    where:{
      storeName: params.storeName
    }
  })
  const colors = await db.color.findMany({
    where:{
      storeName:params.storeName
    }
  })
  const categories = await db.category.findMany({
    where:{
      storeName:params.storeName
    }
  })
  return (
    <Container>
      <ProductsForm productData={product} sizes={sizes} colors={colors} categories={categories} />
    </Container>
  )
}

export default page
