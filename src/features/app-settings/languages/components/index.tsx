'use client';
import { CommonModal } from '@/components/modal/common-modal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Pencil, Send, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import NotificationAddForm from './add-form';
import { Switch } from '@/components/ui/switch';
import LanguageAddForm from './add-form';

export type ILanguages = {
  slug: string;
  name: string;
  isActive: boolean;
  id: string;
};
export const data: ILanguages[] = [
  { slug: 'en', name: 'English', isActive: true, id: '1' },
  { slug: 'es', name: 'Spanish', isActive: true, id: '2' },
  { slug: 'fr', name: 'French', isActive: true, id: '3' },
  { slug: 'de', name: 'German', isActive: false, id: '4' },
  { slug: 'zh', name: 'Chinese', isActive: true, id: '5' },
  { slug: 'hi', name: 'Hindi', isActive: false, id: '6' },
  { slug: 'ar', name: 'Arabic', isActive: true, id: '7' },
  { slug: 'ru', name: 'Russian', isActive: false, id: '8' },
  { slug: 'ja', name: 'Japanese', isActive: true, id: '9' },
  { slug: 'it', name: 'Italian', isActive: false, id: '10' },
  { slug: 'pt', name: 'Portuguese', isActive: true, id: '11' },
  { slug: 'ko', name: 'Korean', isActive: false, id: '12' }
];

export default function Languages() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [toggle, setToggle] = useState(false);

  const columns: ColumnDef<ILanguages>[] = [
    { id: 'Language', accessorKey: 'slug', header: 'Language' },
    {
      id: 'Language name',
      accessorKey: 'name',
      header: 'Language name'
    },
    {
      id: 'Active status',
      accessorKey: 'isActive',
      header: 'Active status',
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
            className='cell-action-icon text-red-400'
            onClick={() => setOpenDelete(true)}
          >
            <Trash size={17} />
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
          title='Update language'
          body={
            <LanguageAddForm
              addLanguage={{ loading: false }}
              setOpenAdd={setOpenEdit}
            />
          }
        />
      )}
      {openAdd && (
        <CommonModal
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          title='Add Notification'
          body={
            <LanguageAddForm
              addLanguage={{ loading: false }}
              setOpenAdd={setOpenAdd}
            />
          }
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
                Are you sure you want to{' '}
                <span className='text-red-500'>delete this Language</span> ?
                This action cannot be undone.
              </p>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    setOpenDelete(false);
                    if (openDelete)
                      toast.success('Language Deleted successfully !');
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
        <Button onClick={() => setOpenAdd(true)}>+ Add Notification</Button>
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
