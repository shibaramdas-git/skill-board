'use client';
import { FileUploader } from '@/components/file-uploader';
import { CommonModal } from '@/components/modal/common-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Eye, Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export type IBanners = {
  bannerId: string;
  thumbnailUri: string;
  title: string;
  isActive: boolean;
};
export const data: IBanners[] = [
  {
    bannerId: '1',
    thumbnailUri: 'https://picsum.photos/seed/1/600/300',
    title: 'Winter Sale - Up to 50% Off!',
    isActive: true
  },
  {
    bannerId: '2',
    thumbnailUri: 'https://picsum.photos/seed/2/600/300',
    title: 'New Arrivals - Fresh Styles for You',
    isActive: false
  },
  {
    bannerId: '3',
    thumbnailUri: 'https://picsum.photos/seed/3/600/300',
    title: 'Exclusive Deals for Members Only',
    isActive: true
  },
  {
    bannerId: '4',
    thumbnailUri: 'https://picsum.photos/seed/4/600/300',
    title: 'Limited Time Offer - Grab It Now!',
    isActive: false
  },
  {
    bannerId: '5',
    thumbnailUri: 'https://picsum.photos/seed/5/600/300',
    title: 'Flash Sale - Hurry Before It Ends!',
    isActive: true
  },
  {
    bannerId: '6',
    thumbnailUri: 'https://picsum.photos/seed/6/600/300',
    title: 'Trending Now - Best Picks of the Season',
    isActive: false
  },
  {
    bannerId: '7',
    thumbnailUri: 'https://picsum.photos/seed/7/600/300',
    title: 'Mega Discount Weekend!',
    isActive: true
  },
  {
    bannerId: '8',
    thumbnailUri: 'https://picsum.photos/seed/8/600/300',
    title: 'Shop the Latest Tech Gadgets',
    isActive: false
  },
  {
    bannerId: '9',
    thumbnailUri: 'https://picsum.photos/seed/9/600/300',
    title: 'Special Festival Discounts Inside!',
    isActive: true
  },
  {
    bannerId: '10',
    thumbnailUri: 'https://picsum.photos/seed/10/600/300',
    title: 'Unmissable Offers - Save Big Today',
    isActive: false
  },
  {
    bannerId: '11',
    thumbnailUri: 'https://picsum.photos/seed/11/600/300',
    title: 'Premium Quality, Affordable Prices',
    isActive: true
  },
  {
    bannerId: '12',
    thumbnailUri: 'https://picsum.photos/seed/12/600/300',
    title: "Best Sellers You Can't Ignore!",
    isActive: false
  }
];

export default function Banners() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const [toggle, setToggle] = useState(false);

  const columns: ColumnDef<IBanners>[] = [
    {
      id: 'Thumbnail',
      accessorKey: 'thumbnailUri',
      header: 'Thumbnail',
      cell: ({ row }) => (
        <img
          src={row.original.thumbnailUri}
          alt='thumbnail'
          className='h-10 w-10 cursor-pointer rounded-full'
          onClick={() => {
            setSelectedImg(row.original.thumbnailUri);
            setOpenView(true);
          }}
        />
      )
    },
    {
      id: 'Banner Id',
      accessorKey: 'bannerId',
      header: 'Banner Id'
    },
    {
      id: 'Banner Title',
      accessorKey: 'title',
      header: 'Banner Title'
    },
    {
      id: 'Active / Inactive',
      accessorKey: 'isActive',
      header: 'Active / Inactive',
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.original.isActive}
            onCheckedChange={() => {
              setToggle((prev) => !prev);
              toggle
                ? toast.error('Failed to update status!')
                : toast.success('Status updated successfully!');
            }}
          />
        );
      }
    },
    {
      id: 'Actions',
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <span className='inline-flex gap-2'>
          <span className='cell-action-icon' onClick={() => setOpenEdit(true)}>
            <Pencil size='16' />
          </span>
          <span
            className='cell-action-icon'
            onClick={() => setOpenDelete(true)}
          >
            <Trash size='16' />
          </span>
        </span>
      )
    }
  ];

  async function fetchData(filterParams: any) {
    const res = await axios.get('https://dummyjson.com/test', {
      params: filterParams
    });
  }
  return (
    <>
      {openEdit && (
        <CommonModal
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={() => {
            setOpenEdit(false);
            if (openEdit) toast.success('Banner updated successfully !');
          }}
          title='Are you sure?'
          body={
            <div className='flex flex-col gap-6'>
              <div>
                <Label htmlFor='title' className='mb-3 block'>
                  Banner title
                </Label>
                <Input
                  id='title'
                  name='title'
                  defaultValue='Banner title'
                  onChange={(e) => console.log(e.target.value)}
                  placeholder='Enter banner title'
                  required
                />
              </div>
              <div>
                <Label htmlFor='thumbnailUri' className='mb-3 block'>
                  Banner thumbnail image
                </Label>
                <Input
                  type='file'
                  accept='.jpg, .jpeg, .png, .gif, .pdf'
                  onChange={(e) => console.log(e.target.value)}
                />
                <span className='my-4 inline-block'>OR</span>
                <FileUploader />
              </div>
            </div>
          }
          closeTitle='Cancel'
          submitTitle='Update'
        />
      )}
      {openView && (
        <CommonModal
          modalSize='lg'
          isOpen={openView}
          onClose={() => setOpenView(false)}
          title='Banner thumbnail image'
          // subtitle='Viewing details of foo'
          body={
            <div className=''>
              <img src={selectedImg} className='rounded-sm' />
            </div>
          }
          closeTitle='Close'
        />
      )}
      {openAdd && (
        <CommonModal
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onSubmit={() => {
            setOpenAdd(false);
            if (openAdd) toast.success('Banner added successfully !');
          }}
          title='Add data form'
          body={
            <div className='flex flex-col gap-6'>
              <div>
                <Label htmlFor='title' className='mb-3 block'>
                  Banner title
                </Label>
                <Input
                  id='title'
                  name='title'
                  defaultValue=''
                  onChange={(e) => console.log(e.target.value)}
                  placeholder='Enter banner title'
                  required
                  minLength={5}
                />
              </div>
              <div>
                <Label htmlFor='thumbnailUri' className='mb-3 block'>
                  Banner thumbnail image
                </Label>
                <Input
                  type='file'
                  accept='.jpg, .jpeg, .png, .gif, .pdf'
                  onChange={(e) => console.log(e.target.value)}
                />
                <span className='my-4 inline-block'>OR</span>
                <FileUploader />
              </div>
            </div>
          }
          closeTitle='Cancel'
          submitTitle='Submit'
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
      <div className='flex justify-between gap-4'>
        <DataTableSearch fetchData={fetchData} filterParams={{}} />
        <>
          <Button onClick={() => setOpenAdd(true)}>+ Add data</Button>
        </>
      </div>

      {data && (
        <DataTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          filterParams={{}}
          totalItems={data.length}
        />
      )}
    </>
  );
}
