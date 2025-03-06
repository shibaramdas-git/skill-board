'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';

const gameSchema = z.object({
  gameName: z.string().min(2, 'Game name must be at least 2 characters.'),
  marketType: z.enum(['INTERNAL', 'EXTERNAL'])
});

type AddFormValues = z.infer<typeof gameSchema>;

export function AddForm({
  onSubmit,
  onClose
}: {
  onSubmit: (data: AddFormValues) => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<AddFormValues>({
    resolver: zodResolver(gameSchema)
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: AddFormValues) => {
    setLoading(true);
    await onSubmit(data);
    console.log(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
      {/* Game Name */}
      <div className='mb-6'>
        <Label htmlFor='gameName' className='mb-3 block'>
          Game Name
        </Label>
        <Input
          id='gameName'
          {...register('gameName')}
          placeholder='Enter game name'
        />
        {errors.gameName && (
          <p className='text-sm text-red-500'>{errors.gameName.message}</p>
        )}
      </div>

      {/* Market Type */}
      <div>
        <Label htmlFor='marketType' className='mb-3 block'>
          Game Type
        </Label>
        <Select
          onValueChange={(value) =>
            setValue('marketType', value as 'INTERNAL' | 'EXTERNAL')
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select game type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='INTERNAL'>INTERNAL</SelectItem>
            <SelectItem value='EXTERNAL'>EXTERNAL</SelectItem>
          </SelectContent>
        </Select>
        {errors.marketType && (
          <p className='text-sm text-red-500'>{errors.marketType.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className='flex justify-end gap-2'>
        <Button type='submit' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Provider'}
        </Button>
        <Button type='reset' variant='outline' onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
