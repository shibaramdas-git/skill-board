'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { Combobox } from '@/components/ui/table/combobox';
import { ICategory } from '../types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
];

export default function ProductTableAction({
  fetchData,
  filterParams,
  categories
}: {
  fetchData: (params: any) => void;
  filterParams: any;
  categories: ICategory[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className='flex w-full flex-wrap items-center justify-between'>
      <div className='flex flex-1 flex-wrap items-center gap-4'>
        <DataTableSearch fetchData={fetchData} filterParams={filterParams} />
        <Combobox
          options={categories.map((category) => ({
            label: category.name,
            value: category.slug
          }))}
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            fetchData({ category: value });
          }}
          placeholder='Filter by category...'
          className='w-[250px]'
        />
      </div>
      <Button type='button' className='px-8'>
        + Add
      </Button>
    </div>
  );
}
