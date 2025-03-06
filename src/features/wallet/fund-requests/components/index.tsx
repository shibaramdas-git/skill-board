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
import { Eye, Landmark, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

export type IFundRequests = {
  userUniqueId: string;
  fullname: string;
  transactionAmount: number;
  walletBalance: number;
  updatedBalance: number;
  pnl: number; // +ve and -ve
  orderId: string;
  approvedByName: string;
  processedByName: string;
  status:
    | 'Success'
    | 'Failed'
    | 'Declined'
    | 'Pending'
    | 'Approved'
    | 'Queued'
    | 'Processing';
  createdAt: string; //iso data time
  accountDetails: {
    accountNumber: string;
    accountHolder: string;
    bank: string;
    branch: string;
    ifsc: string;
  };
  userStatus: 1 | 2 | 3; //active | blocked | watched
};
export const data: IFundRequests[] = [
  {
    userUniqueId: 'U001',
    fullname: 'John Doe',
    transactionAmount: 5000,
    walletBalance: 20000,
    updatedBalance: 25000,
    pnl: 500,
    orderId: 'ORD001',
    approvedByName: 'Admin One',
    processedByName: 'Processor A',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '1234567890',
      accountHolder: 'John Doe',
      bank: 'Bank of America',
      branch: 'New York',
      ifsc: 'BOA123456'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U002',
    fullname: 'Alice Johnson',
    transactionAmount: 3000,
    walletBalance: 15000,
    updatedBalance: 18000,
    pnl: -200,
    orderId: 'ORD002',
    approvedByName: 'Admin Two',
    processedByName: 'Processor B',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '2345678901',
      accountHolder: 'Alice Johnson',
      bank: 'Chase Bank',
      branch: 'Los Angeles',
      ifsc: 'CHASE123456'
    },
    userStatus: 2
  },
  {
    userUniqueId: 'U003',
    fullname: 'Michael Smith',
    transactionAmount: 10000,
    walletBalance: 50000,
    updatedBalance: 60000,
    pnl: 1000,
    orderId: 'ORD003',
    approvedByName: 'Admin Three',
    processedByName: 'Processor C',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '3456789012',
      accountHolder: 'Michael Smith',
      bank: 'Wells Fargo',
      branch: 'San Francisco',
      ifsc: 'WELLS123456'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U004',
    fullname: 'Emma Brown',
    transactionAmount: 7000,
    walletBalance: 25000,
    updatedBalance: 32000,
    pnl: 700,
    orderId: 'ORD004',
    approvedByName: 'Admin Four',
    processedByName: 'Processor D',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '4567890123',
      accountHolder: 'Emma Brown',
      bank: 'Citibank',
      branch: 'Chicago',
      ifsc: 'CITI123456'
    },
    userStatus: 3
  },
  {
    userUniqueId: 'U005',
    fullname: 'Daniel Wilson',
    transactionAmount: 4000,
    walletBalance: 12000,
    updatedBalance: 16000,
    pnl: -300,
    orderId: 'ORD005',
    approvedByName: 'Admin Five',
    processedByName: 'Processor E',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '5678901234',
      accountHolder: 'Daniel Wilson',
      bank: 'Bank of America',
      branch: 'Seattle',
      ifsc: 'BOA654321'
    },
    userStatus: 2
  },
  {
    userUniqueId: 'U006',
    fullname: 'Olivia Martinez',
    transactionAmount: 2500,
    walletBalance: 8000,
    updatedBalance: 10500,
    pnl: 200,
    orderId: 'ORD006',
    approvedByName: 'Admin Six',
    processedByName: 'Processor F',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '6789012345',
      accountHolder: 'Olivia Martinez',
      bank: 'Chase Bank',
      branch: 'Houston',
      ifsc: 'CHASE654321'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U007',
    fullname: 'Ethan Taylor',
    transactionAmount: 8500,
    walletBalance: 30000,
    updatedBalance: 38500,
    pnl: 850,
    orderId: 'ORD007',
    approvedByName: 'Admin Seven',
    processedByName: 'Processor G',
    status: 'Queued',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '7890123456',
      accountHolder: 'Ethan Taylor',
      bank: 'Wells Fargo',
      branch: 'Phoenix',
      ifsc: 'WELLS654321'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U008',
    fullname: 'Sophia White',
    transactionAmount: 6200,
    walletBalance: 22000,
    updatedBalance: 28200,
    pnl: -400,
    orderId: 'ORD008',
    approvedByName: 'Admin Eight',
    processedByName: 'Processor H',
    status: 'Queued',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '8901234567',
      accountHolder: 'Sophia White',
      bank: 'Citibank',
      branch: 'San Diego',
      ifsc: 'CITI654321'
    },
    userStatus: 3
  },
  {
    userUniqueId: 'U009',
    fullname: 'William Harris',
    transactionAmount: 9000,
    walletBalance: 27000,
    updatedBalance: 36000,
    pnl: 900,
    orderId: 'ORD009',
    approvedByName: 'Admin Nine',
    processedByName: 'Processor I',
    status: 'Queued',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '9012345678',
      accountHolder: 'William Harris',
      bank: 'Bank of America',
      branch: 'Dallas',
      ifsc: 'BOA789456'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U010',
    fullname: 'Isabella Clark',
    transactionAmount: 3300,
    walletBalance: 11000,
    updatedBalance: 14300,
    pnl: -150,
    orderId: 'ORD010',
    approvedByName: 'Admin Ten',
    processedByName: 'Processor J',
    status: 'Processing',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '0123456789',
      accountHolder: 'Isabella Clark',
      bank: 'Chase Bank',
      branch: 'Austin',
      ifsc: 'CHASE789456'
    },
    userStatus: 2
  },
  {
    userUniqueId: 'U011',
    fullname: 'James Lewis',
    transactionAmount: 7200,
    walletBalance: 24000,
    updatedBalance: 31200,
    pnl: 720,
    orderId: 'ORD011',
    approvedByName: 'Admin Eleven',
    processedByName: 'Processor K',
    status: 'Processing',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '1234509876',
      accountHolder: 'James Lewis',
      bank: 'Wells Fargo',
      branch: 'Miami',
      ifsc: 'WELLS789456'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U012',
    fullname: 'Charlotte Walker',
    transactionAmount: 4600,
    walletBalance: 14000,
    updatedBalance: 18600,
    pnl: 460,
    orderId: 'ORD012',
    approvedByName: 'Admin Twelve',
    processedByName: 'Processor L',
    status: 'Processing',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '9876543210',
      accountHolder: 'Charlotte Walker',
      bank: 'Citibank',
      branch: 'Atlanta',
      ifsc: 'CITI789456'
    },
    userStatus: 3
  },
  {
    userUniqueId: 'U013',
    fullname: 'Charlotte 13',
    transactionAmount: 4600,
    walletBalance: 14000,
    updatedBalance: 18600,
    pnl: 460,
    orderId: 'ORD012',
    approvedByName: 'Admin Twelve',
    processedByName: 'Processor L',
    status: 'Success',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '9876543210',
      accountHolder: 'Charlotte Walker',
      bank: 'Citibank',
      branch: 'Atlanta',
      ifsc: 'CITI789456'
    },
    userStatus: 3
  },
  {
    userUniqueId: 'U012',
    fullname: 'Charlotte Walker',
    transactionAmount: 4600,
    walletBalance: 14000,
    updatedBalance: 18600,
    pnl: 460,
    orderId: 'ORD012',
    approvedByName: 'Admin Twelve',
    processedByName: 'Processor L',
    status: 'Success',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '9876543210',
      accountHolder: 'Charlotte Walker',
      bank: 'Citibank',
      branch: 'Atlanta',
      ifsc: 'CITI789456'
    },
    userStatus: 3
  },
  {
    userUniqueId: 'U012',
    fullname: 'Charlotte Walker',
    transactionAmount: 4600,
    walletBalance: 14000,
    updatedBalance: 18600,
    pnl: 460,
    orderId: 'ORD012',
    approvedByName: 'Admin Twelve',
    processedByName: 'Processor L',
    status: 'Success',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '9876543210',
      accountHolder: 'Charlotte Walker',
      bank: 'Citibank',
      branch: 'Atlanta',
      ifsc: 'CITI789456'
    },
    userStatus: 3
  },
  {
    userUniqueId: 'U006',
    fullname: 'Olivia Martinez',
    transactionAmount: 2500,
    walletBalance: 8000,
    updatedBalance: 10500,
    pnl: 200,
    orderId: 'ORD006',
    approvedByName: 'Admin Six',
    processedByName: 'Processor F',
    status: 'Failed',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '6789012345',
      accountHolder: 'Olivia Martinez',
      bank: 'Chase Bank',
      branch: 'Houston',
      ifsc: 'CHASE654321'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U007',
    fullname: 'Ethan Taylor',
    transactionAmount: 8500,
    walletBalance: 30000,
    updatedBalance: 38500,
    pnl: 850,
    orderId: 'ORD007',
    approvedByName: 'Admin Seven',
    processedByName: 'Processor G',
    status: 'Failed',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '7890123456',
      accountHolder: 'Ethan Taylor',
      bank: 'Wells Fargo',
      branch: 'Phoenix',
      ifsc: 'WELLS654321'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U008',
    fullname: 'Sophia White',
    transactionAmount: 6200,
    walletBalance: 22000,
    updatedBalance: 28200,
    pnl: -400,
    orderId: 'ORD008',
    approvedByName: 'Admin Eight',
    processedByName: 'Processor H',
    status: 'Failed',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '8901234567',
      accountHolder: 'Sophia White',
      bank: 'Citibank',
      branch: 'San Diego',
      ifsc: 'CITI654321'
    },
    userStatus: 3
  },
  {
    userUniqueId: 'U009',
    fullname: 'William Harris',
    transactionAmount: 9000,
    walletBalance: 27000,
    updatedBalance: 36000,
    pnl: 900,
    orderId: 'ORD009',
    approvedByName: 'Admin Nine',
    processedByName: 'Processor I',
    status: 'Declined',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '9012345678',
      accountHolder: 'William Harris',
      bank: 'Bank of America',
      branch: 'Dallas',
      ifsc: 'BOA789456'
    },
    userStatus: 1
  },
  {
    userUniqueId: 'U010',
    fullname: 'Isabella Clark',
    transactionAmount: 3300,
    walletBalance: 11000,
    updatedBalance: 14300,
    pnl: -150,
    orderId: 'ORD010',
    approvedByName: 'Admin Ten',
    processedByName: 'Processor J',
    status: 'Declined',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '0123456789',
      accountHolder: 'Isabella Clark',
      bank: 'Chase Bank',
      branch: 'Austin',
      ifsc: 'CHASE789456'
    },
    userStatus: 2
  },
  {
    userUniqueId: 'U010',
    fullname: 'Isabella Clark',
    transactionAmount: 3300,
    walletBalance: 11000,
    updatedBalance: 14300,
    pnl: -150,
    orderId: 'ORD010',
    approvedByName: 'Admin Ten',
    processedByName: 'Processor J',
    status: 'Declined',
    createdAt: new Date().toISOString(),
    accountDetails: {
      accountNumber: '0123456789',
      accountHolder: 'Isabella Clark',
      bank: 'Chase Bank',
      branch: 'Austin',
      ifsc: 'CHASE789456'
    },
    userStatus: 2
  }
];

