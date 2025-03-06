'use client';

import { useMemo, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Input } from '../input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRight,
  ChevronsLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { DataTableViewOptions } from './data-table-visibility';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalItems: number;
  fetchData: (params?: any) => void | Promise<void>;
  filterParams: any | {};
  pageSizeOptions?: number[];
  disableGoToPage?: boolean;
  disablePagination?: boolean;
  handleSelection?: (selectedRows?: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalItems,
  pageSizeOptions = [5, 10, 25, 50, 100],
  filterParams,
  fetchData,
  handleSelection,
  disableGoToPage,
  disablePagination
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: filterParams?.currentPage ? filterParams?.currentPage - 1 : 0,
    pageSize: pageSizeOptions.includes(filterParams?.perPage)
      ? filterParams.perPage
      : 10
  });
  const [goToPageValue, setGoToPageValue] = useState(
    `${pagination.pageIndex + 1}`
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handlePaginationChange = (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState)
  ) => {
    const updatedPagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination)
        : updaterOrValue;
    setPagination(updatedPagination);
    setGoToPageValue(`${updatedPagination.pageIndex + 1}`); // Sync local input state when pagination updates externally
    fetchData({
      ...filterParams,
      currentPage: updatedPagination.pageIndex + 1,
      perPage: updatedPagination.pageSize
    });
  };
  const handleSortingChange = (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState)
  ) => {
    const updatedSorting =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting)
        : updaterOrValue;
    setSorting(updatedSorting);

    fetchData({
      ...filterParams,
      orderBy: updatedSorting[0]?.id,
      order: updatedSorting[0]?.desc ? 'desc' : 'asc'
    });
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    state: {
      pagination,
      sorting,
      rowSelection
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onRowSelectionChange: setRowSelection,
    enableSortingRemoval: false, // flow of sorting toggle should be none -> asc -> desc -> asc
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true
  });
  const debouncedGoToPage = useMemo(
    () =>
      debounce((value: string) => {
        let pageNum = Math.ceil(Number(value));
        if (isNaN(pageNum)) return;
        pageNum = Math.max(1, Math.min(pageNum, table.getPageCount())); //sets min-max
        table.setPageIndex(pageNum - 1);
      }, 1000),
    [table]
  );
  useEffect(() => {
    const selectedData = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original);

    if (handleSelection) {
      handleSelection(selectedData);
    }
  }, [rowSelection]); // Re-run when selection changes
  return (
    <div className='flex flex-1 flex-col space-y-4'>
      {/* table section */}
      <div className='relative flex flex-1 flex-col'>
        <div className='flex overflow-scroll rounded-sm border text-foreground md:overflow-auto'>
          <ScrollArea className='flex-1'>
            <Table className='relative'>
              <TableHeader className='relative'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'font-semibold uppercase',
                          header.column.getCanSort()
                            ? 'group cursor-pointer select-none'
                            : ''
                        )}
                        onClick={() =>
                          header.column.getCanSort() &&
                          header.column.toggleSorting()
                        }
                      >
                        <div className='inline-flex items-center'>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <span className='ml-[6px] inline-block'>
                            {{
                              asc: <ArrowUp size={18} />,
                              desc: <ArrowDown size={18} />
                            }[header.column.getIsSorted() as string] ?? (
                              <span className='invisible group-hover:visible'>
                                <ArrowUp size={18} />
                              </span>
                            )}
                          </span>
                        </div>
                        <DataTableViewOptions
                          table={table}
                          className='absolute inset-y-0 right-0'
                        />
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        {!disablePagination && (
          <div className='flex items-center justify-end gap-2 space-x-2 py-2'>
            <div className='text-nowrap text-sm text-muted-foreground'>
              {totalItems > 0 ? (
                <>
                  {pagination.pageIndex * pagination.pageSize + 1} -{' '}
                  {Math.min(
                    (pagination.pageIndex + 1) * pagination.pageSize,
                    totalItems
                  )}{' '}
                  of {totalItems}
                </>
              ) : (
                'No entries'
              )}
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
                <div className='flex items-center gap-2'>
                  <Select
                    value={`${pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className='h-8 w-[110px]'>
                      <SelectValue placeholder={pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side='top' className='min-w-[80px] text-sm'>
                      {pageSizeOptions.map((pageSize) => (
                        <SelectItem
                          key={pageSize}
                          value={`${pageSize}`}
                          className=''
                        >
                          <span className='inline-block w-[28px]'>
                            {pageSize}
                          </span>
                          /<span className='pl-1'>page</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between gap-2 sm:justify-end'>
              <div className='flex items-center space-x-2'>
                <Button
                  aria-label='Go to first page'
                  variant='outline'
                  className='hidden h-8 w-8 p-0 lg:flex'
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft
                    className='h-5 w-5'
                    aria-hidden='true'
                    strokeWidth={1.5}
                  />
                </Button>
                <Button
                  aria-label='Go to previous page'
                  variant='outline'
                  className='h-8 w-8 p-0'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon className='h-4 w-4' aria-hidden='true' />
                </Button>
                {/* Go to page element */}
                {!disableGoToPage && (
                  <Input
                    type='number'
                    value={goToPageValue}
                    onChange={(e) => {
                      setGoToPageValue(e.target.value); // Update input immediately
                      debouncedGoToPage(e.target.value); // Delay actual page update
                    }}
                    className='no-spinner h-8 w-[60px] px-1 text-center'
                  />
                )}
                <Button
                  aria-label='Go to next page'
                  variant='outline'
                  className='h-8 w-8 p-0'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRightIcon className='h-4 w-4' aria-hidden='true' />
                </Button>
                <Button
                  aria-label='Go to last page'
                  variant='outline'
                  className='hidden h-8 w-8 p-0 lg:flex'
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight
                    className='h-5 w-5'
                    aria-hidden='true'
                    strokeWidth={1.5}
                  />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* pagination section */}
    </div>
  );
}
