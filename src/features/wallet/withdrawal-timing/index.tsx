import { DataTable } from '@/components/ui/table/data-table';
import { IWithdrawlTiming } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { CommonModal } from '@/components/modal/common-modal';
import TimeUpdateForm from './edit-time-form';

export const data: IWithdrawlTiming[] = [
  {
    dayName: 'Monday',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    message: 'Withdrawals are open for today.',
    isOpened: true
  },
  {
    dayName: 'Tuesday',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    message: 'Withdrawals are available within the specified time.',
    isOpened: true
  },
  {
    dayName: 'Wednesday',
    startTime: '00:00 AM',
    endTime: '00:00 AM',
    message: 'Withdrawals are not available today.',
    isOpened: false
  },
  {
    dayName: 'Thursday',
    startTime: '08:30 AM',
    endTime: '06:00 PM',
    message: 'Withdrawals are open for extended hours today.',
    isOpened: true
  },
  {
    dayName: 'Friday',
    startTime: '11:00 AM',
    endTime: '03:00 PM',
    message: 'Withdrawals are available for a short window today.',
    isOpened: true
  },
  {
    dayName: 'Saturday',
    startTime: '00:00 AM',
    endTime: '00:00 AM',
    message: 'Withdrawals are closed on weekends.',
    isOpened: false
  },
  {
    dayName: 'Sunday',
    startTime: '00:00 AM',
    endTime: '00:00 AM',
    message: 'Withdrawals are closed on weekends.',
    isOpened: false
  }
];

export default function WithdrawalTiming() {
  // const [data, setData] = useState<IWithdrawlTiming[]>(withdrawalTimings);
  const [openEdit, setOpenEdit] = useState(false);

  const columns: ColumnDef<IWithdrawlTiming>[] = [
    {
      accessorKey: 'dayName',
      header: 'Day'
    },
    {
      accessorKey: 'startTime',
      header: 'Start Time'
    },
    {
      accessorKey: 'endTime',
      header: 'End Time'
    },
    {
      accessorKey: 'message',
      header: 'Message'
    },
    //   toggle switch
    {
      id: 'withdrawal-status',
      header: 'Open / Closed',
      cell: ({ row }) => (
        <Switch
          checked={row.original.isOpened}
          onCheckedChange={() => {
            const dayvar = data.filter(
              (item) => item.dayName === row.original.dayName
            )[0];
            dayvar.isOpened = !dayvar.isOpened;
            toast.success('Withdrawal status updated successfully!');
          }}
        />
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <span
          className='inline-block cursor-pointer rounded-sm border border-primary p-1'
          onClick={() => setOpenEdit(true)}
        >
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
      {/* <EditPopup isOpen={open} onClose={() => setOpen(false)} /> */}
      {openEdit && (
        <CommonModal
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          title='Update withdrawl settings'
          body={
            <>
              <TimeUpdateForm
                initialEndTime='08:00'
                initialStartTime='10:00'
                dayName='Monday'
                message='Withdrawals are available within the specified time.'
                onClose={() => setOpenEdit(false)}
              />
            </>
          }
        />
      )}

      <DataTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        totalItems={data.length}
        filterParams={{}}
        disablePagination
      />
    </>
  );
}
