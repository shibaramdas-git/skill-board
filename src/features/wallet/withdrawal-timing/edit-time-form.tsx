'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TimeFormProps {
  initialStartTime: string; // Example: "08:00 AM"
  initialEndTime: string; // Example: "05:00 PM"
  dayName: string;
  message: string;
  onClose: () => void;
}

export default function TimeUpdateForm({
  initialStartTime,
  initialEndTime,
  dayName,
  message,
  onClose
}: TimeFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      dayName: dayName || 'Sunday',
      message: message || 'Lorem lorem lorem lorem lorem.',
      startTime: initialStartTime,
      endTime: initialEndTime
    }
  });

  useEffect(() => {
    // Reset form when initial times change
    reset({
      dayName: dayName,
      message: message,
      startTime: initialStartTime,
      endTime: initialEndTime
    });
  }, [initialStartTime, initialEndTime, reset, dayName, message]);

  const onSubmit = (data: { startTime: string; endTime: string }) => {
    console.log('Updated Times:', data);
    toast.success('Times updated successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-md space-y-4'>
      {/* Start Time */}

      <div className='flex flex-col space-y-2'>
        <Label htmlFor='startTime'>Day</Label>
        <Input
          type='text'
          id='dayName'
          {...register('dayName')}
          className='w-full'
          disabled
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='startTime'>message</Label>
        <Textarea id='message' {...register('message')} className='w-full' />
      </div>
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='startTime'>Start Time</Label>
        <Input
          type='time'
          id='startTime'
          {...register('startTime')}
          className='w-full'
        />
      </div>

      {/* End Time */}
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='endTime'>End Time</Label>
        <Input
          type='time'
          id='endTime'
          {...register('endTime')}
          className='w-full'
        />
      </div>

      {/* Buttons */}
      <div className='flex gap-2'>
        <Button type='submit' className='flex-1'>
          Update
        </Button>
        <Button
          type='button'
          variant='outline'
          className='flex-1'
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
