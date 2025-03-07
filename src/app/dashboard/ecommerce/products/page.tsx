'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ProductsPage from '@/features/ecommerce/products/components';
import { Suspense } from 'react';

type pageProps = {};
export default function Page(props: pageProps) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4 pb-4'>
        <Heading title='Products' description='Manage products' />
        <Separator />
        <Suspense
          key={1}
          fallback={<DataTableSkeleton columnCount={5} rowCount={25} />}
        >
          <ProductsPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
// export default withAuth(Page);
