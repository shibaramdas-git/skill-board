'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, DownloadCloud } from 'lucide-react';

const settingsSchema = z.object({
  appVersion: z.string().min(1, 'Version is required'),
  maintenanceMode: z.boolean(),
  forceUpdate: z.boolean(),
  splashFooter: z.string().optional()
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function AppSettings() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      appVersion: '',
      maintenanceMode: false,
      forceUpdate: false,
      splashFooter: ''
    }
  });

  const onSubmit = (data: SettingsFormValues) => {
    toast.success('Settings Updated Successfully!');
    console.log('Form Data:', data);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadApkFileToServer = () => {
    if (!selectedFile) {
      toast.error('Please select an APK file first.');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success('APK Uploaded Successfully!');
    }, 2000);
  };

  return (
    <div className='mx-auto w-full max-w-2xl space-y-4 rounded-sm bg-card p-6 px-8 text-card-foreground'>
      <div className='rounded-md border p-4'>
        <h3 className='mb-2 text-lg font-semibold'>Update app version</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <Label className='mb-0'>App Version</Label>
            <Input
              {...register('appVersion')}
              placeholder='Enter App Version'
            />
            {errors.appVersion && (
              <p className='text-sm text-red-500'>
                {errors.appVersion.message}
              </p>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <Label>Maintenance Mode</Label>
            <Switch
              checked={watch('maintenanceMode')}
              onCheckedChange={(checked) =>
                setValue('maintenanceMode', checked)
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <Label>Force Update</Label>
            <Switch
              checked={watch('forceUpdate')}
              onCheckedChange={(checked) => setValue('forceUpdate', checked)}
            />
          </div>

          <Button type='submit' disabled={isSubmitting} className='w-full'>
            {isSubmitting ? 'Updating...' : 'Update Settings'}
          </Button>
        </form>
      </div>

      <div className='rounded-md border p-4'>
        <h3 className='mb-2 text-lg font-semibold'>Upload new APK</h3>
        <div className='flex items-center gap-4'>
          <Input type='file' accept='.apk' onChange={handleFileSelect} />
          <Button
            onClick={uploadApkFileToServer}
            disabled={isUploading}
            className='min-w-[120px]'
          >
            {isUploading ? 'Uploading...' : 'Upload'}
            <Upload className='ml-2 h-5 w-5' />
          </Button>
        </div>
      </div>

      <div className='flex justify-between rounded-md border p-4'>
        <h3 className='mb-2 text-lg font-semibold'>Download APK</h3>
        <Button className='min-w-[120px]'>
          <a href='/download/app.apk' className='inline-flex'>
            Download
            <DownloadCloud className='ml-2 h-5 w-5' />
          </a>
        </Button>
      </div>

      <div className='rounded-md border p-4'>
        <h3 className='mb-2 text-lg font-semibold'>Update Footer Message</h3>
        <div className='flex items-center gap-4'>
          <Input
            {...register('splashFooter')}
            placeholder='Enter Footer Message'
          />
          <Button
            type='button'
            onClick={handleSubmit(onSubmit)}
            className='min-w-[120px]'
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
