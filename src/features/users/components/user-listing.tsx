'use client';
import { DataTable as UserTable } from '@/components/ui/table/data-table';
import { columns } from './user-tables/columns';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';
import { updateFilterParams } from '../store/user-slice';
// import { UserApiResponse } from '@/constants/data';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/date-picker/date-picker';
import { DatePickerWithRange } from '@/components/date-picker/date-range-picker';
import { Button } from '@/components/ui/button';
import userJson from '@/constants/user.json';
import { User } from '@/constants/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

type UserListingPageProps = {};

export default function UserListingPage({}: UserListingPageProps) {
  // const [data, setData] = useState<UserApiResponse>();
  const [data, setData] = useState<User[]>(userJson);
  const dispatch = useAppDispatch();
  const { filterParams } = useAppSelector((state) => state.users);

  async function fetchData(filterParams: any) {
    // const res = await axios.get('http://localhost:5000/api/users', {
    //   params: filterParams
    // });
    const res = await axios.get('https://dummyjson.com/test', {
      params: filterParams
    });
    dispatch(
      updateFilterParams({
        search: filterParams.search,
        stage: filterParams.filterBy,
        currentPage: filterParams.currentPage,
        perPage: filterParams.perPage,
        orderBy: filterParams.orderBy,
        order: filterParams.order
      })
    );
    // setData(res.data);
  }
  // useEffect(() => {
  //   fetchData(filterParams);
  // }, []);

  return (
    <>
      {/* Table actions / filters */}
      <div className='flex items-end gap-4'>
        <DataTableSearch filterParams={filterParams} fetchData={fetchData} />
        <div>
          {/* <Label htmlFor='userStatus' className='inline-block pb-1 pl-1'>
            filter by user status
          </Label> */}
          <Select
            defaultValue={filterParams.filterBy}
            onValueChange={(value) =>
              fetchData({ ...filterParams, filterBy: value })
            }
          >
            <SelectTrigger id='userSatus' className='w-[180px]'>
              <SelectValue
                placeholder={filterParams.filterBy || 'filter by user status'}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className='font-semibold text-muted-foreground'>
                  Stage
                </SelectLabel>
                <SelectItem value='REGISTERED'>Registered users</SelectItem>
                <SelectItem value='VERIFIED'>Verified users</SelectItem>
                <SelectItem value='UNKNOWN'>Unknown users</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel className='font-semibold text-muted-foreground'>
                  Status
                </SelectLabel>
                <SelectItem value='ACTIVE'>Active users</SelectItem>
                <SelectItem value='BLOCKED'>Blocked users</SelectItem>
                <SelectItem value='WATCHED'>Watched users</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs defaultValue='registered' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='registered'>Registered</TabsTrigger>
          <TabsTrigger value='verified'>Verified</TabsTrigger>
          <TabsTrigger value='unknown' disabled>
            Unknown
          </TabsTrigger>
        </TabsList>
        <TabsContent value='verified' className='space-y-4'>
          {data && (
            <UserTable
              columns={columns}
              data={data}
              totalItems={data.length}
              fetchData={fetchData}
              filterParams={filterParams}
              // pageSizeOptions={[10, 25, 30, 100]}
              // disableGoToPage
            />
          )}
        </TabsContent>
        <TabsContent value='registered' className='space-y-4'>
          {data && (
            <UserTable
              columns={columns}
              data={data.slice(0, 10)}
              totalItems={data.length}
              fetchData={fetchData}
              filterParams={filterParams}
              // pageSizeOptions={[10, 25, 30, 100]}
              // disableGoToPage
            />
          )}
        </TabsContent>
      </Tabs>
      {/* <Button
        onClick={() =>
          dispatch(
            updateFilterParams({
              search: 'kiran',
              stage: 'REGISTERED blabl aldkjlfjdlfkjdlfkjldkfjj',
              currentPage: 1123456,
              perPage: 250,
              orderBy: 'createdAtdfdfdf',
              order: 'descdfkj adfj;ladsfj'
            })
          )
        }
      >
        dispatch filter parmas
      </Button> */}
    </>
  );
}
