import { CommonModal } from '@/components/modal/common-modal';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UserStatus {
  status: string;
  message: string;
}

interface IUserStatusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserStatusPopup = ({ isOpen, onClose }: IUserStatusPopupProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<UserStatus>({
    defaultValues: { status: '', message: '' }
  });

  const [submittedData, setSubmittedData] = useState<UserStatus | null>(null);

  const onSubmit = (data: UserStatus) => {
    setSubmittedData(data);
    onClose();
    toast.success('User status updated succcesfully!');
    console.log('Submitted User Status:', data);
  };
  return (
    <CommonModal
      title='Update user status'
      isOpen={isOpen}
      onClose={onClose}
      body={
        <div className='p-6'>
          <h2 className='mb-4 text-lg font-semibold'>Update User Status</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {/* Status Selection */}
            <div>
              <Label>Status</Label>
              <Select onValueChange={(value) => setValue('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='inactive'>Inactive</SelectItem>
                  <SelectItem value='suspended'>Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message Input */}
            <div>
              <Label>Message</Label>
              <Textarea
                placeholder='Enter a message...'
                {...register('message')}
              />
            </div>

            <div className='flex justify-end gap-4'>
              <Button type='submit' className='w-1/2'>
                Submit
              </Button>
              <Button
                variant='outline'
                type='button'
                className='w-1/2'
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      }
    />
  );
};
