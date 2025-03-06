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
import { Divide, Ellipsis, Eye, Pencil, Trash, User } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import AddStaffForm from './add-staff-form';
import EditStaffForm from './edit-staff-form';
import RolesPermissions from './roles-permissions';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import UpdatePasswordForm from './update-password-form';
import PermissionsForm from './permissions-form';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export type IStaff = {
  fullName: string;
  uniqueId: string;
  emailId: string;
  mobile: string;
  role: '1' | '2' | '3' | '4' | '5';
  isBlocked: boolean;
  langKnown: string[];
  password: string;
};
export const data: IStaff[] = [
  {
    fullName: 'John Doe',
    uniqueId: 'STAFF001',
    emailId: 'john.doe@example.com',
    mobile: '+1234567890',
    role: '1',
    isBlocked: false,
    password: 'password123',
    langKnown: ['English', 'Spanish']
  },
  {
    fullName: 'Jane Smith',
    uniqueId: 'STAFF002',
    emailId: 'jane.smith@example.com',
    mobile: '+1987654321',
    role: '2',
    isBlocked: false,
    password: 'password456',
    langKnown: ['English', 'French']
  },
  {
    fullName: 'Michael Johnson',
    uniqueId: 'STAFF003',
    emailId: 'michael.j@example.com',
    mobile: '+1122334455',
    role: '3',
    isBlocked: true,
    langKnown: ['English', 'German'],
    password: 'password789'
  },
  {
    fullName: 'Emily Davis',
    uniqueId: 'STAFF004',
    emailId: 'emily.d@example.com',
    mobile: '+1555123456',
    role: '5',
    isBlocked: false,
    langKnown: ['Spanish', 'French'],
    password: 'passwordabc'
  },
  {
    fullName: 'Robert Brown',
    uniqueId: 'STAFF005',
    emailId: 'robert.b@example.com',
    mobile: '+1666987654',
    role: '3',
    isBlocked: false,
    langKnown: ['English', 'German', 'Italian'],
    password: 'passwordxyz'
  },
  {
    fullName: 'Lisa White',
    uniqueId: 'STAFF006',
    emailId: 'lisa.w@example.com',
    mobile: '+1777788990',
    role: '4',
    isBlocked: true,
    langKnown: ['English', 'Spanish', 'French'],
    password: 'password123'
  },
  {
    fullName: 'James Wilson',
    uniqueId: 'STAFF007',
    emailId: 'james.w@example.com',
    mobile: '+1888333222',
    role: '3',
    isBlocked: false,
    langKnown: ['German', 'Italian'],
    password: 'password456'
  },
  {
    fullName: 'Sophia Martinez',
    uniqueId: 'STAFF008',
    emailId: 'sophia.m@example.com',
    mobile: '+1999888777',
    role: '5',
    isBlocked: false,
    langKnown: ['English', 'Spanish'],
    password: 'password789'
  },
  {
    fullName: 'William Taylor',
    uniqueId: 'STAFF009',
    emailId: 'william.t@example.com',
    mobile: '+1222333444',
    role: '2',
    isBlocked: true,
    langKnown: ['English', 'French', 'German'],
    password: 'passwordabc'
  },
  {
    fullName: 'Olivia Anderson',
    uniqueId: 'STAFF010',
    emailId: 'olivia.a@example.com',
    mobile: '+1444555666',
    role: '3',
    isBlocked: false,
    langKnown: ['Spanish', 'Italian'],
    password: 'passwordxyz'
  },
  {
    fullName: 'David Harris',
    uniqueId: 'STAFF011',
    emailId: 'david.h@example.com',
    mobile: '+1333666777',
    role: '4',
    isBlocked: false,
    langKnown: ['English', 'Portuguese'],
    password: 'password123'
  },
  {
    fullName: 'Ava Thomas',
    uniqueId: 'STAFF012',
    emailId: 'ava.t@example.com',
    mobile: '+1555666888',
    role: '5',
    isBlocked: true,
    langKnown: ['French', 'German'],
    password: 'password456'
  }
];

