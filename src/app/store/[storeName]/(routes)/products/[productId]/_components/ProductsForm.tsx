"use client";
import { Category, Color, Product, Size } from "@prisma/client";
import { ArrowBigLeft, Plus, Trash, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DeleteAlert from "./DeleteAlert";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const productsSchema = z.object({
  name: z.string().min(3),
  price: z.number(),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  categoryId: z.string().min(1),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
});

const ProductsForm = ({
  productData,
  sizes,
  categories,
  colors,
}: {
  productData: Product | null;
  sizes: Size[];
  colors: Color[];
  categories: Category[];
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImages] = useState(productData?.images || []);
  const [editeImg, setEditImg] = useState(imagesUrl.length > 0 ? false : true);
  const router = useRouter();

  const form = useForm<z.infer<typeof productsSchema>>({
    resolver: zodResolver(productsSchema),
    defaultValues: productData || {
      name: "",
      sizeId: "",
      colorId: "",
      categoryId: "",
      price: 0,
      isFeatured: false,
      isArchived: false,
    },
  });

  const onDeleteImage = (url: string) => {
    const newImages = imagesUrl.filter((ele) => ele !== url);
    setImages(newImages);
  };

  const onSubmit = async (data: z.infer<typeof productsSchema>) => {
    try {
      setLoading(true);
      if (productData) {
        const res = await axios.patch(`/api/products/${productData.id}`, {
          ...data,
          imagesUrl,
          storeName: params.storeName,
        });
        toast.success(res.data.success);
        form.reset();
        setImages([]); 
        return router.refresh()
      }
      const res = await axios.post(`/api/products`, {
        ...data,
        imagesUrl,
        storeName: params.storeName,
      });
      toast.success(res.data.success);
      form.reset();
      setImages([]);
      router.push(`/store/${params.storeName}/products`)
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const title = productData ? "Edit product" : "Create product";
  const description = productData ? "Edit a product" : "Add a new product";
  const actions = productData ? "Save changes" : "Create";

  return (
    <div className="mt-10">
      <div className="flex justify-between items-end">
        <Heading title={title} description={description} />
        {productData && (
          <DeleteAlert disabled={loading} id={productData.id}>
            <Trash />
          </DeleteAlert>
        )}
      </div>
      <Separator className="my-5" />
      <Button className="mt-4 gap-1" onClick={() => router.back()}>
        <ArrowBigLeft className="w-7 h-7" />
        Back
      </Button>
      <br />
      <div className="flex items-center gap-3">
        {imagesUrl.length > 0 && (
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => setEditImg((prev) => !prev)}
          >
            {editeImg ? "Cancel" : "Edite images"}
          </Button>
        )}
        <Button 
          className="mt-5"
          variant="outline"
          onClick={() => setEditImg((prev) => !prev)}
        >
          Add More 
        </Button>
      </div>
      <div className=" my-10 grid md:grid-cols-3 xl:grid-cols-4 gap-3">
        {editeImg ? (
          <UploadDropzone
            endpoint="productImages"
            onClientUploadComplete={(res) => {
              const resUrl = res.map((ele) => ele.url);
              setImages((prev) => [...prev, ...resUrl]);
              setEditImg(false);
            }}
          />
        ) : imagesUrl.length > 0 ? (
          imagesUrl.map((ele) => (
            <div key={ele} className=" group relative rounded-md w-full h-80 md:h-56">
              <Image
                src={ele}
                fill
                className="object-cover rounded-md"
                alt="Products images"
              />
              <Trash2
              onClick={()=> onDeleteImage(ele)}
              className="absolute right-3 top-3 z-30 h-7 w-7 cursor-pointer font-bold text-red-500 " />
              <div className="absolute w-full h-full rounded-md group-hover:bg-black/50 transition" />
            </div>
          ))
        ) : (
          <UploadDropzone
            endpoint="productImages"
            onClientUploadComplete={(res) => {
              const resUrl = res.map((ele) => ele.url);
              setImages((prev) => [...prev, ...resUrl]);
              setEditImg(false);
            }}
          />
        )}
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        {...field}
                        // @ts-ignore
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        placeholder="9.99"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors &&
                          colors.map((ele) => (
                            <SelectItem value={ele.id} key={ele.id}>
                              {ele.value}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes &&
                          sizes.map((ele) => (
                            <SelectItem value={ele.id} key={ele.id}>
                              {ele.value}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Categorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories &&
                          categories.map((ele) => (
                            <SelectItem value={ele.id} key={ele.id}>
                              {ele.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row p-4 space-y-0 items-start rounded-md border gap-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This product will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row p-4 space-y-0 items-start rounded-md border gap-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This product will not appear anywhere in the store
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="mt-4">
              {actions}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductsForm;
