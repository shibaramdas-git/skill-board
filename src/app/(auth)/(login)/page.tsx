import { Metadata } from 'next';
import LoginForm from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};
export default async function Page() {
  return <LoginForm />;
}
