import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// ✅ Define Zod schema for validation
const permissionSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  role: z.enum(['3', '1', '2']), // "3" = Both, "1" = Dashboard, "2" = Chat Panel
  permissions: z.array(z.string()).min(1, 'At least one permission is required')
});

type PermissionFormValues = z.infer<typeof permissionSchema>;

const allPermissions = {
  dashboard: {
    key: 'dashboard',
    name: 'Dashboard',
    subOptions: [{ key: 'viewDashboard', name: 'View Dashboard' }]
  },

  usersSection: {
    key: 'usersSection',
    name: 'Users Section',
    subOptions: [
      { key: 'sendOtp', name: 'Send OTP' },
      { key: 'updateMarket', name: 'Update Market' },
      { key: 'updatePermissions', name: 'Update Permissions' },
      { key: 'updateUserStatus', name: 'Update User Status' },
      { key: 'createUser', name: 'Create User' },
      { key: 'editUser', name: 'Edit User' },
      { key: 'deleteUser', name: 'Delete User' }
    ]
  },

  businessSection: {
    key: 'businessSection',
    name: 'Business Section',
    subOptions: [
      {
        key: 'businessProvider',
        name: 'Business Provider',
        subOptions: [
          { key: 'viewBusinessProvider', name: 'View' },
          { key: 'createBusinessProvider', name: 'Create' },
          { key: 'editBusinessProvider', name: 'Edit' },
          { key: 'deleteBusinessProvider', name: 'Delete' }
        ]
      },
      {
        key: 'businessRates',
        name: 'Business Rates',
        subOptions: [
          { key: 'viewBusinessRates', name: 'View' },
          { key: 'updateBusinessRates', name: 'Update Rates' }
        ]
      },
      {
        key: 'businessSettings',
        name: 'Business Settings',
        subOptions: [
          { key: 'viewBusinessSettings', name: 'View' },
          { key: 'editBusinessSettings', name: 'Edit' }
        ]
      },
      {
        key: 'businessResults',
        name: 'Business Results',
        subOptions: [
          { key: 'viewBusinessResults', name: 'View' },
          { key: 'exportBusinessResults', name: 'Export Results' }
        ]
      }
    ]
  },

  walletSection: {
    key: 'walletSection',
    name: 'Wallet Section',
    subOptions: [
      {
        key: 'viewWallet',
        name: 'View Wallet'
      },
      {
        key: 'fundRequest',
        name: 'Fund Request',
        subOptions: [
          { key: 'viewFundRequests', name: 'View' },
          { key: 'approveFundRequest', name: 'Approve Request' },
          { key: 'rejectFundRequest', name: 'Reject Request' }
        ]
      },
      {
        key: 'fundRequestHistory',
        name: 'Fund Request History',
        subOptions: [
          { key: 'viewFundRequestHistory', name: 'View History' },
          { key: 'exportFundRequestHistory', name: 'Export Data' }
        ]
      },
      {
        key: 'withdrawalSettings',
        name: 'Withdrawal Settings',
        subOptions: [
          { key: 'viewWithdrawalSettings', name: 'View' },
          { key: 'editWithdrawalSettings', name: 'Edit' }
        ]
      }
    ]
  },

  reportsSection: {
    key: 'reportsSection',
    name: 'Reports Section',
    subOptions: [
      {
        key: 'userAnalysis',
        name: 'User Analysis',
        subOptions: [
          { key: 'viewUserAnalysis', name: 'View' },
          { key: 'exportUserAnalysis', name: 'Export Report' }
        ]
      },
      {
        key: 'businessAnalysis',
        name: 'Business Analysis',
        subOptions: [
          { key: 'viewBusinessAnalysis', name: 'View' },
          { key: 'exportBusinessAnalysis', name: 'Export Report' }
        ]
      }
    ]
  },

  appSettingsSection: {
    key: 'appSettingsSection',
    name: 'App Settings Section',
    subOptions: [
      {
        key: 'notifications',
        name: 'Notifications',
        subOptions: [
          { key: 'viewNotifications', name: 'View' },
          { key: 'sendNotification', name: 'Send Notification' }
        ]
      },
      {
        key: 'banners',
        name: 'Banners',
        subOptions: [
          { key: 'viewBanners', name: 'View' },
          { key: 'createBanner', name: 'Create' },
          { key: 'editBanner', name: 'Edit' },
          { key: 'deleteBanner', name: 'Delete' }
        ]
      },
      {
        key: 'languageSettings',
        name: 'Language Settings',
        subOptions: [
          { key: 'viewLanguages', name: 'View' },
          { key: 'editLanguages', name: 'Edit' }
        ]
      },
      {
        key: 'withdrawScreenSettings',
        name: 'Withdraw Screen Settings',
        subOptions: [
          { key: 'viewWithdrawScreen', name: 'View' },
          { key: 'editWithdrawScreen', name: 'Edit' }
        ]
      },
      {
        key: 'appVersions',
        name: 'App Versions',
        subOptions: [
          { key: 'viewAppVersions', name: 'View' },
          { key: 'updateAppVersion', name: 'Update Version' }
        ]
      }
    ]
  },

  staffAndPermissions: {
    key: 'staffAndPermissions',
    name: 'Staff & Permissions',
    subOptions: [
      { key: 'viewStaffs', name: 'View Staffs' },
      { key: 'addStaff', name: 'Add Staff' },
      { key: 'editStaff', name: 'Edit Staff' },
      { key: 'deleteStaff', name: 'Delete Staff' },
      { key: 'updatePermissions', name: 'Update Permissions' }
    ]
  }
};

