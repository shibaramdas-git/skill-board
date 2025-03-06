'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import AppSettings from '@/features/app-settings/app-versions/components';
import { Suspense } from 'react';

type pageProps = {};
export default function Page(props: pageProps) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4 pb-4'>
        <Heading title='Application settings' />
        <Separator className='my-1' />
        <Suspense
          key={1}
          fallback={<DataTableSkeleton columnCount={5} rowCount={25} />}
        >
          <AppSettings />
        </Suspense>
      </div>
    </PageContainer>
  );
}
