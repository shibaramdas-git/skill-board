'use client';
import { CommonModal } from '@/components/modal/common-modal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import RateEditForm from './edit-form';
import AddRateForm from './add-form';

export type IGameRates = {
  rateName: string;
  rate: string;
};
export const data: IGameRates[] = [
  { rateName: 'jipsum-10', rate: '10' },
  { rateName: 'jipsum-20', rate: '20' },
  { rateName: 'jipsum-50', rate: '50' },
  { rateName: 'jipsum-100', rate: '100' },
  { rateName: 'jipsum-1000', rate: '1000' },
  { rateName: 'jipsum-5000', rate: '5000' },
  { rateName: 'jipsum-10000', rate: '10000' }
];

export default function GameRates() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const columns: ColumnDef<IGameRates>[] = [
    {
      id: 'Name',
      accessorKey: 'rateName',
      header: 'Name'
    },
    {
      id: 'Rate',
      accessorKey: 'rate',
      header: 'Rate'
    },
    {
      id: 'Actions',
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <span className='cell-action-icon' onClick={() => setOpenEdit(true)}>
          <Pencil size='16' />
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
          title='Update provider details'
          body={
            <RateEditForm
              initialData={data[0]}
              onSubmit={() => {
                setOpenEdit(false);
                if (openEdit) toast.success('Status updated successfully !');
              }}
              onClose={() => setOpenEdit(false)}
            />
          }
        />
      )}

      {openAdd && (
        <CommonModal
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onSubmit={() => {
            setOpenAdd(false);
            if (openAdd) toast.success('Status updated successfully !');
          }}
          title='Add new rates'
          body={
            <AddRateForm
              initialData={{ rateName: '', rate: '' }}
              onSubmit={() => {
                setOpenAdd(false);
                if (openAdd) toast.success('Status updated successfully !');
              }}
              onClose={() => setOpenAdd(false)}
            />
          }
        />
      )}
      {/* Table actions */}
      <div className='flex justify-between gap-4'>
        <DataTableSearch fetchData={fetchData} filterParams={{}} />
        <Button onClick={() => setOpenAdd(true)}>+ Add New Rate</Button>
      </div>

      {data && (
        <DataTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          filterParams={{}}
          totalItems={data.length}
          disablePagination
        />
      )}
    </>
  );
}
