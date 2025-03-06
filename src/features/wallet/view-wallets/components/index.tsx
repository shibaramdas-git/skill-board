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
import {
  ArrowLeftRight,
  ArrowLeftRightIcon,
  Ellipsis,
  Eye,
  Landmark,
  Pencil
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export type IViewWallets = {
  fullname: string;
  userUniqueId: string;
  mobile: string;
  userBalance: number;
  userPnl: number;
  bidsWin: number;
  balanceUpdatedAt: string; //iso data timestamp
  userStatus: { status: 1 | 2 | 3; message: string };
};
export const data: IViewWallets[] = [
  {
    fullname: 'John Doe',
    userUniqueId: 'U1001',
    mobile: '1234567890',
    userBalance: 10000,
    userPnl: 500,
    bidsWin: 120,
    balanceUpdatedAt: new Date().toISOString(),
    userStatus: { status: 1, message: 'Active user' }
  },
  {
    fullname: 'John Doe 2',
    userUniqueId: 'U1002',
    mobile: '1234567890',
    userBalance: 10000,
    userPnl: 500,
    bidsWin: 120,
    balanceUpdatedAt: new Date().toISOString(),
    userStatus: { status: 1, message: 'Active user' }
  }
];

export default function ViewWallets() {
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const columns: ColumnDef<IViewWallets>[] = [
    {
      id: 'Account details',
      cell: ({ row }) => (
        <span className='inline-flex rounded-full bg-primary p-[6px]'>
          <ArrowLeftRight size={14} />
        </span>
      )
    },
    {
      id: 'User name',
      accessorKey: 'userUniqueId',
      header: 'User name',
      cell: ({ row }) => (
        <div className='w-[150px]'>
          <div className='text-nowrap'>{row.original.fullname}</div>
          <div className='text-sm text-muted-foreground'>
            {row.original.userUniqueId}
          </div>
        </div>
      )
    },
    {
      id: 'Mobile',
      accessorKey: 'mobile',
      header: 'Mobile'
    },
    {
      id: 'User Balance',
      accessorKey: 'userBalance',
      header: 'User Balance'
    },
    {
      id: 'P/L',
      accessorKey: 'userPnl',
      header: 'P/L'
    },
    {
      id: 'B/W',
      accessorKey: 'bidsWin',
      header: 'B/W'
    },
    {
      id: 'Last updated on',
      accessorKey: 'balanceUpdatedAt',
      header: 'Last updated on'
    },
    // {
    //   id: 'B/W',
    //   accessorKey: 'bidsWin',
    //   header: 'B/W'
    // },
    // {
    //   id: 'B/W',
    //   accessorKey: 'bidsWin',
    //   header: 'B/W'
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
    {
      id: 'Transactions',
      header: 'Transactions',
      cell: ({ row }) => (
        <span className='inline-flex gap-2'>
          <span
            className='cell-action-icon'
            onClick={() => setConfirmEdit(true)}
          >
            All
          </span>
          <span className='cell-action-icon' onClick={() => setOpenView(true)}>
            Bids
          </span>
          <span className='cell-action-icon' onClick={() => setOpenView(true)}>
            PG
          </span>
          <span className='cell-action-icon' onClick={() => setOpenView(true)}>
            WD
          </span>
          <span className='cell-action-icon' onClick={() => setOpenView(true)}>
            <Ellipsis size='16' />
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
      <div className='fixed inset-0 flex items-center justify-center bg-white/10'>
        <div className='-rotate-45 text-7xl font-thin text-muted-foreground opacity-40'>
          !! Work In Progress !!
        </div>
      </div>
    </div>
  );
}