export default function PermissionsForm({
  setOpenPermit
}: {
  setOpenPermit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      fullName: '',
      role: '3',
      permissions: []
    }
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const onSubmit = (values: PermissionFormValues) => {
    console.log('Updated Permissions:', values);
    // Call your API to update permissions
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='h-full space-y-4 p-4'
      >
        <div className='mx-auto flex flex-col justify-center gap-4 md:w-3/4 md:flex-row'>
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem className='flex-1'>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input type='text' placeholder='Enter Username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Role Select */}
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='flex-1'>
                {/* <FormLabel>Role</FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='1'>Super admin</SelectItem>
                    <SelectItem value='2'>Admin</SelectItem>
                    <SelectItem value='3'>Support Agent</SelectItem>
                    <SelectItem value='4'>Moderator</SelectItem>
                    <SelectItem value='5'>Guest</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Permissions Section */}
        <FormLabel>Permissions</FormLabel>
        <div className='grid grid-cols-4 gap-3'>
          {Object.values(allPermissions).map((permission) => (
            // <Card key={permission.key}>
            //   <CardContent className='p-4'>
            //     <div className='flex items-center space-x-3'>
            //       <Checkbox
            //         checked={selectedPermissions.includes(permission.key)}
            //         onCheckedChange={(checked) => {
            //           if (checked) {
            //             setSelectedPermissions((prev) => [
            //               ...prev,
            //               permission.key
            //             ]);
            //             form.setValue('permissions', [
            //               ...form.getValues('permissions'),
            //               permission.key
            //             ]);
            //           } else {
            //             setSelectedPermissions((prev) =>
            //               prev.filter((p) => p !== permission.key)
            //             );
            //             form.setValue(
            //               'permissions',
            //               form
            //                 .getValues('permissions')
            //                 .filter((p) => p !== permission.key)
            //             );
            //           }
            //         }}
            //       />
            //       <FormLabel className='cursor-pointer'>
            //         {permission.name}
            //       </FormLabel>
            //     </div>

            //     {/* Sub-options */}
            //     {permission.subOptions.length > 0 && (
            //       <div className='mt-2 space-y-2 pl-6'>
            //         {permission.subOptions.map((subOption) => (
            //           <div
            //             key={subOption.key}
            //             className='flex items-center space-x-3'
            //           >
            //             <Checkbox
            //               checked={selectedPermissions.includes(subOption.key)}
            //               onCheckedChange={(checked) => {
            //                 if (checked) {
            //                   setSelectedPermissions((prev) => [
            //                     ...prev,
            //                     subOption.key
            //                   ]);
            //                   form.setValue('permissions', [
            //                     ...form.getValues('permissions'),
            //                     subOption.key
            //                   ]);
            //                 } else {
            //                   setSelectedPermissions((prev) =>
            //                     prev.filter((p) => p !== subOption.key)
            //                   );
            //                   form.setValue(
            //                     'permissions',
            //                     form
            //                       .getValues('permissions')
            //                       .filter((p) => p !== subOption.key)
            //                   );
            //                 }
            //               }}
            //             />
            //             <FormLabel className='cursor-pointer'>
            //               {subOption.name}
            //             </FormLabel>
            //           </div>
            //         ))}
            //       </div>
            //     )}
            //   </CardContent>
            // </Card>
            <Card key={permission.key}>
              <CardContent className='p-4'>
                <div className='flex items-center space-x-3'>
                  <Checkbox
                    checked={selectedPermissions.includes(permission.key)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPermissions([
                          ...selectedPermissions,
                          permission.key
                        ]);
                      } else {
                        setSelectedPermissions(
                          selectedPermissions.filter(
                            (p) => p !== permission.key
                          )
                        );
                      }
                    }}
                  />
                  <FormLabel className='cursor-pointer'>
                    {permission.name}
                  </FormLabel>
                </div>

                {permission.subOptions && (
                  <div className='mt-2 space-y-2 pl-6'>
                    {permission.subOptions.map((subOption) => (
                      <div
                        key={subOption.key}
                        className='flex items-center space-x-3'
                      >
                        <Checkbox
                          checked={selectedPermissions.includes(subOption.key)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPermissions([
                                ...selectedPermissions,
                                subOption.key
                              ]);
                            } else {
                              setSelectedPermissions(
                                selectedPermissions.filter(
                                  (p) => p !== subOption.key
                                )
                              );
                            }
                          }}
                        />
                        <FormLabel className='cursor-pointer'>
                          {subOption.name}
                        </FormLabel>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <FormMessage name='permissions' /> */}

        {/* Submit Button */}
        <div className='flex justify-center gap-4'>
          <Button type='submit' onClick={() => setOpenPermit(false)}>
            Update Permissions
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpenPermit(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
