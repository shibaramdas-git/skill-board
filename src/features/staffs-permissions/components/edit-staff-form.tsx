'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// Zod Schema for Validation
const staffSchema = z.object({
  fullName: z.string().min(3, 'Full Name is required'),
  uniqueId: z
    .string()
    .min(3, 'Username is required')
    .max(7, 'Max 7 characters'),
  emailId: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  mobile: z.string().regex(/^\d{10}$/, 'Mobile must be 10 digits'),
  role: z.enum(['1', '2', '3', '4', '5'], {
    errorMap: () => ({ message: 'Invalid role selection' })
  }),
  langKnown: z.array(z.string()).default(['English']),
  isBlocked: z.boolean().default(false)
});

// Available Languages
const availableLanguages = [
  { id: 'lang1', name: 'English' },
  { id: 'lang2', name: 'Spanish' },
  { id: 'lang3', name: 'French' },
  { id: 'lang4', name: 'German' }
];

type StaffFormValues = z.infer<typeof staffSchema>;

interface EditStaffFormProps {
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  staff: StaffFormValues;
}

export default function EditStaffForm({
  setOpenEdit,
  staff
}: EditStaffFormProps) {
  const [passwordShow, setPasswordShow] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: staff // Pre-fill with staff data
  });

  // Ensure form values are updated when staff data changes
  useEffect(() => {
    Object.keys(staff).forEach((key) => {
      setValue(
        key as keyof StaffFormValues,
        staff[key as keyof StaffFormValues]
      );
    });
  }, [staff, setValue]);

  const onSubmit = (data: StaffFormValues) => {
    setOpenEdit(false);
    toast.success('Staff details updated successfully!');
    console.log('Updated Staff Data: ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {/* Full Name */}
      <div>
        <Label>Full Name</Label>
        <Input {...register('fullName')} placeholder='Enter Full Name' />
        {errors.fullName && (
          <p className='validation-error'>{errors.fullName.message}</p>
        )}
      </div>

      <div className='flex gap-4'>
        {/* Email */}
        <div className='flex-1'>
          <Label>Email</Label>
          <Input {...register('emailId')} placeholder='Enter Email Address' />
          {errors.emailId && (
            <p className='validation-error'>{errors.emailId.message}</p>
          )}
        </div>
        {/* Mobile */}
        <div className='flex-1'>
          <Label>Mobile</Label>
          <Input
            type='tel'
            {...register('mobile')}
            placeholder='Enter Mobile Number'
            maxLength={10}
          />
          {errors.mobile && (
            <p className='validation-error'>{errors.mobile.message}</p>
          )}
        </div>
      </div>

      <div className='flex gap-4'>
        {/* Role Selection */}
        <div className='flex-1'>
          <Label>Staff Role</Label>
          <Select
            onValueChange={(value) =>
              setValue('role', value as StaffFormValues['role'])
            }
            defaultValue={staff.role}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Role' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1'>Super Admin</SelectItem>
              <SelectItem value='2'>Admin</SelectItem>
              <SelectItem value='3'>Moderator</SelectItem>
              <SelectItem value='4'>Support</SelectItem>
              <SelectItem value='5'>Guest</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className='validation-error'>{errors.role.message}</p>
          )}
        </div>

        {/* Languages */}
        <div className='flex-1'>
          <Label>Select Languages Known</Label>
          <div className='grid grid-cols-2 gap-2'>
            {availableLanguages.map((language) => (
              <div key={language.id} className='flex items-center space-x-2'>
                <Checkbox
                  checked={watch('langKnown').includes(language.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setValue('langKnown', [
                        ...watch('langKnown'),
                        language.name
                      ]);
                    } else {
                      setValue(
                        'langKnown',
                        watch('langKnown').filter(
                          (lang) => lang !== language.name
                        ) || []
                      );
                    }
                  }}
                />
                <Label>{language.name}</Label>
              </div>
            ))}
          </div>
          {errors.langKnown && (
            <p className='validation-error'>{errors.langKnown.message}</p>
          )}
        </div>
      </div>

      {/* Username */}
      <div>
        <Label>Username</Label>
        <Input
          {...register('uniqueId')}
          placeholder='Enter Username'
          maxLength={7}
        />
        {errors.uniqueId && (
          <p className='validation-error'>{errors.uniqueId.message}</p>
        )}
      </div>

      <div className='flex justify-between gap-4'>
        {/* Password */}
        <div className='flex-1'>
          <Label>Password</Label>
          <div className='relative'>
            <Input
              type={passwordShow ? 'text' : 'password'}
              {...register('password')}
              placeholder='Enter Password'
            />
            <button
              type='button'
              className='absolute right-2 top-2 text-sm'
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p className='validation-error'>{errors.password.message}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className='flex-1'>
          <Label>Confirm Password</Label>
          <div className='relative'>
            <Input
              type={'password'}
              {...register('password')}
              placeholder='Re-enter Password'
            />
          </div>
          {errors.password && (
            <p className='validation-error'>{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Label className='mb-0'>Blocked Status</Label>
        <Switch
          checked={watch('isBlocked')}
          onCheckedChange={() => setValue('isBlocked', !watch('isBlocked'))}
        />
        {watch('isBlocked') ? 'Blocked' : 'Active'}
      </div>

      {/* Submit Button */}
      <div className='flex justify-end gap-4'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Employee'}
        </Button>
        <Button variant='outline' onClick={() => setOpenEdit(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
