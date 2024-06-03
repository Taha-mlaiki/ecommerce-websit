import { Dispatch, FC, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ProductPreviewProps = {
  open: boolean;
  images: string[];
  mainImage:string,
  setMainImage:Dispatch<SetStateAction<string>>,
  setOpen:Dispatch<SetStateAction<boolean>>
};

const ProductPreview: FC<ProductPreviewProps> = ({ open, images,mainImage,setMainImage, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=''>
        <div className="w-full">
          <div className="w-full mx-auto max-w-sm rounded-xl relative aspect-[1.5/2] my-10">
            <Image
              src={mainImage}
              fill
              alt="main image"
              className="rounded-xl"
            />
          </div>
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              {images.map((img) => (
                <div
                  key={img}
                  onClick={() => setMainImage(img)}
                  className="w-20 relative aspect-square "
                >
                  <Image
                    fill
                    src={img}
                    alt="sub images"
                    className={cn(
                      'rounded-xl border object-cover border-gray-500 ',
                    )}
                    style={{
                      border:
                        img === mainImage
                          ? '4px solid black'
                          : '2px solid rgb(107 114 128 / var(--tw-border-opacity))',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreview;
