import Container from "@/components/Container";
import Image from "next/image";
import Billboard from "./_components/Billboard";
import { db } from "../../../prisma/client";
import ProductList from "./_components/productsSection/ProductList";
import { unstable_noStore as noStore } from "next/cache";
async function Home() {
  noStore()
  const category = await db.category.findFirst({
    where:{
      name: "All",
      storeName:"mlaiki-store"
    },
    include:{
      billboard:true
    }
  })
  const products = await db.product.findMany({
    where:{
      storeName:"mlaiki-store",
      isFeatured:true,
      isArchived:false
    },
    include:{
      size:true,
      color:true,
      category:true
    }
  })
  return (
    <>
      <Billboard data={category!.billboard} />
      <Container>
        <ProductList title="Featured Products" data={products} />
      </Container>
    </>
  );
}

export default Home
