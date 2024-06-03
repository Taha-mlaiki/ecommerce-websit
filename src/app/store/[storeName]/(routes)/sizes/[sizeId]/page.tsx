import Container from "@/components/Container"
import { db } from "../../../../../../../prisma/client"
import SizesForm from "./_components/SizesForm"
export const revalidate = 0 
const page = async({params}:{params:{sizeId:string,storeName:string}}) => {

  const size = await db.size.findUnique({
    where:{
        id:params.sizeId
    }
  })



  return (
    <Container>
      <SizesForm sizeData={size} />
    </Container>
  )
}

export default page
