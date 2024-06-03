import { auth } from "@/auth";
import {createUploadthing, type FileRouter} from "uploadthing/next"
import { UploadThingError } from "uploadthing/server";


const f = createUploadthing();

const checkUser = async()=>{
    const session = await auth();
    if(!session?.user){
        return null
    }
    return session
}


export const ourFileRouter = {
    billboardImage: f({image:{maxFileSize:"8MB",maxFileCount:1}})
    .middleware(async () => {
        // This code runs on your server before upload
        const session = await auth();
        // If you throw, the user will not be able to upload
        if (!session?.user) throw new UploadThingError("Unauthorized");
        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId: session?.user.id };
      })
      .onUploadComplete(()=>{}),
    productImages: f({image:{maxFileSize:"4MB",maxFileCount:4}})
    .middleware(async () => {
        // This code runs on your server before upload
        const session = await auth();
        // If you throw, the user will not be able to upload
        if (!session?.user) throw new UploadThingError("Unauthorized");
        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId: session?.user.id };
      })
      .onUploadComplete(()=>{})
}satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter