'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CircleUserRound, LockKeyhole } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null); // Reset server error

    startTransition(async () => {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);

      const response = await login(undefined, formData);

      if (response?.success) {
        router.push('/dashboard/overview');
      } else if (response?.error && typeof response.error === 'string') {
        setServerError(response.error);
      }
    });
  };

  return (
    <div className='flex h-screen items-center justify-center bg-primary dark:bg-background'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-[370px] rounded-sm border bg-accent/70 px-10 py-8'
      >
        <span className='mx-auto block h-[6px] w-[100px] rounded-sm bg-primary dark:bg-background'></span>
        <h2 className='my-6 text-center text-xl font-bold uppercase tracking-wider'>
          LOGIN
        </h2>

        <div className='mb-3'>
          <div className='relative w-full'>
            <CircleUserRound
              className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'
              size={22}
              strokeWidth={1.5}
            />
            <Input
              type='text'
              placeholder='Username'
              className='rounded-sm pl-10'
              {...register('username')}
            />
          </div>
          {errors.username && (
            <p className='mt-1 text-sm font-thin tracking-wide text-red-500'>
              {errors.username.message}
            </p>
          )}
        </div>

        <div className='mb-3'>
          <div className='relative w-full'>
            <LockKeyhole
              className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'
              size={22}
              strokeWidth={1.5}
            />
            <Input
              type='password'
              placeholder='Password'
              className='rounded-sm pl-10'
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Show Server Error if exists */}
        {serverError && (
          <p className='mb-4 text-center text-sm text-red-500'>{serverError}</p>
        )}

        <Button
          type='submit'
          className='w-full rounded-sm px-4 py-2 font-semibold text-white'
          disabled={isPending}
        >
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
