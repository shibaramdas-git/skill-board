import { User } from '@/constants/data';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import CellAction from './cell-action';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'userUniqueId',
    header: 'Username',
    enableSorting: false
  },
  {
    accessorKey: 'fullname',
    header: 'Name'
  },
  {
    accessorKey: 'mobile',
    header: 'Mobile no.',
    enableSorting: false
  },
  {
    accessorKey: 'createdAt',
    accessorFn: (row) => `${formatDate(row.createdAt, 'dd-MM-yyyy p')}`,
    header: 'Registered at'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className='flex gap-4'>
          {row.original.userStatus == 1 ? (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant='green'>Active</Badge>
              </TooltipTrigger>
              <TooltipContent>
                {'Active user message comes here'}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant='red'>Blocked</Badge>
              </TooltipTrigger>
              <TooltipContent>
                {'Blocked user message comes here'}
              </TooltipContent>
            </Tooltip>
          )}
          {/* {row.original.toWatch && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant='yellow'>Watched</Badge>
              </TooltipTrigger>
              <TooltipContent>
                {'Watched user message comes here'}
              </TooltipContent>
            </Tooltip>
          )} */}
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }

  // {
  //   id: 'status',
  //   header: () => 'Status',
  //   cell: ({ row }) => {
  //     const [value, setValue] = React.useState(`${row.original.userStatus}`);
  //     return (
  //       <div
  //         className={
  //           row.original.userStatus === 1 ? 'text-green-500' : 'text-red-500'
  //         }
  //       >
  //         {row.original.userStatus == 1 ? 'active' : 'inactive'}{' '}
  //         <button
  //           className='rounded bg-blue-500 px-3 py-1 text-white'
  //           onClick={() => alert(row.original.userId)}
  //         >
  //           View
  //         </button>
  //         <input
  //           type='number'
  //           className='w-16 border p-1'
  //           value={value}
  //           onChange={(e) => setValue(e.target.value)}
  //         />
  //         <TooltipProvider>
  //           <Tooltip>
  //             <TooltipTrigger>Hover</TooltipTrigger>
  //             <TooltipContent>
  //               <p>Add to library</p>
  //             </TooltipContent>
  //           </Tooltip>
  //         </TooltipProvider>
  //         <div className='relative h-4 w-24 rounded bg-gray-200'>
  //           <div
  //             className='h-4 rounded'
  //             style={{
  //               width: `50%`,
  //               backgroundColor: row.original.userStatus > 50 ? 'green' : 'red'
  //             }}
  //           ></div>
  //         </div>
  //       </div>
  //     );
  //   }
  // }
];

// -----------------------
// accessorKey: string;  // required. imp. used for sorting, filtering etc.
// header : string;     // required
// accessorFn: (row) => string; // use when data fromating required. use backtick for string interpolation``
// -----------------------
// format cells
/* 
headers






*/