export default function StaffsList() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<IStaff>({
    fullName: 'John Doe',
    uniqueId: 'STAFF001',
    emailId: 'john.doe@example.com',
    mobile: '+1234567890',
    role: '1',
    isBlocked: false,
    langKnown: ['English', 'Spanish'],
    password: 'password123'
  });
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPermit, setOpenPermit] = useState(false);
  const [openPswd, setOpenPswd] = useState(false);

  const columns: ColumnDef<IStaff>[] = [
    {
      id: 'Name',
      accessorKey: 'fullName',
      header: () => <div className='pl-3'>Name</div>,
      cell: ({ row }) => (
        <div
          onClick={() => setOpenView(true)}
          className='inline-flex cursor-pointer items-center gap-2'
        >
          <span className='inline-flex rounded-full bg-gray-700 p-[6px]'>
            <User size={16} />
          </span>
          <div>
            <div>{row.original.fullName}</div>
            <div className='text-xs text-muted-foreground'>
              {row.original.uniqueId}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'Role',
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        switch (row.original.role) {
          case '1':
            return (
              <Badge variant='green' className='w-[80px]'>
                Super Admin
              </Badge>
            );
          case '2':
            return <Badge className='w-[70px]'>Admin</Badge>;
          case '3':
            return (
              <Badge variant='yellow' className='w-[70px]'>
                Support
              </Badge>
            );
          case '4':
            return (
              <Badge variant='red' className='w-[70px]'>
                Moderator
              </Badge>
            );
          case '5':
            return (
              <Badge variant='dark' className='w-[70px]'>
                Guest
              </Badge>
            );
          default:
            return (
              <Badge variant='dark' className='w-[70px]'>
                {row.original.role}
              </Badge>
            );
        }
      }
    },

    {
      id: 'Email Id',
      accessorKey: 'emailId',
      header: 'Email Id',
      cell: ({ row }) => (
        <span className='text-muted-foreground'>{row.original.emailId}</span>
      )
    },
    {
      id: 'Mobile',
      accessorKey: 'mobile',
      header: 'Mobile'
    },
    // {
    //   id: 'Change Password',
    //   accessorKey: 'changePassword',
    //   header: 'Change Password',
    //   cell: ({ row }) => (
    //     <span className='cell-action-icon' onClick={() => setOpenEdit(true)}>
    //       Change password
    //     </span>
    //   )
    // },
    // {
    //   id: 'Block employee',
    //   accessorKey: 'isBlocked',
    //   header: 'Block employee',
    //   cell: ({ row }) => {
    //     const [toggle, setToggle] = useState(false);
    //     return (
    //       <Switch
    //         checked={row.original.isBlocked}
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
    {
      id: 'Status',
      accessorKey: 'isBlocked',
      header: 'Status',
      cell: ({ row }) => {
        return row.original.isBlocked == false ? (
          <div>
            <span className='mr-3 inline-block h-2 w-2 rounded-full bg-green-400'></span>
            Active
          </div>
        ) : (
          <div>
            <span className='mr-3 inline-block h-2 w-2 rounded-full bg-red-400'></span>
            Blocked
          </div>
        );
      }
    },
    {
      id: 'Actions',
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <span className='inline-flex gap-2'>
          <span
            className='cell-action-icon'
            onClick={() => {
              setOpenView(true);
              setSelectedStaff(row.original);
            }}
          >
            <Eye size='16' />
          </span>
          <span
            className='cell-action-icon'
            onClick={() => {
              setOpenEdit(true);
              setSelectedStaff(row.original);
            }}
          >
            <Pencil size='16' />
          </span>
          <span
            className='cell-action-icon'
            onClick={() => setOpenDelete(true)}
          >
            <Trash size='16' />
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
              <span className='cell-action-icon'>
                <Ellipsis size='17' />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenPswd(true)}>
                Update password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenPermit(true)}>
                Update permissions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                Update staff details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Switch
                  checked={row.original.isBlocked}
                  className='mr-4'
                  onCheckedChange={() =>
                    toast.success('Staff status upddated successfylly!!')
                  }
                />
                Block staff
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <RolesPermissions setOpenPermit={setOpenPermit} />
      <Separator />
      <section className='flex flex-col gap-4'>
        {/* Table actions */}
        <div className='flex justify-between gap-4'>
          <h3 className='mb-3 text-2xl font-semibold text-foreground'>
            Staffs List
          </h3>
          <div className='flex flex-1 justify-end gap-4'>
            <DataTableSearch fetchData={fetchData} filterParams={{}} />
            <Button onClick={() => setOpenAdd(true)}>+ Add staff</Button>
          </div>
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
      </section>
      {openEdit && (
        <CommonModal
          modalSize='lg'
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          title='Update Staff details'
          body={
            <EditStaffForm setOpenEdit={setOpenEdit} staff={selectedStaff} />
          }
        />
      )}
      {openView && (
        <CommonModal
          isOpen={openView}
          onClose={() => setOpenView(false)}
          title='View Details'
          body={
            <div className='flex flex-col gap-2 rounded-md border border-gray-400 p-6 dark:border-gray-800 dark:backdrop-brightness-150'>
              {/* Title */}
              <h2 className='text-lg font-semibold'>Staff Details</h2>

              {/* Full Name */}
              <div className='flex justify-between'>
                <span className='text-gray-600'>Full Name:</span>
                <span className='font-medium'>{selectedStaff.fullName}</span>
              </div>

              {/* Username */}
              <div className='flex justify-between'>
                <span className='text-gray-600'>Username:</span>
                <span className='font-medium'>{selectedStaff.uniqueId}</span>
              </div>

              {/* Email */}
              <div className='flex justify-between'>
                <span className='text-gray-600'>Email:</span>
                <span className='font-medium'>{selectedStaff.emailId}</span>
              </div>

              {/* Mobile */}
              <div className='flex justify-between'>
                <span className='text-gray-600'>Mobile:</span>
                <span className='font-medium'>{selectedStaff.mobile}</span>
              </div>

              {/* Role */}
              <div className='flex justify-between'>
                <span className='text-gray-600'>Role:</span>
                <span className='font-medium'>
                  {selectedStaff.role === '1'
                    ? 'Super Admin'
                    : selectedStaff.role === '2'
                      ? 'Admin'
                      : selectedStaff.role === '3'
                        ? 'Moderator'
                        : selectedStaff.role === '4'
                          ? 'Support'
                          : 'Guest'}
                </span>
              </div>

              {/* Languages Known */}
              <div>
                <span className='text-gray-600'>Languages Known:</span>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {selectedStaff.langKnown.map((lang) => (
                    <span
                      key={lang}
                      className='rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700'
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className='flex justify-between'>
                <span className='text-gray-600'>Status:</span>
                <span
                  className={`rounded-md px-2 py-1 ${
                    selectedStaff.isBlocked
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {selectedStaff.isBlocked ? 'Blocked' : 'Active'}
                </span>
              </div>
            </div>
          }
          closeTitle='Close'
        />
      )}
      {openPermit && (
        <CommonModal
          modalSize='screen'
          isOpen={openPermit}
          title='Manage Permissions'
          onClose={() => setOpenPermit(false)}
          onSubmit={() => setOpenPermit(false)}
          body={
            <ScrollArea className='h-[70vh]'>
              <PermissionsForm setOpenPermit={setOpenPermit} />
              <ScrollBar className='w-4' />
            </ScrollArea>
          }
        />
      )}
      {openAdd && (
        <CommonModal
          modalSize='lg'
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          title='Add new staff'
          body={<AddStaffForm setOpenAdd={setOpenAdd} />}
        />
      )}
      {openDelete && (
        <CommonModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          title='Are you sure ?'
          body={
            <>
              <p className='mb-2'>
                Are you sure you want to{' '}
                <span className='text-red-400'>suspend the staff </span> from
                the system ?
              </p>
              <p className='mb-4'>This action cannot be undone. !!!</p>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    setOpenDelete(false);
                    if (openDelete)
                      toast.success('Notification Deleted successfully !');
                  }}
                >
                  Suspend
                </Button>
                <Button variant='outline' onClick={() => setOpenDelete(false)}>
                  Cancel
                </Button>
              </div>
            </>
          }
        />
      )}
      {openPswd && (
        <UpdatePasswordForm openPswd={openPswd} setOpenPswd={setOpenPswd} />
      )}
    </>
  );
}
