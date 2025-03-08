'use client';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

type pageProps = {};
export default function Page(props: pageProps) {
  const [chatStarted, setChatStarted] = useState(false);
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6'>
      <h1 className='mb-4 text-2xl font-semibold'>Customer Support</h1>

      {/* {!chatStarted ? ( */}
      <Button onClick={() => setChatStarted(true)}>Start a Support Chat</Button>
      {/* ) : (
        <ChatBox />
      )} */}
    </div>
  );
}
