import { CommonModal } from '@/components/modal/common-modal';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from 'sonner';

interface IMarketsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}
const options = [
  { id: 'option1', label: 'Market xyz Option 1' },
  { id: 'option2', label: 'Market xyz Option 2' },
  { id: 'option3', label: 'Market xyz Option 3' },
  { id: 'option4', label: 'Market xyz Option 4' },
  { id: 'option5', label: 'Market xyz Option 5' },
  { id: 'option6', label: 'Market xyz Option 6' },
  { id: 'option7', label: 'Market xyz Option 7' },
  { id: 'option8', label: 'Market xyz Option 8' }
];
export const MarketsPopup = ({ isOpen, onClose }: IMarketsPopupProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});
  const handleToggle = (id: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  return (
    <CommonModal
      modalSize='sm'
      title='Update markets'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={() => {
        toast.success('User markets updated successfully !');
        onClose();
      }}
      submitTitle='Submit'
      closeTitle='Discard'
      body={
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Select markets to allow</h3>
          <div className='space-y-2'>
            {options.map((option) => (
              <div key={option.id} className='flex items-center space-x-3'>
                <Switch
                  id={option.id}
                  checked={selectedOptions[option.id] || false}
                  onCheckedChange={() => handleToggle(option.id)}
                />
                <Label htmlFor={option.id} className='text-sm'>
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
};
