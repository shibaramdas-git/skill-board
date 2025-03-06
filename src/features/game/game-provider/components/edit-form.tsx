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
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const gameSchema = z.object({
  gameName: z.string().min(2, 'Game Name must be at least 2 characters'),
  marketType: z.enum(['INTERNAL', 'EXTERNAL'], {
    required_error: 'Please select a market type'
  })
});

type GameFormValues = z.infer<typeof gameSchema>;

type IEditFormProps = {
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditForm({ setOpenEdit }: IEditFormProps) {
  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      gameName: '',
      marketType: 'INTERNAL'
    }
  });

  const onSubmit = (data: GameFormValues) => {
    console.log('Form Data:', data);
    toast.success('Game Provider Updated', {
      description: 'Successfully updated provider!'
    });
    setOpenEdit(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Game Name */}
        <FormField
          control={form.control}
          name='gameName'
          render={({ field }) => (
            <FormItem>
              <Label htmlFor='gameName'>Game Name</Label>
              <Input {...field} id='gameName' placeholder='Enter game name' />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Market Type */}
        <FormField
          control={form.control}
          name='marketType'
          render={({ field }) => (
            <FormItem>
              <Label htmlFor='marketType'>Game Type</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Market Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='INTERNAL'>INTERNAL</SelectItem>
                  <SelectItem value='EXTERNAL'>EXTERNAL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className='flex justify-end gap-2'>
          <Button type='submit'>Update Provider</Button>
          <Button
            type='reset'
            variant='outline'
            onClick={() => setOpenEdit(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
