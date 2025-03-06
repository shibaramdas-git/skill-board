'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function RolesPermissions({
  setOpenPermit
}: {
  setOpenPermit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section>
      <h3 className='mb-3 text-2xl font-semibold text-foreground'>
        Roles List
      </h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className=''>
          <CardHeader className='flex w-full flex-row items-center justify-between space-y-0 px-6 pb-2 pt-4'>
            <Badge variant='green' className='mr-0 w-auto'>
              Super Admin
            </Badge>
            <CardTitle className='text-sm font-medium'>Total 1 Users</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-between px-6 py-4'>
            <div className='text-2xl font-bold'>Super Admin</div>
            <button
              type='button'
              className='text-muted-foreground outline-none hover:text-blue-500'
              onClick={() => setOpenPermit(true)}
            >
              Edit role
            </button>
          </CardContent>
        </Card>
        <Card className=''>
          <CardHeader className='flex w-full flex-row items-center justify-between space-y-0 px-6 pb-2 pt-4'>
            <Badge className='mr-0 w-auto'>Admin</Badge>
            <CardTitle className='text-sm font-medium'>Total 5 Users</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-between px-6 py-4'>
            <div className='text-2xl font-bold'>Administrator</div>
            <button
              type='button'
              className='text-muted-foreground outline-none hover:text-blue-500'
              onClick={() => setOpenPermit(true)}
            >
              Edit role
            </button>
          </CardContent>
        </Card>

        <Card className=''>
          <CardHeader className='flex w-full flex-row items-center justify-between space-y-0 px-6 pb-2 pt-4'>
            <Badge variant='yellow' className='mr-0 w-auto'>
              Support
            </Badge>
            <CardTitle className='text-sm font-medium'>
              Total 10 Users
            </CardTitle>
          </CardHeader>
          <CardContent className='flex justify-between px-6 py-4'>
            <div className='text-2xl font-bold'>Support Agent</div>
            <button
              type='button'
              className='text-muted-foreground outline-none hover:text-blue-500'
              onClick={() => setOpenPermit(true)}
            >
              Edit role
            </button>
          </CardContent>
        </Card>
        <Card className=''>
          <CardHeader className='flex w-full flex-row items-center justify-between space-y-0 px-6 pb-2 pt-4'>
            <Badge variant='red' className='mr-0 w-auto'>
              Moderator
            </Badge>
            <CardTitle className='text-sm font-medium'>Total 5 Users</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-between px-6 py-4'>
            <div className='text-2xl font-bold'>Moderator</div>
            <button
              type='button'
              className='text-muted-foreground outline-none hover:text-blue-500'
              onClick={() => setOpenPermit(true)}
            >
              Edit role
            </button>
          </CardContent>
        </Card>
        <Card className=''>
          <CardHeader className='flex w-full flex-row items-center justify-between space-y-0 px-6 pb-2 pt-4'>
            <Badge variant='dark' className='mr-0 w-auto'>
              Guest
            </Badge>
            <CardTitle className='text-sm font-medium'>Total 6 Users</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-between px-6 py-4'>
            <div className='text-2xl font-bold'>Guest (Viewer)</div>
            <button
              type='button'
              className='text-muted-foreground outline-none hover:text-blue-500'
              onClick={() => setOpenPermit(true)}
            >
              Edit role
            </button>
          </CardContent>
        </Card>
        <Card className='flex w-1/2 items-center justify-center'>
          <Button type='button' onClick={() => setOpenPermit(true)}>
            + Add New Role
          </Button>
        </Card>
      </div>
    </section>
  );
}

//-----------------------------------------------------------------------------------------------------
// 'use client';
// import { CommonModal } from '@/components/modal/common-modal';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { DataTable } from '@/components/ui/table/data-table';
// import { DataTableSearch } from '@/components/ui/table/data-table-search';
// import { ColumnDef } from '@tanstack/react-table';
// import axios from 'axios';
// import { Eye, Pencil } from 'lucide-react';
// import React, { useState } from 'react';
// import { toast } from 'sonner';

// export type IStaffsPermissions = {
//   //   fullName: string;
//   //   uniqueId: string;
//   //   emailId: string;
//   //   mobile: string;
//   //   changePassword: string;
//   //   isBlocked: boolean;
// };
// export const data: IStaffsPermissions[] = [
//   {
//     text: 'Lorem Ipsum',
//     isOpen: true
//   },
//   {
//     text: 'Lorem Ipsum',
//     isOpen: false
//   },
//   {
//     text: 'Lorem Ipsum',
//     isOpen: true
//   },
//   {
//     text: 'Lorem Ipsum',
//     isOpen: false
//   },
//   {
//     text: 'Lorem Ipsum',
//     isOpen: true
//   }
// ];

// export default function RolesAndPermissions() {
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openView, setOpenView] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [toggle, setToggle] = useState(false);

