'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import StaffsList from '@/features/staffs-permissions/components';
// import RolesAndPermissions from '@/features/staffs-permissions/components/roles-permissions';
import { Suspense } from 'react';

type pageProps = {};
export default function Page(props: pageProps) {
  return (
    <PageContainer>
      <div className='flex min-h-screen flex-1 flex-col space-y-4 pb-4'>
        {/* <Heading
            title='Staffs & Permissions '
            description='Manage Staffs and their permissions'
          />
          <Separator /> */}
        <Suspense
          key={1}
          fallback={<DataTableSkeleton columnCount={5} rowCount={25} />}
        >
          {/* <RolesAndPermissions /> */}

          <StaffsList />
        </Suspense>
      </div>
    </PageContainer>
  );
}
