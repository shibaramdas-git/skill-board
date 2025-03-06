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
import { formatDate } from 'date-fns';
import { Eye, Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DatePicker } from '@/components/date-picker/date-picker';

export type IGameBids = {
  id: string;
  bidCreatedAt: string; //iso date
  bidId: string;
  userUniqueId: string;
  fullName: string;
  gameName: string;
  gameTypeTitle: string; // jipsum-10 | jipsum-20 | jipsum-50 | jipsum-100 | jipsum-1000 | jipsum-5000 | jipsum-10000
  gameSession: string;
  bidDigit: number;
  bidAmount: number;
  bidStatus: 0 | 1 | 2 | 3;
};
export const data: IGameBids[] = [
  {
    id: 'BID001',
    bidCreatedAt: '2025-02-21T10:00:00.000Z',
    bidId: 'GMB001',
    userUniqueId: 'USR001',
    fullName: 'John Doe',
    gameName: 'Mega Spin',
    gameTypeTitle: 'jipsum-100',
    gameSession: 'Open',
    bidDigit: 5,
    bidAmount: 200,
    bidStatus: 1
  },
  {
    id: 'BID002',
    bidCreatedAt: '2025-02-21T11:30:00.000Z',
    bidId: 'GMB002',
    userUniqueId: 'USR002',
    fullName: 'Jane Smith',
    gameName: 'Lucky Draw',
    gameTypeTitle: 'jipsum-50',
    gameSession: 'Close',
    bidDigit: 7,
    bidAmount: 150,
    bidStatus: 0
  },
  {
    id: 'BID003',
    bidCreatedAt: '2025-02-21T14:15:00.000Z',
    bidId: 'GMB003',
    userUniqueId: 'USR003',
    fullName: 'Alice Johnson',
    gameName: 'Wheel of Fortune',
    gameTypeTitle: 'jipsum-20',
    gameSession: 'Open',
    bidDigit: 2,
    bidAmount: 50,
    bidStatus: 2
  },
  {
    id: 'BID004',
    bidCreatedAt: '2025-02-21T09:45:00.000Z',
    bidId: 'GMB004',
    userUniqueId: 'USR004',
    fullName: 'Bob Williams',
    gameName: 'Mega Jackpot',
    gameTypeTitle: 'jipsum-500',
    gameSession: 'Close',
    bidDigit: 9,
    bidAmount: 500,
    bidStatus: 1
  },
  {
    id: 'BID005',
    bidCreatedAt: '2025-02-21T16:20:00.000Z',
    bidId: 'GMB005',
    userUniqueId: 'USR005',
    fullName: 'Charlie Brown',
    gameName: 'Power Bet',
    gameTypeTitle: 'jipsum-1000',
    gameSession: 'Open',
    bidDigit: 3,
    bidAmount: 1000,
    bidStatus: 3
  },
  {
    id: 'BID006',
    bidCreatedAt: '2025-02-21T18:10:00.000Z',
    bidId: 'GMB006',
    userUniqueId: 'USR006',
    fullName: 'David Miller',
    gameName: 'Spin & Win',
    gameTypeTitle: 'jipsum-10',
    gameSession: 'Close',
    bidDigit: 8,
    bidAmount: 20,
    bidStatus: 0
  },
  {
    id: 'BID007',
    bidCreatedAt: '2025-02-21T12:05:00.000Z',
    bidId: 'GMB007',
    userUniqueId: 'USR007',
    fullName: 'Emma Davis',
    gameName: 'Super Slots',
    gameTypeTitle: 'jipsum-5000',
    gameSession: 'Open',
    bidDigit: 6,
    bidAmount: 5000,
    bidStatus: 1
  },
  {
    id: 'BID008',
    bidCreatedAt: '2025-02-21T07:50:00.000Z',
    bidId: 'GMB008',
    userUniqueId: 'USR008',
    fullName: 'Frank Wilson',
    gameName: 'Money Madness',
    gameTypeTitle: 'jipsum-100',
    gameSession: 'Close',
    bidDigit: 1,
    bidAmount: 100,
    bidStatus: 2
  },
  {
    id: 'BID009',
    bidCreatedAt: '2025-02-21T13:40:00.000Z',
    bidId: 'GMB009',
    userUniqueId: 'USR009',
    fullName: 'Grace Lee',
    gameName: 'Big Win Roulette',
    gameTypeTitle: 'jipsum-50',
    gameSession: 'Open',
    bidDigit: 4,
    bidAmount: 50,
    bidStatus: 3
  },
  {
    id: 'BID010',
    bidCreatedAt: '2025-02-21T20:30:00.000Z',
    bidId: 'GMB010',
    userUniqueId: 'USR010',
    fullName: 'Henry Clark',
    gameName: 'Royal Blackjack',
    gameTypeTitle: 'jipsum-10000',
    gameSession: 'Close',
    bidDigit: 7,
    bidAmount: 10000,
    bidStatus: 1
  },
  {
    id: 'BID011',
    bidCreatedAt: '2025-02-21T15:55:00.000Z',
    bidId: 'GMB011',
    userUniqueId: 'USR011',
    fullName: 'Isla Moore',
    gameName: 'Golden Poker',
    gameTypeTitle: 'jipsum-20',
    gameSession: 'Open',
    bidDigit: 0,
    bidAmount: 20,
    bidStatus: 0
  },
  {
    id: 'BID012',
    bidCreatedAt: '2025-02-21T08:25:00.000Z',
    bidId: 'GMB012',
    userUniqueId: 'USR012',
    fullName: 'Jack White',
    gameName: 'Lucky Slots',
    gameTypeTitle: 'jipsum-500',
    gameSession: 'Close',
    bidDigit: 2,
    bidAmount: 500,
    bidStatus: 2
  }
];

