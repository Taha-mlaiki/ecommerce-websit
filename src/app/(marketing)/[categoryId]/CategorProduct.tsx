'use client';

import { Product, Size, Color } from '@prisma/client';
import ProductList from '../_components/productsSection/ProductList';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { ListRestart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {productWithSubs} from "@/hooks/useCartStore"
type CategoryProps = {
  products: productWithSubs[];
  sizes: Size[];
  colors: Color[];
};

const CategorProduct = ({ products, sizes, colors }: CategoryProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State to track selected size and color filters
  const [selectedSize, setSelectedSize] = useState<string | null>(
    searchParams.get('sizeId'),
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    searchParams.get('colorId'),
  );

  // Effect to update selected filters when URL parameters change
  useEffect(() => {
    setSelectedSize(searchParams.get('sizeId'));
    setSelectedColor(searchParams.get('colorId'));
  }, [searchParams]);

  // Handler to change filter parameters in the URL
  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    router.push(`?${newParams.toString()}`);
  };

  // Memoized filtered data to avoid unnecessary re-renders
  const filteredData = useMemo(() => {
    return products.filter((product) => {
      const matchesSize = selectedSize ? product.sizeId === selectedSize : true;
      const matchesColor = selectedColor
        ? product.colorId === selectedColor
        : true;
      return matchesSize && matchesColor;
    });
  }, [products, selectedSize, selectedColor]);

  const clearUrl = ()=>{
    setSelectedSize('');
    setSelectedColor('');
    router.push(window.location.pathname)
  }

  return (
    <div className="flex flex-col lg:flex-row mb-20 mx-10 md:gap-20 ">
      {/* Responsive filter UI for small screens */}
      <div className="flex lg:hidden items-center justify-end gap-2 mb-10">
        <Button
          className="gap-2 mr-2"
          variant="outline"
          onClick={()=> clearUrl()}
        >
          <ListRestart className="w-4 h-4" />
          reset
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-1'>
            <Filter />
            <span>Filter</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sizes</DropdownMenuLabel>
            {sizes.map((size) => {
              return (
                <DropdownMenuCheckboxItem
                  key={size.id}
                  onCheckedChange={() =>
                    handleFilterChange(
                      'sizeId',
                      size.id === selectedSize ? null : size.id,
                    )
                  }
                  checked={selectedSize === size.id}
                >
                  {size.name}
                </DropdownMenuCheckboxItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Colors</DropdownMenuLabel>
            {colors.map((color) => {
              return (
                <DropdownMenuCheckboxItem
                  key={color.id}
                  onCheckedChange={() =>
                    handleFilterChange(
                      'colorId',
                      color.id === selectedSize ? null : color.id,
                    )
                  }
                  checked={selectedColor === color.id}
                >
                  {color.name}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Responsive filter UI for large screens */}
      <div className="w-[260px] hidden lg:flex lg:flex-col flex-wrap gap-5 mt-20 border-r">
        <div className="flex justify-end mr-2">
          <Button
            className="gap-2"
            variant="outline"
            onClick={() => clearUrl()}
          >
            <ListRestart className="w-4 h-4" />
            reset
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Sizes</h3>
          <Separator className="mb-4 mt-2" />
          <div className="flex items-center gap-2">
            {sizes.map((size) => (
              <Button
                key={size.id}
                onClick={() =>
                  handleFilterChange(
                    'sizeId',
                    size.id === selectedSize ? null : size.id,
                  )
                }
                variant={size.id === selectedSize ? 'default' : 'outline'}
                size="sm"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Colors</h3>
          <Separator className="mb-4 mt-2" />
          <div className="flex items-center gap-2">
            {colors.map((color) => (
              <Button
                key={color.id}
                onClick={() =>
                  handleFilterChange(
                    'colorId',
                    color.id === selectedColor ? null : color.id,
                  )
                }
                variant={color.id === selectedColor ? 'default' : 'outline'}
                size="sm"
              >
                {color.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Product list */}
      <div className="flex-1">
        <ProductList title="Featured Products" data={filteredData} />
      </div>
    </div>
  );
};

export default CategorProduct;
