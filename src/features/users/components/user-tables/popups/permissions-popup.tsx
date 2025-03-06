import { CommonModal } from '@/components/modal/common-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

interface IPermissionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Permission {
  name: string;
  selected: boolean;
}

const initialPermissions: Permission[] = [
  { name: 'View Dashboard', selected: false },
  { name: 'Edit Users', selected: false },
  { name: 'Manage Roles', selected: false },
  { name: 'Access Reports', selected: false },
  { name: 'Delete Data', selected: false }
];
export const PermissionsPopup = ({
  isOpen,
  onClose
}: IPermissionsPopupProps) => {
  const { handleSubmit, control, setValue, watch, reset } = useForm<{
    permissions: Permission[];
  }>({
    defaultValues: { permissions: initialPermissions }
  });

  const [loading, setLoading] = useState(false);
  const permissions = watch('permissions');

  const onSubmit = async (data: { permissions: Permission[] }) => {
    setLoading(true);
    console.log('Updated Permissions:', data.permissions);
    setTimeout(() => {
      setLoading(false);
      onClose();
      toast.success('User markets updated successfully !');
    }, 2000); // Simulate API call
  };

  return (
    <CommonModal
      title='Permissions popup'
      isOpen={isOpen}
      onClose={onClose}
      body={
        <form onSubmit={handleSubmit(onSubmit)} className=''>
          <h5 className='mb-4 font-medium'>Update Permissions</h5>

          <div className='space-y-2 px-4'>
            {permissions.map((permission, index) => (
              <div key={index} className='flex items-center space-x-3'>
                <Controller
                  name={`permissions.${index}.selected`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: boolean) =>
                        setValue(`permissions.${index}.selected`, checked)
                      }
                    />
                  )}
                />
                <Label>{permission.name}</Label>
              </div>
            ))}
          </div>

          <div className='mt-4 flex justify-end'>
            <Button type='submit' disabled={loading} className='mr-4 px-4 py-2'>
              {loading ? (
                <>Updating...</>
              ) : (
                <>
                  <i className='ri-arrow-left-up-line'></i> Update Permissions
                </>
              )}
            </Button>
            <Button
              variant='outline'
              type='button'
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      }
    />
  );
};
