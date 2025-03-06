'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from 'sonner';

const languageSchema = z.object({
  languageName: z
    .string()
    .min(2, 'Language name must be at least 2 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters')
});

type ILanguageFormValues = z.infer<typeof languageSchema>;

export default function LanguageAddForm({
  addLanguage,
  setOpenAdd
}: {
  addLanguage: { loading: boolean };
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<ILanguageFormValues>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      languageName: '',
      displayName: ''
    }
  });

  const onSubmit = (data: ILanguageFormValues) => {
    console.log('Form submitted:', data);
    setOpenAdd(false);
    toast.success('Language added successfully!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='languageName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Language Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter Language Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='displayName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Display Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter Display Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type='submit' disabled={addLanguage.loading}>
            {addLanguage.loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              form.reset;
              setOpenAdd(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
