'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

// Validation Schema
const notificationSchema = z.object({
  heading: z.string().min(1, 'Heading is required.'),
  message: z.string().min(1, 'Message is required.')
});

type INotificationFormValues = z.infer<typeof notificationSchema>;

export default function NotificationAddForm({
  initialData,
  onSubmit,
  onClose
}: {
  initialData: { heading: string; message: string };
  onSubmit: (data: INotificationFormValues) => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<INotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: initialData
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: INotificationFormValues) => {
    setLoading(true);
    await onSubmit(data);
    console.log(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
      {/* Title Field */}
      <div>
        <Label htmlFor='heading'>Heading</Label>
        <Input
          id='heading'
          {...register('heading')}
          placeholder='Enter Notification heading'
          className='mt-2'
        />
        {errors.heading && (
          <p className='text-sm text-red-500'>{errors.heading.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <Label htmlFor='message'>Message</Label>
        <Textarea
          id='message'
          {...register('message')}
          placeholder='Please Enter Notification Message'
          className='mt-2'
          rows={4}
        />
        {errors.message && (
          <p className='text-sm text-red-500'>{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className='flex justify-end gap-2'>
        <Button type='submit' disabled={loading}>
          {loading ? 'Adding...' : 'Send now'}
        </Button>
        <Button type='reset' variant='outline' onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
