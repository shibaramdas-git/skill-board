import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { CommonModal } from '@/components/modal/common-modal';
import { toast } from 'sonner';

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function UpdatePasswordForm({
  setOpenPswd,
  openPswd
}: {
  openPswd: boolean;
  setOpenPswd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (values: PasswordFormValues) => {
    setOpenPswd(false);
    toast.success('Password updated successfully !!');
    console.log('Updated Password:', values);
    // Call your API or update state here
  };

  return (
    <CommonModal
      title='Upadte password'
      onClose={() => setOpenPswd(false)}
      isOpen={openPswd}
      body={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter New Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-2'>
              <Button type='submit' className='flex-1'>
                Update Password
              </Button>
              <Button
                type='button'
                variant='outline'
                className='flex-1'
                onClick={() => setOpenPswd(false)}
              >
                Discard
              </Button>
            </div>
          </form>
        </Form>
      }
    />
  );
}
