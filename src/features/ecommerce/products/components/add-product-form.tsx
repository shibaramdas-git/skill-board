'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUploader } from '@/components/file-uploader';

const categories = ['Beauty', 'Electronics', 'Fashion', 'Home', 'Toys']; // Example categories
const availabilityOptions = ['In Stock', 'Out of Stock', 'Low Stock'];
const tagsOptions = [
  'New Arrival',
  'Best Seller',
  'Discounted',
  'Limited Edition'
];

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    stock: '',
    brand: '',
    sku: '',
    weight: '',
    dimensions: { width: '', height: '', depth: '' },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    tags: [] as string[],
    images: [] as File[],
    thumbnail: null as File | null
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // <Card className='mx-auto w-full max-w-2xl p-6'>
    //   <CardHeader>
    //     <CardTitle>Add New Product</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    <div className=''>
      <div className='grid grid-cols-1 gap-6 px-6 lg:grid-cols-2'>
        {/* Product Title */}
        <div>
          <Label>Title</Label>
          <Input
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Product name'
          />
        </div>
        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Short product description'
          />
        </div>
        {/* Price & Discount */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label>Price ($)</Label>
            <Input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              placeholder='Product price'
            />
          </div>
          <div>
            <Label>Discount (%)</Label>
            <Input
              type='number'
              name='discountPercentage'
              value={formData.discountPercentage}
              onChange={handleChange}
              placeholder='Discount percentage'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {/* Stock */}
          <div>
            <Label>Stock Quantity</Label>
            <Input
              type='number'
              name='stock'
              value={formData.stock}
              onChange={handleChange}
              placeholder='Available stock'
            />
          </div>
          {/* Availability Status */}
          <div>
            <Label>Availability Status</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, availabilityStatus: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select availability' />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Brand & SKU */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label>Brand</Label>
            <Input
              name='brand'
              value={formData.brand}
              onChange={handleChange}
              placeholder='Brand name'
            />
          </div>
          <div>
            <Label>SKU</Label>
            <Input
              name='sku'
              value={formData.sku}
              onChange={handleChange}
              placeholder='Stock Keeping Unit'
            />
          </div>
        </div>

        {/* Weight & Dimensions */}
        <div>
          <div className='mb-4'>
            <Label>Weight (kg)</Label>
            <Input
              type='number'
              name='weight'
              value={formData.weight}
              onChange={handleChange}
              placeholder='Weight in kg'
            />
          </div>

          <div className='mb-4 grid grid-cols-3 gap-4'>
            <div>
              <Label>Width (cm)</Label>
              <Input
                type='number'
                name='width'
                value={formData.dimensions.width}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: {
                      ...formData.dimensions,
                      width: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input
                type='number'
                name='height'
                value={formData.dimensions.height}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: {
                      ...formData.dimensions,
                      height: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Depth (cm)</Label>
              <Input
                type='number'
                name='depth'
                value={formData.dimensions.depth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: {
                      ...formData.dimensions,
                      depth: e.target.value
                    }
                  })
                }
              />
            </div>
          </div>

          {/* <div> */}
          {/* Warranty & Shipping Information */}
          <div className='mb-4'>
            <Label>Warranty Information</Label>
            <Input
              name='warrantyInformation'
              value={formData.warrantyInformation}
              onChange={handleChange}
              placeholder='E.g., 1 year warranty'
            />
          </div>

          <div>
            <Label>Shipping Information</Label>
            <Input
              name='shippingInformation'
              value={formData.shippingInformation}
              onChange={handleChange}
              placeholder='E.g., Ships in 3 days'
            />
          </div>
          {/* </div> */}
        </div>

        <div>
          <div className='mb-4'>
            <Label>Product Thumbnail Image</Label>
            <Input
              type='file'
              accept='image/*'
              placeholder='Product thumbnail image'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Product Images</Label>
            <FileUploader />
          </div>
        </div>
      </div>
      <div className='mt-4 flex justify-center gap-4'>
        <Button className='w-1/2 md:w-[140px]'>Add Product</Button>
        <Button className='w-1/2 md:w-[140px]' variant='outline'>
          Reset
        </Button>
      </div>
    </div>

    //   </CardContent>
    // </Card>
  );
}