export default function FundRequests() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState<IFundRequests[] | undefined>(
    []
  );

  const columns: ColumnDef<IFundRequests>[] = [
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
      id: 'Account details',
      cell: ({ row }) => (
        <span className='inline-flex rounded-full bg-primary p-[6px] text-primary-foreground'>
          <Tooltip>
            <TooltipTrigger>
              <Landmark size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <span className='inline-block w-[70px]'>A/c holder</span>:{' '}
                <span>{row.original.accountDetails.accountHolder}</span>
              </div>
              <div>
                <span className='inline-block w-[70px]'>A/c number</span>:{' '}
                <span>{row.original.accountDetails.accountNumber}</span>
              </div>
              <div>
                <span className='inline-block w-[70px]'>Bank</span>:{' '}
                {row.original.accountDetails.bank}
              </div>
              <div>
                <span className='inline-block w-[70px]'>Branch</span>:{' '}
                {row.original.accountDetails.branch}
              </div>
              <div>
                <span className='inline-block w-[70px]'>IFSC</span>:{' '}
                {row.original.accountDetails.ifsc}
              </div>
            </TooltipContent>
          </Tooltip>
        </span>
      )
    },
    {
      id: 'User name',
      accessorKey: 'userUniqueId',
      header: 'User name',
      cell: ({ row }) => (
        <div className='w-[120px]'>
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
          case 'Pending':
            return (
              <div>
                <span className='mr-2 inline-block h-2 w-2 rounded-full bg-cyan-400'></span>
                {row.original.status}
              </div>
            );
          case 'Approved':
            return (
              <div>
                <span className='mr-2 inline-block h-2 w-2 rounded-full bg-blue-500'></span>
                {row.original.status}
              </div>
            );
          case 'Queued':
            return (
              <div>
                <span className='mr-2 inline-block h-2 w-2 rounded-full bg-yellow-500'></span>
                {row.original.status}
              </div>
            );
          case 'Processing':
            return (
              <div>
                <span className='mr-2 inline-block h-2 w-2 rounded-full bg-orange-500'></span>
                {row.original.status}
              </div>
            );
        }
      }
    },
    {
      id: 'Requested At',
      accessorKey: 'createdAt',
      header: 'Requested At',
      cell: ({ row }) => <div>{formatDate(row.original.createdAt, 'Pp')}</div>
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
    {
      status: 'PENDING',
      label: 'Requested',
      count: 10
    },
    {
      status: 'APPROVED',
      label: 'Approved > PG',
      count: 5
    },
    {
      status: 'PROCESSING',
      label: 'In Process',
      count: 5
    },
    {
      status: 'SUCCESS',
      label: 'Success',
      count: 5
    },
    {
      status: 'FAILED',
      label: 'Failed',
      count: 4
    },
    {
      status: 'DECLINED',
      label: 'Declined',
      count: 3
    },
    {
      status: 'QUEUED',
      label: 'Queued',
      count: 1
    }
  ];
  function handleSelection(selectedRowsData?: IFundRequests[]) {
    setSelectedRows(selectedRowsData);
    console.log(selectedRowsData);
  }

  async function fetchData(filterParams: any) {
    const res = await axios.get('https://dummyjson.com/test', {
      params: filterParams
    });
  }
  return (
    <>
      {openDelete && (
        <CommonModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          title='Are you sure ?'
          body={
            <>
              <p>
                Are you sure you want to{' '}
                <span className='text-red-500'>decline the request</span> ? This
                action cannot be undone.
              </p>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    setOpenDelete(false);
                    if (openDelete)
                      toast.success('Reuest declined successfully !');
                  }}
                >
                  Decline
                </Button>
                <Button variant='outline' onClick={() => setOpenDelete(false)}>
                  Cancel
                </Button>
              </div>
            </>
          }
        />
      )}
      {openEdit && (
        <CommonModal
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={() => {
            setOpenEdit(false);
            if (openEdit) toast.success('Request approved successfully !');
          }}
          title='Are you sure?'
          body={
            <>
              <p>
                Are you sure you want to{' '}
                <span className='text-green-500'>approve the fund request</span>{' '}
                ? This action cannot be undone.
              </p>
            </>
          }
          closeTitle='Cancel'
          submitTitle='Confirm'
        />
      )}
      {/* {openView && (
        <CommonModal
          modalSize='lg'
          isOpen={openView}
          onClose={() => setOpenView(false)}
          title='View Details'
          // subtitle='Viewing details of foo'
          body={<div className='h-[350px]'>view modal</div>}
          closeTitle='Close'
        />
      )} */}
      {/* {openAdd && (
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
      <div>
        <Badge className='w-auto' variant='yellow'>
          PGx balance : 125 $
        </Badge>
        <Badge className='w-auto'>PGy balance : 1025 $</Badge>
        <Badge className='w-auto' variant='red'>
          PGz balance : 10025 $
        </Badge>
      </div>
      {/* Table actions */}
      <div className='flex justify-between gap-4'>
        <div className=''>
          {' '}
          <Button
            disabled={selectedRows?.length === 0}
            onClick={() => {
              setOpenEdit(true);
              setSelectedRows([]);
            }}
          >
            Approve request
          </Button>
          <Button
            variant='secondary'
            className='ml-3 border-2'
            disabled={selectedRows?.length === 0}
            onClick={() => {
              setOpenDelete(true);
              setSelectedRows([]);
            }}
          >
            Decline request
          </Button>
        </div>
        <DataTableSearch fetchData={fetchData} filterParams={{}} />
      </div>
      {/* tabs */}
      <div>
        <Tabs defaultValue='PENDING'>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.status}
                value={tab.status}
                className='group/tab min-w-[120px]'
              >
                {tab.label}{' '}
                <span className='item-center ml-2 inline-flex h-5 w-5 justify-center rounded-full text-sm text-cyan-500 group-data-[state=active]/tab:bg-cyan-500 group-data-[state=active]/tab:text-white'>
                  {tab.count}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value='pending'>
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
        </Tabs>
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
