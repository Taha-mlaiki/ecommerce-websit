import Container from "@/components/Container"
import { db } from "../../../../../../../prisma/client"
import CategoryForm from "./_components/CategoryForm"
export const revalidate = 0 
const page = async({params}:{params:{categoryId:string,storeName:string}}) => {

  const category = await db.category.findFirst({
    where:{
        id:params.categoryId
    }
  })
  const billboards = await db.billboard.findMany({
    where:{
      storeName: params.storeName
    }
  })

  const billboardsLabel = billboards.map((item)=> ({
    label:item.label
  }))


  return (
    <Container>
      <CategoryForm categoryData={category} billboardsLabel={billboardsLabel} />
    </Container>
  )
}

export default page
