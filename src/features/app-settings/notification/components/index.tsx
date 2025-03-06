'use client';
import { CommonModal } from '@/components/modal/common-modal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Send, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import NotificationAddForm from './add-form';
import { Badge } from '@/components/ui/badge';

export type INotification = {
  notificationId: string;
  heading: string;
  message: string;
};
export const data: INotification[] = [
  {
    notificationId: '1',
    heading: 'New Message',
    message: 'You have received a new message from John.'
  },
  {
    notificationId: '2',
    heading: 'System Update',
    message: 'A new system update is available. Please restart your device.'
  },
  {
    notificationId: '3',
    heading: 'Friend Request',
    message: 'Alice has sent you a friend request.'
  },
  {
    notificationId: '4',
    heading: 'Event Reminder',
    message: "Don't forget the meeting scheduled for tomorrow at 10 AM."
  },
  {
    notificationId: '5',
    heading: 'Payment Received',
    message: 'You have received a payment of $250 from Mark.'
  },
  {
    notificationId: '6',
    heading: 'Subscription Expiring',
    message:
      'Your subscription is expiring in 3 days. Renew now to continue services.'
  },
  {
    notificationId: '7',
    heading: 'New Comment',
    message: "Emma commented on your post: 'Great work!'."
  },
  {
    notificationId: '8',
    heading: 'Security Alert',
    message: 'A login attempt was detected from a new device.'
  },
  {
    notificationId: '9',
    heading: 'Password Changed',
    message: 'Your password was successfully changed.'
  },
  {
    notificationId: '10',
    heading: 'Weather Update',
    message: 'Heavy rain is expected in your area today. Stay safe!'
  },
  {
    notificationId: '11',
    heading: 'Task Completed',
    message: "The task 'Fix bug #402' has been marked as completed."
  },
  {
    notificationId: '12',
    heading: 'New Follower',
    message: 'You have a new follower: @techguru.'
  },
  {
    notificationId: '13',
    heading: 'Product Discount',
    message: 'Get 20% off on your next purchase. Offer valid till Sunday.'
  },
  {
    notificationId: '14',
    heading: 'Goal Achieved',
    message: 'Congratulations! You have reached your fitness goal for the week.'
  },
  {
    notificationId: '15',
    heading: 'System Maintenance',
    message: 'Scheduled maintenance will take place on Sunday from 2 AM - 4 AM.'
  }
];

export default function Notification() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const columns: ColumnDef<INotification>[] = [
    { id: 'Heading', accessorKey: 'heading', header: 'Heading' },
    { id: 'Message', accessorKey: 'message', header: 'Message' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <>
          <span
            onClick={() => setOpenConfirm(true)}
            className='cell-action-icon mr-3 inline-block min-w-[100px] text-cyan-500'
          >
            <Send size={17} className='mr-2' /> Resend
          </span>
          <span
            className='cell-action-icon text-red-400'
            onClick={() => setOpenDelete(true)}
          >
            <Trash size={17} />
          </span>
        </>
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
      {openConfirm && (
        <CommonModal
          isOpen={openConfirm}
          onClose={() => setOpenConfirm(false)}
          title='Are you sure ?'
          body='Selected  Notification will be send to all users.'
          onSubmit={() => {
            setOpenConfirm(false);
            if (openConfirm) toast.success('Notification sent successfully !');
          }}
          submitTitle='Confirm'
          closeTitle='Cancel'
        />
      )}
      {openAdd && (
        <CommonModal
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          title='Add Notification'
          body={
            <NotificationAddForm
              onClose={() => setOpenAdd(false)}
              onSubmit={() => {
                setOpenAdd(false);
                if (openAdd) toast.success('Notification sent successfully !');
              }}
              initialData={{ heading: '', message: '' }}
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
                Are you sure you want to delete this Notification ? This action
                cannot be undone.
              </p>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    setOpenDelete(false);
                    if (openDelete)
                      toast.success('Notification Deleted successfully !');
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
