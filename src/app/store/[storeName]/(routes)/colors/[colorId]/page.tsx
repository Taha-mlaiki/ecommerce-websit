import Container from "@/components/Container"
import { db } from "../../../../../../../prisma/client"
import ColorForm from "./_components/ColorForm"
export const revalidate = 0 
const page = async({params}:{params:{colorId:string,storeName:string}}) => {
  console.log(params.colorId)

  const color = await db.color.findUnique({
    where:{
        id:params.colorId
    }
  })

  return (
    <Container>
      <ColorForm colorData={color} />
    </Container>
  )
}

export default page
