'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// Validation Schema
const rateSchema = z.object({
  rateName: z.string().min(1, 'Game Name is required.'),
  rate: z
    .string()
    .regex(/^\d*\.?\d{0,2}$/, 'Invalid price format. Max 2 decimal places.')
    .refine((value) => !isNaN(parseFloat(value)), 'Rate must be a number.')
});

type RateFormValues = z.infer<typeof rateSchema>;

export default function RateEditForm({
  initialData,
  onSubmit,
  onClose
}: {
  initialData: { rateName: string; rate: string };
  onSubmit: (data: RateFormValues) => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RateFormValues>({
    resolver: zodResolver(rateSchema),
    defaultValues: initialData
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: RateFormValues) => {
    setLoading(true);
    await onSubmit(data);
    console.log(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
      {/* Game Name (Disabled) */}
      <div>
        <Label htmlFor='rateName'>Game Name</Label>
        <Input
          id='rateName'
          {...register('rateName')}
          disabled
          className='mt-3'
        />
        {errors.rateName && (
          <p className='text-sm text-red-500'>{errors.rateName.message}</p>
        )}
      </div>

      {/* Game Price */}
      <div>
        <Label htmlFor='rate'>Game Price</Label>
        <Input
          id='rate'
          {...register('rate')}
          placeholder='Enter Game Price'
          className='mt-3'
          onChange={(e) => {
            if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
              setValue('rate', e.target.value);
            }
          }}
        />
        {errors.rate && (
          <p className='text-sm text-red-500'>{errors.rate.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className='flex justify-end gap-2'>
        <Button type='submit' disabled={loading}>
          {loading ? 'Updating...' : 'Update Rates'}
        </Button>
        <Button type='reset' variant='outline' onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
