import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@radix-ui/react-dropdown-menu';

type pageProps = {};
export default function Page(props: pageProps) {
  return (
    <PageContainer>
      <div className='w-full space-y-4'>
        <Heading
          title='Staff specific permissions'
          description='Manage staff specific permissions'
        />
        <Separator />
        <div className='flex flex-col items-center justify-center'>
          <p className='text-2xl'>Page Under construction</p>
          <p className='text-muted-foreground'>
            This page is under construction
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
