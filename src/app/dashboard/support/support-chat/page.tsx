import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

type pageProps = {};
export default function Page(props: pageProps) {
  return (
    <PageContainer>
      {' '}
      <div className='space-y-4 p-6'>
        <h1 className='text-2xl font-semibold'>Support Chat</h1>
        <p>Manage customer support conversations.</p>

        {/* Open Support Chat in new tab */}
        <Link href='/dashboard/support/customer-chat' target='_blank'>
          <Button>Open User Chat</Button>
        </Link>

        {/* Placeholder for chat list */}
        <div className='rounded-lg border p-4'>
          <p className='text-gray-500'>Chat list will appear here...</p>
        </div>
      </div>
    </PageContainer>
  );
}
