import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductDetailsProps {
  product: {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: { width: number; height: number; depth: number };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
      createdAt: string;
      updatedAt: string;
      barcode: string;
      qrCode: string;
    };
    images: string[];
    thumbnail: string;
    reviews: {
      rating: number;
      comment: string;
      reviewerName: string;
      date: string;
    }[];
  };
}

export const ViewProductDetails: React.FC<ProductDetailsProps> = ({
  product
}) => {
  return (
    <div className='flex flex-col gap-4 px-6 lg:flex-row'>
      <div className='flex-1 border-b p-4 lg:border-b-0 lg:border-r'>
        {' '}
        {/* Header Section */}
        <div className='flex flex-col gap-6 md:flex-row'>
          <div className='relative w-full md:w-[40%]'>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
              className='w-full rounded-md border object-cover'
            />
            <div className='mt-2 flex gap-2 overflow-x-auto'>
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Image ${index}`}
                  width={60}
                  height={60}
                  className='rounded-md border p-1'
                />
              ))}
            </div>
          </div>

          <div className='flex-1 space-y-2'>
            <h1 className='text-2xl font-bold'>{product.title}</h1>
            <Badge variant='yellow' className=''>
              {product.category}
            </Badge>
            <p className='text-muted-foreground'>{product.brand}</p>
            <p className='text-xl font-semibold'>${product.price.toFixed(2)}</p>
            <p className='text-sm text-green-600'>
              Discount: {product.discountPercentage}%
            </p>
            <p className='text-sm'>Stock: {product.stock} available</p>
            <p className='text-sm'>SKU: {product.sku}</p>
            <p className='text-sm'>Weight: {product.weight}kg</p>
            <p className='text-sm'>
              Dimensions: {product.dimensions.width} x{' '}
              {product.dimensions.height} x {product.dimensions.depth} cm
            </p>
            <Badge>{product.availabilityStatus}</Badge>
          </div>
        </div>
        {/* Description */}
        <h2 className='mb-2 mt-4 text-lg font-semibold'>Description</h2>
        <p className='font-light'>{product.description}</p>
      </div>
      <div className='p-4'>
        {/* Additional Information */}
        <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='pr-2 md:border-r'>
            <h2 className='mb-1 text-lg font-semibold'>Shipping & Warranty</h2>
            <p className='text-sm'>{product.shippingInformation}</p>
            <p className='text-sm'>{product.warrantyInformation}</p>
          </div>
          <div>
            <h2 className='mb-1 text-lg font-semibold'>Return Policy</h2>
            <p className='text-sm'>{product.returnPolicy}</p>
          </div>
        </div>
        {/* Reviews */}
        <h2 className='mb-2 mt-4 text-lg font-medium'>
          Customer Reviews ({product.reviews.length})
        </h2>
        <div className='space-y-2 rounded-sm border px-4'>
          <ScrollArea className='max-h-[300px]'>
            {product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className='border-b p-3 last:border-b-0'>
                  <p className='text-sm font-semibold'>{review.reviewerName}</p>
                  <p className='text-sm'>⭐ {review.rating}/5</p>
                  <p className='text-sm'>{review.comment}</p>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(review.date).toDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className='text-sm text-muted-foreground'>No reviews yet.</p>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
