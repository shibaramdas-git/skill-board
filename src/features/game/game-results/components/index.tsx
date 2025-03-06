'use client';
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
import { Ellipsis, Eye, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export type IGameResults = {
  gameName: string;
  OBT: string;
  OBRT: string;
  CBT: string;
  CBRT: string;

  // text: string;
  // isOpen: boolean;
};
export const data: IGameResults[] = [
  {
    gameName: 'Carrom A',
    OBT: '09:00',
    OBRT: '09:10',
    CBT: '09:30',
    CBRT: '09:40'
  },
  {
    gameName: 'Carrom B',
    OBT: '10:00',
    OBRT: '10:10',
    CBT: '10:30',
    CBRT: '10:40'
  }
];

export default function GameResults() {
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const columns: ColumnDef<IGameResults>[] = [
    {
      id: 'Provider',
      accessorKey: 'gameName',
      header: 'Provider'
    },
    {
      id: 'OBTime',
      accessorKey: 'OBT',
      header: 'OBT'
    },
    {
      id: 'OBRTime',
      accessorKey: 'OBRT',
      header: 'OBRT'
    },
    {
      id: 'Open part',
      accessorKey: 'Open part',
      header: 'Open part',
      cell: ({ row }) => (
        <div className='inline-flex items-center'>
          <Input
            type='number'
            defaultValue={'0'}
            className='no-spinner h-8 w-[100px] text-center'
          />
          <span className='cell-action-icon ml-2'>
            <Ellipsis size={16} />
          </span>
        </div>
      )
    },
    // --------------------------------------------------
    {
      id: 'CBTime',
      accessorKey: 'CBT',
      header: 'CBT'
    },
    {
      id: 'CBRTime',
      accessorKey: 'CBRT',
      header: 'CBRT'
    },
    {
      id: 'Close part',
      accessorKey: 'Close part',
      header: 'Close part',
      cell: ({ row }) => (
        <div className='inline-flex items-center'>
          <Input
            type='number'
            defaultValue={'0'}
            className='no-spinner h-8 w-[100px] text-center'
          />
          <span className='cell-action-icon ml-2'>
            <Ellipsis size={16} />
          </span>
        </div>
      )
    }

    // {
    //   id: 'Text field',
    //   accessorKey: 'text',
    //   header: 'Heading'
    // },
    // {
    //   id: 'Open/Closed',
    //   accessorKey: 'isOpen',
    //   header: 'Open/Closed',
    //   cell: ({ row }) => {
    //     const [toggle, setToggle] = useState(false);
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

  async function fetchData(filterParams: any) {
    const res = await axios.get('https://dummyjson.com/test', {
      params: filterParams
    });
  }
  return (
    <div>
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
          onClose={() => setOpenAdd(false)}
          onSubmit={() => {
            setOpenAdd(false);
            if (openAdd) toast.success('Status updated successfully !');
          }}
          title='Add data form'
          body={
            <div className='flex flex-col gap-4'>
              <div>
                <Label htmlFor='name'>Add new data</Label>
                <Input
                  id='field 1'
                  name=''
                  defaultValue=''
                  onChange={(e) => console.log(e.target.value)}
                  placeholder='Enter field 1 value'
                />
              </div>
              <div>
                <Label htmlFor='name'>Add new data</Label>

                <Input
                  id='field 2'
                  name=''
                  defaultValue=''
                  onChange={(e) => console.log(e.target.value)}
                  placeholder='Enter field 2 value'
                />
              </div>
            </div>
          }
          closeTitle='Cancel'
          submitTitle='Submit'
        />
      )}
      {/* Table actions */}
      <div className='mb-4 flex justify-between'>
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
      <div className='fixed inset-0 flex items-center justify-center bg-white/10'>
        <div className='-rotate-45 text-7xl font-thin text-muted-foreground opacity-40'>
          !! Work In Progress !!
        </div>
      </div>
    </div>
  );
}
