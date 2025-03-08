'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  popupMessage: z
    .string()
    .min(10, 'Popup message must be at least 10 characters.'),
  minimumWithdraw: z.string().min(1, 'Minimum withdraw is required.'),
  maximumWithdraw: z.string().min(1, 'Maximum withdraw is required.'),
  minimumDeposit: z.string().min(1, 'Minimum deposit is required.'),
  maximumDeposit: z.string().min(1, 'Maximum deposit is required.')
});

type FormData = z.infer<typeof formSchema>;

export default function NoticeBoardPage() {
  const [previewText, setPreviewText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      popupMessage: '',
      minimumWithdraw: '',
      maximumWithdraw: '',
      minimumDeposit: '',
      maximumDeposit: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      console.log('Form Data Submitted:', data);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        alert('Settings Updated Successfully!');
      }, 1500);
    } catch (error) {
      console.error('Error updating settings:', error);
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto w-full max-w-5xl space-y-6'>
      <Card>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 p-6'
            >
              <div className='flex flex-col gap-2 md:flex-row'>
                {/* Popup Message */}
                <FormField
                  control={form.control}
                  name='popupMessage'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <Label className='text-md font-semibold'>
                        Board Editor
                      </Label>
                      <FormControl>
                        <ReactQuill
                          theme='snow'
                          value={previewText}
                          onChange={setPreviewText}
                          className='customize-quill'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preview Section */}
                <div className='flex-1'>
                  <Label className='text-md mb-4 font-semibold'>
                    Preview in app
                  </Label>
                  <div className='min-h-[60vh] rounded-sm border border-gray-300 bg-background p-4 leading-[1.5] text-foreground'>
                    <h3 className='mb-2 text-center font-semibold'>
                      Terms And Conditions
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(previewText)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={loading}
                className='w-full md:w-[150px]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                    Updating...
                  </>
                ) : (
                  'Update Settings'
                )}
              </Button>
              <Button
                className='ml-4 w-[150px] border'
                variant='secondary'
                type='button'
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
