'use client';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';

interface DataTableSearchProps {
  filterParams: any;
  fetchData: (params?: any) => void | Promise<void>;
  placeHolder?: string;
  className?: string;
}

export function DataTableSearch({
  fetchData,
  filterParams,
  placeHolder,
  className
}: DataTableSearchProps) {
  const [searchValue, setSearchValue] = useState(filterParams.search || '');

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        fetchData({ ...filterParams, search: value });
      }, 700),
    [fetchData, filterParams]
  );
  return (
    <Input
      placeholder={placeHolder || 'Search ...'}
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
        debouncedSearch(e.target.value.trim());
      }}
      className={cn('w-full focus:animate-pulse md:max-w-sm', className)}
    />
  );
}