export default function GameBids() {
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState<IGameBids[] | undefined>([]);

  const columns: ColumnDef<IGameBids>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'Username',
      accessorKey: 'userUniqueId',
      header: 'Username'
    },
    {
      id: 'Full name',
      accessorKey: 'fullName',
      header: 'Full Name'
    },
    {
      id: 'Bid created at',
      accessorKey: 'bidCreatedAt',
      header: 'Bid Created At',
      cell: ({ row }) => (
        <span>{formatDate(row.original.bidCreatedAt, 'Pp')}</span>
      )
    },
    {
      id: 'Provider',
      accessorKey: 'gameName',
      header: 'Provider',
      cell: ({ row }) => (
        <span className='text-muted-foreground'>{row.original.gameName}</span>
      )
    },
    {
      id: 'Game Type',
      accessorKey: 'gameTypeTitle',
      header: 'Game Type',
      cell: ({ row }) => (
        <span className='text-muted-foreground'>
          {row.original.gameTypeTitle}
        </span>
      )
    },
    {
      id: 'Game part',
      accessorKey: 'gameSession',
      header: 'Game part',
      cell: ({ row }) => (
        <>
          {row.original.gameSession === 'Open' ? (
            <div>
              <span className='mr-3 inline-block h-2 w-2 rounded-full bg-blue-500'></span>
              Open
            </div>
          ) : (
            <div>
              <span className='mr-3 inline-block h-2 w-2 rounded-full bg-gray-500'></span>
              Close
            </div>
          )}
        </>
      )
    },
    {
      id: 'Bid digit',
      accessorKey: 'bidDigit',
      header: 'Bid digit'
    },
    {
      id: 'Bid amount',
      accessorKey: 'bidAmount',
      header: 'Bid amount'
    },
    {
      id: 'Status',
      accessorKey: 'bidStatus',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.bidStatus;
        switch (status) {
          case 0:
            return <Badge variant='yellow'>Waiting</Badge>;
          case 1:
            return <Badge variant='green'>Won</Badge>;
          case 2:
            return <Badge variant='red'>Lost</Badge>;
          case 3:
            return <Badge variant='dark'>Returned</Badge>;
        }
      }
    },
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
      id: 'Actions',
      header: () => '',
      cell: ({ row }) => (
        <span className='inline-flex gap-2'>
          {/* <span
            className='cell-action-icon'
            onClick={() => setConfirmEdit(true)}
          >
            <Pencil size='16' />
          </span>
          <span className='cell-action-icon' onClick={() => setOpenView(true)}>
            <Eye size='16' />
          </span> */}
          <span
            className='cell-action-icon'
            onClick={() => setOpenDelete(true)}
          >
            <Trash size='16' />
          </span>
        </span>
      ),
      enableSorting: false,
      enableHiding: false
    }
  ];

  async function fetchData(filterParams: any) {
    const res = await axios.get('https://dummyjson.com/test', {
      params: filterParams
    });
  }

  function handleSelection(selectedRowsData?: IGameBids[]) {
    setSelectedRows(selectedRowsData);
    console.log(selectedRowsData);
  }
  return (
    <>
      {/* {confirmEdit && (
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
      )} */}
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
      {openDelete && (
        <CommonModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          title='Are you sure ?'
          body={
            <>
              <p>
                Are you sure you want to{' '}
                <span className='text-red-500'>delete bids</span> ? This action
                cannot be undone.
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
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <DatePicker />
          <Select>
            <SelectTrigger className='w-[160px]'>
              <SelectValue placeholder='Filter by provider' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='provider1'>lorem provider 1</SelectItem>
              <SelectItem value='provider2'>lorem provider 1</SelectItem>
              <SelectItem value='provider3'>lorem provider 1</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className='w-[160px]'>
              <SelectValue placeholder='Filter by bid Part' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='open'>Open</SelectItem>
              <SelectItem value='close'>Close</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-1 justify-end gap-4'>
          <DataTableSearch fetchData={fetchData} filterParams={{}} />
          <Button
            disabled={selectedRows?.length === 0}
            onClick={() => {
              setOpenDelete(true);
              setSelectedRows([]);
            }}
          >
            Delete all bids
          </Button>
        </div>
      </div>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          filterParams={{}}
          totalItems={data.length}
          handleSelection={handleSelection}
        />
      )}
    </>
  );
}
