'use client';
import React, { useState } from 'react';
import { CommonModal } from '@/components/modal/common-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export type IUser = {
  uniqueId: string;
  fullName: string;
  deposit: number;
  withdrawl: number;
  bidCount: number;
  bidPoints: number;
  bidWinPoints: number;
  userPnl: number;
  bidPnl: number;
};
export const data: IUser[] = [
  {
    uniqueId: 'USR001',
    fullName: 'John Doe',
    deposit: 5000,
    withdrawl: 2000,
    bidCount: 50,
    bidPoints: 1200,
    bidWinPoints: 800,
    userPnl: 600,
    bidPnl: -200
  },
  {
    uniqueId: 'USR002',
    fullName: 'Jane Smith',
    deposit: 7000,
    withdrawl: 3000,
    bidCount: 65,
    bidPoints: 1500,
    bidWinPoints: 900,
    userPnl: -750,
    bidPnl: 250
  },
  {
    uniqueId: 'USR003',
    fullName: 'Alice Johnson',
    deposit: 3000,
    withdrawl: 1000,
    bidCount: 40,
    bidPoints: 1000,
    bidWinPoints: 700,
    userPnl: 500,
    bidPnl: -180
  },
  {
    uniqueId: 'USR004',
    fullName: 'Bob Williams',
    deposit: 4500,
    withdrawl: 2500,
    bidCount: 55,
    bidPoints: 1300,
    bidWinPoints: 850,
    userPnl: -620,
    bidPnl: 230
  },
  {
    uniqueId: 'USR005',
    fullName: 'Charlie Brown',
    deposit: 8000,
    withdrawl: 5000,
    bidCount: 80,
    bidPoints: 2000,
    bidWinPoints: 1500,
    userPnl: 900,
    bidPnl: 350
  },
  {
    uniqueId: 'USR006',
    fullName: 'David Miller',
    deposit: 6000,
    withdrawl: 2500,
    bidCount: 70,
    bidPoints: 1600,
    bidWinPoints: 1100,
    userPnl: 770,
    bidPnl: 270
  },
  {
    uniqueId: 'USR007',
    fullName: 'Emma Davis',
    deposit: 5500,
    withdrawl: 2200,
    bidCount: 60,
    bidPoints: 1400,
    bidWinPoints: 900,
    userPnl: 650,
    bidPnl: 240
  },
  {
    uniqueId: 'USR008',
    fullName: 'Frank Wilson',
    deposit: 4000,
    withdrawl: 1800,
    bidCount: 50,
    bidPoints: 1100,
    bidWinPoints: 750,
    userPnl: -580,
    bidPnl: -190
  },
  {
    uniqueId: 'USR009',
    fullName: 'Grace Lee',
    deposit: 7500,
    withdrawl: 4000,
    bidCount: 90,
    bidPoints: 2100,
    bidWinPoints: 1600,
    userPnl: 980,
    bidPnl: 380
  },
  {
    uniqueId: 'USR010',
    fullName: 'Henry Clark',
    deposit: 5000,
    withdrawl: 2000,
    bidCount: 55,
    bidPoints: 1250,
    bidWinPoints: 800,
    userPnl: 600,
    bidPnl: 200
  },
  {
    uniqueId: 'USR011',
    fullName: 'Isla Moore',
    deposit: 6500,
    withdrawl: 3500,
    bidCount: 75,
    bidPoints: 1700,
    bidWinPoints: 1200,
    userPnl: -820,
    bidPnl: 290
  },
  {
    uniqueId: 'USR012',
    fullName: 'Jack White',
    deposit: 4800,
    withdrawl: 2100,
    bidCount: 60,
    bidPoints: 1350,
    bidWinPoints: 870,
    userPnl: -640,
    bidPnl: 220
  }
];

export default function UserAnalysis() {
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const columns: ColumnDef<IUser>[] = [
    {
      id: 'Username',
      accessorKey: 'uniqueId',
      header: 'Username'
    },
    {
      id: 'Full Name',
      accessorKey: 'fullName',
      header: 'Full Name'
    },
    {
      id: 'Deposit',
      accessorKey: 'deposit',
      header: 'Deposit'
    },
    {
      id: 'Withdrawl',
      accessorKey: 'withdrawl',
      header: 'Withdrawl'
    },
    {
      id: 'Bid counts',
      accessorKey: 'bidCount',
      header: 'Bid counts'
    },
    {
      id: 'Bid points',
      accessorKey: 'bidPoints',
      header: 'Bid points'
    },
    {
      id: 'Bid win points',
      accessorKey: 'bidWinPoints',
      header: 'Bid win points'
    },
    {
      id: 'User Pnl',
      accessorKey: 'userPnl',
      header: 'User Pnl',
      cell: ({ row }) => (
        <div
          className={cn(
            row.original.userPnl > 0 ? 'text-green-400' : 'text-red-400',
            'text-center'
          )}
        >
          {row.original.userPnl}
        </div>
      )
    },
    {
      id: 'Bid Pnl',
      accessorKey: 'bidPnl',
      header: 'Bid Pnl',
      cell: ({ row }) => (
        <div
          className={cn(
            row.original.bidPnl > 0 ? 'text-green-400' : 'text-red-400',
            'text-center'
          )}
        >
          {row.original.bidPnl}
        </div>
      )
    }
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
    </>
  );
}
