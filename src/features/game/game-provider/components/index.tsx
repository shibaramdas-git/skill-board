'use client';
import { CommonModal } from '@/components/modal/common-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import EditForm from './edit-form';
import { AddForm } from './add-form';
import { formatDate } from 'date-fns';

export type IGameProvider = {
  gameName: string;
  result: string;
  isActive: boolean;
  marketType: 'EXTERNAL' | 'INTERNAL';
  createdAt: string; //ISO format
};
export const data: IGameProvider[] = [
  {
    gameName: 'Ludo King',
    result: '125',
    isActive: true,
    marketType: 'EXTERNAL',
    createdAt: '2025-02-18T10:15:30.000Z'
  },
  {
    gameName: 'Dice Duel',
    result: '250',
    isActive: false,
    marketType: 'INTERNAL',
    createdAt: '2025-02-17T14:20:45.000Z'
  },
  {
    gameName: 'Battle Chess',
    result: '236',
    isActive: true,
    marketType: 'EXTERNAL',
    createdAt: '2025-02-16T18:30:10.000Z'
  },
  {
    gameName: 'Roulette Spin',
    result: '456',
    isActive: false,
    marketType: 'INTERNAL',
    createdAt: '2025-02-15T12:45:55.000Z'
  },
  {
    gameName: 'Poker Blitz',
    result: '457',
    isActive: true,
    marketType: 'EXTERNAL',
    createdAt: '2025-02-14T22:10:05.000Z'
  },
  {
    gameName: 'Sudoku Showdown',
    result: '785',
    isActive: false,
    marketType: 'INTERNAL',
    createdAt: '2025-02-13T09:05:20.000Z'
  },
  {
    gameName: 'Blackjack Elite',
    result: '485',
    isActive: true,
    marketType: 'EXTERNAL',
    createdAt: '2025-02-12T17:50:40.000Z'
  },
  {
    gameName: 'Fantasy Cricket',
    result: '785',
    isActive: true,
    marketType: 'INTERNAL',
    createdAt: '2025-02-11T11:30:15.000Z'
  },
  {
    gameName: 'Snakes & Ladders',
    result: '152',
    isActive: false,
    marketType: 'EXTERNAL',
    createdAt: '2025-02-10T16:40:25.000Z'
  },
  {
    gameName: 'Carrom Clash',
    result: '154',
    isActive: true,
    marketType: 'INTERNAL',
    createdAt: '2025-02-09T21:55:35.000Z'
  },
  {
    gameName: 'Speed Chess',
    result: '456',
    isActive: false,
    marketType: 'EXTERNAL',
    createdAt: '2025-02-08T08:15:50.000Z'
  },
  {
    gameName: 'Teen Patti Master',
    result: '235',
    isActive: true,
    marketType: 'INTERNAL',
    createdAt: '2025-02-07T13:25:45.000Z'
  }
];

export default function GameProvider() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [toggle, setToggle] = useState(false);

  const columns: ColumnDef<IGameProvider>[] = [
    {
      id: 'Game Provider',
      accessorKey: 'gameName',
      header: 'Game Provider'
    },
    {
      id: 'Game Result',
      accessorKey: 'result',
      header: 'Game Result'
    },
    {
      accessorKey: 'createdAt',
      accessorFn: (row) => `${formatDate(row.createdAt, 'dd-MM-yyyy p')}`,
      header: 'Registered at'
    },
    {
      id: 'Game Status',
      accessorKey: 'isActive',
      header: 'Game Status',
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
      id: 'Market Type',
      accessorKey: 'marketType',
      header: 'Market Type',
      cell: ({ row }) => {
        return row.original.marketType === 'EXTERNAL' ? (
          <Badge variant='dark' className='w-[80px]'>
            {row.original.marketType}
          </Badge>
        ) : (
          <Badge className='w-[80px]'>{row.original.marketType}</Badge>
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
            <Trash2 size='16' />
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
          title='Update provider details'
          body={<EditForm setOpenEdit={setOpenEdit} />}
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
                Are you sure you want to delete this provider ? This action
                cannot be undone.
              </p>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    setOpenDelete(false);
                    if (openDelete) toast.success('Deleted successfully !');
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
      {openAdd && (
        <CommonModal
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onSubmit={() => {
            setOpenAdd(false);
            if (openAdd) toast.success('Status updated successfully !');
          }}
          title='Add new game provider'
          body={
            <AddForm
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
        <Button onClick={() => setOpenAdd(true)}>+ Add Game Provider</Button>
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