//   const columns: ColumnDef<IStaffsPermissions>[] = [
//     {
//       id: 'Full Name',
//       accessorKey: 'fullName',
//       header: 'Full Name'
//     },
//     {
//       id: 'Username',
//       accessorKey: 'uniqueId',
//       header: 'Username'
//     },
//     {
//       id: 'Email Id',
//       accessorKey: 'emailId',
//       header: 'Email Id'
//     },
//     {
//       id: 'Mobile',
//       accessorKey: 'mobile',
//       header: 'Mobile'
//     },
//     {
//       id: 'Change Password',
//       accessorKey: 'changePassword',
//       header: 'Change Password',
//       cell: ({ row }) => (
//         <span className='cell-action-icon' onClick={() => setOpenEdit(true)}>
//           Change password
//         </span>
//       )
//     },
//     {
//       id: 'Block employee',
//       accessorKey: 'isBlocked',
//       header: 'Block employee',
//       cell: ({ row }) => {
//         return (
//           <Switch
//             checked={row.original.isBlocked}
//             onCheckedChange={() => {
//               setToggle((prev) => !prev);
//               toggle
//                 ? toast.error('Failed to update status!')
//                 : toast.success('Status updated successfully!');
//             }}
//           />
//         );
//       }
//     },
//     // {
//     //   id: 'Badge',
//     //   accessorKey: 'badge',
//     //   header: 'Badge',
//     //   cell: ({ row }) => {
//     //     return row.original.isOpen == true ? (
//     //       <Badge variant='green'>Open</Badge>
//     //     ) : (
//     //       <Badge variant='red'>Closed</Badge>
//     //     );
//     //   }
//     // },
//     {
//       id: 'Actions',
//       accessorKey: 'actions',
//       header: 'Actions',
//       cell: ({ row }) => (
//         <span className='inline-flex gap-2'>
//           <span className='cell-action-icon' onClick={() => setOpenEdit(true)}>
//             <Pencil size='16' />
//           </span>
//           <span className='cell-action-icon' onClick={() => setOpenView(true)}>
//             <Eye size='16' />
//           </span>
//         </span>
//       )
//     }
//   ];

//   async function fetchData(filterParams: any) {
//     const res = await axios.get('https://dummyjson.com/test', {
//       params: filterParams
//     });
//   }
//   return (
//     <>
//       {openEdit && (
//         <CommonModal
//           isOpen={openEdit}
//           onClose={() => setOpenEdit(false)}
//           onSubmit={() => {
//             setOpenEdit(false);
//             if (openEdit) toast.success('Status updated successfully !');
//           }}
//           title='Are you sure?'
//           body={
//             <>
//               <Label htmlFor='name'>Update field</Label>
//               <Input
//                 id='name'
//                 name=''
//                 defaultValue=''
//                 onChange={(e) => console.log(e.target.value)}
//                 placeholder='Enter field value'
//               />
//             </>
//           }
//           closeTitle='Cancel'
//           submitTitle='Confirm'
//         />
//       )}
//       {openView && (
//         <CommonModal
//           modalSize='lg'
//           isOpen={openView}
//           onClose={() => setOpenView(false)}
//           title='View Details'
//           // subtitle='Viewing details of foo'
//           body={<div className='h-[350px]'>view modal</div>}
//           closeTitle='Close'
//         />
//       )}
//       {openAdd && (
//         <CommonModal
//           isOpen={openAdd}
//           onClose={() => setOpenAdd(false)}
//           onSubmit={() => {
//             setOpenAdd(false);
//             if (openAdd) toast.success('Status updated successfully !');
//           }}
//           title='Add data form'
//           body={
//             <div className='flex flex-col gap-4'>
//               <div>
//                 <Label htmlFor='name'>Add new data</Label>
//                 <Input
//                   id='field 1'
//                   name=''
//                   defaultValue=''
//                   onChange={(e) => console.log(e.target.value)}
//                   placeholder='Enter field 1 value'
//                 />
//               </div>
//               <div>
//                 <Label htmlFor='name'>Add new data</Label>

//                 <Input
//                   id='field 2'
//                   name=''
//                   defaultValue=''
//                   onChange={(e) => console.log(e.target.value)}
//                   placeholder='Enter field 2 value'
//                 />
//               </div>
//             </div>
//           }
//           closeTitle='Cancel'
//           submitTitle='Submit'
//         />
//       )}
//       {/* Table actions */}
//       <div className='flex justify-between gap-4'>
//         <>
//           <h3 className='text-2xl font-semibold'>Roles and Permissions</h3>
//           <Button onClick={() => setOpenAdd(true)}>+ Add Role</Button>
//         </>
//       </div>

//       {data && (
//         <DataTable
//           columns={columns}
//           data={data}
//           fetchData={fetchData}
//           filterParams={{}}
//           totalItems={data.length}
//           disablePagination
//         />
//       )}
//     </>
//   );
// }
