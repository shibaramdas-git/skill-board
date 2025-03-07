'use client';
import { CommonModal } from '@/components/modal/common-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Ellipsis, Eye, Pencil, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ICategory, IProduct } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Combobox } from '@/components/ui/table/combobox';
import AddProductForm from './add-product-form';

export default function ProductsPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState<IProduct[]>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchData({ limit: 10 });
    fetchCategoriesList();
  }, []);

  async function fetchData(filterParams: any) {
    const res = await axios.get('https://dummyjson.com/products', {
      params: filterParams
    });
    setProducts(res.data.products);
  }
  async function fetchByCategories() {
    const res = await axios.get('https://dummyjson.com/products/categories');
    console.log(res.data);
  }
  async function fetchCategoriesList() {
    const res = await axios.get('https://dummyjson.com/products/categories');
    console.log(res.data);
    setCategories(res.data);
  }
  const columns: ColumnDef<IProduct>[] = [
    {
      id: 'Id',
      accessorKey: 'id',
      header: 'Id'
    },
    {
      id: 'Title',
      accessorKey: 'title',
      header: 'Title'
    },
    {
      id: 'Category',
      accessorKey: 'category',
      header: 'Category'
    },
    {
      id: 'Brand',
      accessorKey: 'brand',
      header: 'Brand'
    },
    {
      id: 'Price',
      accessorKey: 'price',
      header: 'Price'
    },
    {
      id: 'Discount %',
      accessorKey: 'discountPercentage',
      header: 'Discount %'
    },
    {
      id: 'Rating',
      accessorKey: 'rating',
      header: 'Rating'
    },
    {
      id: 'Min order quantity',
      accessorKey: 'minimumOrderQuantity',
      header: 'Min order'
    },
    {
      id: 'Stock Status',
      accessorKey: 'availabilityStatus',
      header: 'Stock',
      cell: ({ row }) => {
        return (
          <div>
            <span className='inline-block w-[30px]'>{row.original.stock}</span>
            <span>{row.original.availabilityStatus}</span>
          </div>
        );
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <>
            <span
              className='cell-action-icon mr-2'
              onClick={() => setOpenView(true)}
            >
              <Eye size={17} />
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className='cell-action-icon'>
                  <Ellipsis size='17' />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    // dispatch(sendOtpToUser(row.userId));
                    setConfirmEdit(true);
                    toast.success('OTP sent successfully.');
                  }}
                >
                  <Pencil size={17} className='mr-3' /> Update product
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpenDelete(true)}
                  className='text-red-500'
                >
                  <Trash size={17} className='mr-3' /> Delete product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      }
    }

    // {
    //   id: 'Text field',
    //   accessorKey: 'text',
    //   header: 'Heading'
    // }
    // {
    //   id: 'Open/Closed',
    //   accessorKey: 'isOpen',
    //   header: 'Open/Closed',
    //   cell: ({ row }) => {
    //     return (
    //       <Switch
    //         checked={row.original.isOpen}
    //         onCheckedChange={() => {
    //           setToggle((prev) => !prev);
    //           toggle
    //             ? toast.error('Failed to update status!')
    //             : toast.success('Status updated successfully!');
    //         }}
    //       />
    //     );
    //   }
    // },
    // {
    //   id: 'Badge',
    //   accessorKey: 'badge',
    //   header: 'Badge',
    //   cell: ({ row }) => {
    //     return row.original.isOpen == true ? (
    //       <Badge variant='green'>Open</Badge>
    //     ) : (
    //       <Badge variant='red'>Closed</Badge>
    //     );
    //   }
    // },
    // {
    //   id: 'Actions',
    //   accessorKey: 'actions',
    //   header: 'Actions',
    //   cell: ({ row }) => (
    //     <span className='inline-flex gap-2'>
    //       <span
    //         className='cell-action-icon'
    //         onClick={() => setConfirmEdit(true)}
    //       >
    //         <Pencil size='16' />
    //       </span>
    //       <span className='cell-action-icon' onClick={() => setOpenView(true)}>
    //         <Eye size='16' />
    //       </span>
    //     </span>
    //   )
    // }
  ];

  return (
    <>
      {confirmEdit && (
        <CommonModal
          isOpen={confirmEdit}
          onClose={() => setConfirmEdit(false)}
          onSubmit={() => {
            setConfirmEdit(false);
            if (confirmEdit) toast.success('Status updated successfully !');
          }}
          title='Are you sure?'
          body={
            <>
              <Label htmlFor='name'>Update field</Label>
              <Input
                id='name'
                name=''
                defaultValue=''
                onChange={(e) => console.log(e.target.value)}
                placeholder='Enter field value'
              />
            </>
          }
          closeTitle='Cancel'
          submitTitle='Confirm'
        />
      )}
      {openView && (
        <CommonModal
          modalSize='lg'
          isOpen={openView}
          onClose={() => setOpenView(false)}
          title='View Details'
          // subtitle='Viewing details of foo'
          body={<div className='h-[350px]'>view modal</div>}
          closeTitle='Close'
        />
      )}
      {openAdd && (
        <CommonModal
          isOpen={openAdd}
          modalSize='screen'
          onClose={() => setOpenAdd(false)}
          // onSubmit={() => {
          //   setOpenAdd(false);
          //   if (openAdd) toast.success('Status updated successfully !');
          // }}
          title='Add data form'
          body={<AddProductForm />}
        />
      )}
      {openDelete && (
        <CommonModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          title='Are you sure ?'
          body={
            <>
              <p>
                Are you sure you want to delete this Banner ? This action cannot
                be undone.
              </p>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    setOpenDelete(false);
                    if (openDelete)
                      toast.success('Banner Deleted successfully !');
                  }}
                >
                  Delete
                </Button>
                <Button variant='outline' onClick={() => setOpenDelete(false)}>
                  Cancel
                </Button>
              </div>
            </>
          }
        />
      )}
      {/* Table actions */}
      <div className='flex w-full flex-wrap items-center justify-between'>
        <div className='flex flex-1 flex-wrap items-center gap-4'>
          <DataTableSearch fetchData={fetchData} filterParams={{}} />
          <Combobox
            options={categories.map((category) => ({
              label: category.name,
              value: category.slug
            }))}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
              fetchData({ category: value });
            }}
            placeholder='Filter by category...'
            className='w-[250px]'
          />
        </div>
        <Button type='button' className='px-8' onClick={() => setOpenAdd(true)}>
          + Add
        </Button>
      </div>

      {products && (
        <DataTable
          columns={columns}
          data={products}
          fetchData={fetchData}
          filterParams={{}}
          totalItems={products.length}
        />
      )}
    </>
  );
}
