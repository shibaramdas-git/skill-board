'use client';
import { DatePickerWithRange } from '@/components/date-picker/date-range-picker';
import { CommonModal } from '@/components/modal/common-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { formatDate } from 'date-fns';
import { Check, Copy, Eye, Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export type IFundRequestHistory = {
  userUniqueId: string;
  fullname: string;
  transactionAmount: number;
  walletBalance: number;
  updatedBalance: number;
  pnl: number; // +ve and -ve
  orderId: string;
  approvedByName: string;
  processedByName: string;
  status: 'Success' | 'Failed' | 'Declined';
  createdAt: string; //iso data time
};
export const data: IFundRequestHistory[] = [
  {
    userUniqueId: 'U1001',
    fullname: 'John Doe',
    transactionAmount: 500,
    walletBalance: 1500,
    updatedBalance: 2000,
    pnl: 500,
    orderId: 'ORD12345',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Success',
    createdAt: '2025-02-21T10:15:30Z'
  },
  {
    userUniqueId: 'U1002',
    fullname: 'Alice Johnson',
    transactionAmount: 300,
    walletBalance: 1000,
    updatedBalance: 1300,
    pnl: 300,
    orderId: 'ORD12346',
    approvedByName: 'Admin2',
    processedByName: 'Finance2',
    status: 'Success',
    createdAt: '2025-02-20T12:45:00Z'
  },
  {
    userUniqueId: 'U1003',
    fullname: 'Michael Smith',
    transactionAmount: 700,
    walletBalance: 2000,
    updatedBalance: 2700,
    pnl: 700,
    orderId: 'ORD12347',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Success',
    createdAt: '2025-02-19T09:30:45Z'
  },
  {
    userUniqueId: 'U1005',
    fullname: 'James Brown',
    transactionAmount: 600,
    walletBalance: 1800,
    updatedBalance: 2400,
    pnl: 600,
    orderId: 'ORD12349',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Success',
    createdAt: '2025-02-17T16:10:55Z'
  },
  {
    userUniqueId: 'U1007',
    fullname: 'Daniel Martinez',
    transactionAmount: 900,
    walletBalance: 2500,
    updatedBalance: 3400,
    pnl: 900,
    orderId: 'ORD12351',
    approvedByName: 'Admin3',
    processedByName: 'Finance3',
    status: 'Success',
    createdAt: '2025-02-15T08:55:45Z'
  },
  {
    userUniqueId: 'U1008',
    fullname: 'Olivia Anderson',
    transactionAmount: 750,
    walletBalance: 2100,
    updatedBalance: 2850,
    pnl: 750,
    orderId: 'ORD12352',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Success',
    createdAt: '2025-02-14T13:40:20Z'
  },
  {
    userUniqueId: 'U1009',
    fullname: 'Ethan Thomas',
    transactionAmount: 350,
    walletBalance: 1300,
    updatedBalance: 1650,
    pnl: 350,
    orderId: 'ORD12353',
    approvedByName: 'Admin2',
    processedByName: 'Finance2',
    status: 'Success',
    createdAt: '2025-02-13T15:25:10Z'
  },
  {
    userUniqueId: 'U1010',
    fullname: 'Ava White',
    transactionAmount: 550,
    walletBalance: 1750,
    updatedBalance: 2300,
    pnl: 550,
    orderId: 'ORD12354',
    approvedByName: 'Admin3',
    processedByName: 'Finance3',
    status: 'Success',
    createdAt: '2025-02-12T17:15:35Z'
  }
];
export const data2: IFundRequestHistory[] = [
  {
    userUniqueId: 'U1001',
    fullname: 'John Doe',
    transactionAmount: 500,
    walletBalance: 1500,
    updatedBalance: 2000,
    pnl: 500,
    orderId: 'ORD12345',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Failed',
    createdAt: '2025-02-21T10:15:30Z'
  },
  {
    userUniqueId: 'U1002',
    fullname: 'Alice Johnson',
    transactionAmount: 300,
    walletBalance: 1000,
    updatedBalance: 1300,
    pnl: 300,
    orderId: 'ORD12346',
    approvedByName: 'Admin2',
    processedByName: 'Finance2',
    status: 'Failed',
    createdAt: '2025-02-20T12:45:00Z'
  },
  {
    userUniqueId: 'U1003',
    fullname: 'Michael Smith',
    transactionAmount: 700,
    walletBalance: 2000,
    updatedBalance: 2700,
    pnl: 700,
    orderId: 'ORD12347',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Failed',
    createdAt: '2025-02-19T09:30:45Z'
  },
  {
    userUniqueId: 'U1004',
    fullname: 'Emily Davis',
    transactionAmount: 200,
    walletBalance: 800,
    updatedBalance: 1000,
    pnl: 200,
    orderId: 'ORD12348',
    approvedByName: 'Admin3',
    processedByName: 'Finance3',
    status: 'Failed',
    createdAt: '2025-02-18T14:20:15Z'
  },
  {
    userUniqueId: 'U1005',
    fullname: 'James Brown',
    transactionAmount: 600,
    walletBalance: 1800,
    updatedBalance: 2400,
    pnl: 600,
    orderId: 'ORD12349',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Failed',
    createdAt: '2025-02-17T16:10:55Z'
  },
  {
    userUniqueId: 'U1006',
    fullname: 'Sophia Wilson',
    transactionAmount: 400,
    walletBalance: 1200,
    updatedBalance: 1600,
    pnl: 400,
    orderId: 'ORD12350',
    approvedByName: 'Admin2',
    processedByName: 'Finance2',
    status: 'Failed',
    createdAt: '2025-02-16T11:05:30Z'
  },
  {
    userUniqueId: 'U1007',
    fullname: 'Daniel Martinez',
    transactionAmount: 900,
    walletBalance: 2500,
    updatedBalance: 3400,
    pnl: 900,
    orderId: 'ORD12351',
    approvedByName: 'Admin3',
    processedByName: 'Finance3',
    status: 'Failed',
    createdAt: '2025-02-15T08:55:45Z'
  },
  {
    userUniqueId: 'U1008',
    fullname: 'Olivia Anderson',
    transactionAmount: 750,
    walletBalance: 2100,
    updatedBalance: 2850,
    pnl: 750,
    orderId: 'ORD12352',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Failed',
    createdAt: '2025-02-14T13:40:20Z'
  }
];
export const data3: IFundRequestHistory[] = [
  {
    userUniqueId: 'U1001',
    fullname: 'John Doe',
    transactionAmount: 500,
    walletBalance: 1500,
    updatedBalance: 2000,
    pnl: 500,
    orderId: 'ORD12345',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Declined',
    createdAt: '2025-02-21T10:15:30Z'
  },
  {
    userUniqueId: 'U1002',
    fullname: 'Alice Johnson',
    transactionAmount: 300,
    walletBalance: 1000,
    updatedBalance: 1300,
    pnl: 300,
    orderId: 'ORD12346',
    approvedByName: 'Admin2',
    processedByName: 'Finance2',
    status: 'Declined',
    createdAt: '2025-02-20T12:45:00Z'
  },
  {
    userUniqueId: 'U1003',
    fullname: 'Michael Smith',
    transactionAmount: 700,
    walletBalance: 2000,
    updatedBalance: 2700,
    pnl: 700,
    orderId: 'ORD12347',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Declined',
    createdAt: '2025-02-19T09:30:45Z'
  },
  {
    userUniqueId: 'U1004',
    fullname: 'Emily Davis',
    transactionAmount: 200,
    walletBalance: 800,
    updatedBalance: 1000,
    pnl: 200,
    orderId: 'ORD12348',
    approvedByName: 'Admin3',
    processedByName: 'Finance3',
    status: 'Declined',
    createdAt: '2025-02-18T14:20:15Z'
  },
  {
    userUniqueId: 'U1005',
    fullname: 'James Brown',
    transactionAmount: 600,
    walletBalance: 1800,
    updatedBalance: 2400,
    pnl: 600,
    orderId: 'ORD12349',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Declined',
    createdAt: '2025-02-17T16:10:55Z'
  },
  {
    userUniqueId: 'U1006',
    fullname: 'Sophia Wilson',
    transactionAmount: 400,
    walletBalance: 1200,
    updatedBalance: 1600,
    pnl: 400,
    orderId: 'ORD12350',
    approvedByName: 'Admin2',
    processedByName: 'Finance2',
    status: 'Declined',
    createdAt: '2025-02-16T11:05:30Z'
  },
  {
    userUniqueId: 'U1007',
    fullname: 'Daniel Martinez',
    transactionAmount: 900,
    walletBalance: 2500,
    updatedBalance: 3400,
    pnl: 900,
    orderId: 'ORD12351',
    approvedByName: 'Admin3',
    processedByName: 'Finance3',
    status: 'Declined',
    createdAt: '2025-02-15T08:55:45Z'
  },
  {
    userUniqueId: 'U1008',
    fullname: 'Olivia Anderson',
    transactionAmount: 750,
    walletBalance: 2100,
    updatedBalance: 2850,
    pnl: 750,
    orderId: 'ORD12352',
    approvedByName: 'Admin1',
    processedByName: 'Finance1',
    status: 'Declined',
    createdAt: '2025-02-14T13:40:20Z'
  }
];

export default function FundRequestHistory() {
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toggle, setToggle] = useState(false);

  const columns: ColumnDef<IFundRequestHistory>[] = [
    {
      id: 'User name',
      accessorKey: 'userUniqueId',
      header: () => <span className=''>User name</span>,
      cell: ({ row }) => (
        <div className='w-[140px]'>
          <div className='text-nowrap'>{row.original.fullname}</div>
          <div className='text-sm text-muted-foreground'>
            {row.original.userUniqueId}
          </div>
        </div>
      )
    },
    {
      id: 'Requested Amount',
      accessorKey: 'transactionAmount',
      header: () => <div className='w-[80px]'>Requested Amount</div>
    },
    {
      id: 'Wallet Balance',
      accessorKey: 'walletBalance',
      header: () => <div className='w-[80px]'>Wallet Balance</div>
    },
    {
      id: 'Updated Balance',
      accessorKey: 'updatedBalance',
      header: () => <div className='w-[80px]'>Updated Balance</div>
    },
    {
      id: 'P/L',
      accessorKey: 'pnl',
      header: 'P/L',
      cell: ({ row }) => (
        <div
          className={cn(
            row.original.pnl > 0 ? 'text-green-400' : 'text-red-400'
          )}
        >
          {row.original.pnl}
        </div>
      )
    },
    {
      id: 'Order ID',
      accessorKey: 'orderId',
      header: 'Order ID'
    },
    {
      id: 'Approved By',
      accessorKey: 'approvedByName',
      header: 'Approved By'
    },
    {
      id: 'Processed By',
      accessorKey: 'processedByName',
      header: 'Processed By'
    },
    {
      id: 'Status',
      accessorKey: 'status',
      header: () => <div className='w-[80px]'>Status</div>,
      cell: ({ row }) => {
        switch (row.original.status) {
          case 'Success':
            return <Badge variant='green'>{row.original.status}</Badge>;
          case 'Failed':
            return <Badge variant='red'>{row.original.status}</Badge>;
          case 'Declined':
            return <Badge variant='dark'>{row.original.status}</Badge>;
        }
      }
    },
    {
      id: 'Requested At',
      accessorKey: 'createdAt',
      header: 'Requested At',
      cell: ({ row }) => <div>{formatDate(row.original.createdAt, 'Pp')}</div>
    },
    {
      id: 'Copy',
      header: 'Copy',
      cell: ({ row }) => {
        return (
          <span
            className='cell-action-icon'
            onClick={() => {
              setToggle((prev) => !prev);
              toggle
                ? toast.error('Failed to copy!')
                : toast.success('Copied!');
            }}
          >
            <Copy size={16} />
          </span>
        );
      }
    }
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
  const tabs = [
    { status: 'SUCCESS', label: 'Success' },
    { status: 'FAILED', label: 'Failed' },
    { status: 'DECLINED', label: 'Declined' }
  ];

  async function fetchData(filterParams: any) {
    const res = await axios.get('https://dummyjson.com/test', {
      params: filterParams
    });
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
      )} */}
      {/* Table actions */}
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <DatePickerWithRange />
          <Select
            onValueChange={(value) =>
              toast.success(`${value} data exported successfully !!`)
            }
          >
            <SelectTrigger className='w-[160px]'>
              <SelectValue placeholder='Export data' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Export All</SelectItem>
              <SelectItem value='success'>Export Success</SelectItem>
              <SelectItem value='failed'>Export Failed</SelectItem>
              <SelectItem value='declined'>Export Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DataTableSearch fetchData={fetchData} filterParams={{}} />
      </div>
      <Tabs defaultValue='SUCCESS'>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.status}
              value={tab.status}
              className='w-[130px]'
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value='SUCCESS'>
          {data && (
            <DataTable
              columns={columns}
              data={data}
              fetchData={fetchData}
              filterParams={{}}
              totalItems={data.length}
            />
          )}
        </TabsContent>
        <TabsContent value='FAILED'>
          {data && (
            <DataTable
              columns={columns}
              data={data2}
              fetchData={fetchData}
              filterParams={{}}
              totalItems={data.length}
            />
          )}
        </TabsContent>
        <TabsContent value='DECLINED'>
          {data && (
            <DataTable
              columns={columns}
              data={data3}
              fetchData={fetchData}
              filterParams={{}}
              totalItems={data.length}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
