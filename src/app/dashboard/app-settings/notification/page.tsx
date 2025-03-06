'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import Notification from '@/features/app-settings/notification/components';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Suspense } from 'react';

type pageProps = {};
export default function Page(props: pageProps) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4 pb-4'>
        <Heading
          title='Notification Settings'
          description='Manage notifications'
        />
        <Separator />
        <Suspense
          key={1}
          fallback={<DataTableSkeleton columnCount={5} rowCount={25} />}
        >
          <Notification />
        </Suspense>
      </div>
    </PageContainer>
  );
}
