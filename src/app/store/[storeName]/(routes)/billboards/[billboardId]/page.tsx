import Container from "@/components/Container"
import { db } from "../../../../../../../prisma/client"
import BillboardForm from "./_components/BillboardForm"
export const revalidate = 0 
const page = async({params}:{params:{billboardId:string,storeName:string}}) => {

  const billboard = await db.billboard.findUnique({
    where:{
      id: params.billboardId
    }
  })
  
  return (
    <Container>
      <BillboardForm billboardData={billboard!} />
    </Container>
  )
}

export default page
