'use client';

import { Chrome, Eye, EyeOff, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TelegramIcon } from '@/components/ui/telegram-icon';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Simulate authentication
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 1500);
    },
    [router]
  );

  const handleGoogleLogin = useCallback(() => {
    setIsLoading(true);
    // Temporary redirect to dashboard for Google (same as Telegram)
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  }, [router]);

  const handleTelegramLogin = useCallback(() => {
    setIsLoading(true);
    // Temporary redirect to dashboard for Telegram
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  }, [router]);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, email: e.target.value }));
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, password: e.target.value }));
    },
    []
  );

  const handleRememberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, remember: e.target.checked }));
    },
    []
  );

  const togglePasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className='space-y-6'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Welcome back</h1>
        <p className='text-muted-foreground'>
          Sign in to your account to continue creating amazing videos
        </p>
      </div>

      <Card className='p-6'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email address</Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                autoComplete='email'
                className='pl-10 h-12'
                id='email'
                inputMode='email'
                onChange={handleEmailChange}
                placeholder='Enter your email'
                required
                type='email'
                value={formData.email}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <Label htmlFor='password'>Password</Label>
              <Link
                className='text-sm text-primary hover:underline'
                href='/auth/forgot-password'
              >
                Forgot password?
              </Link>
            </div>
            <div className='relative'>
              <Input
                autoComplete='current-password'
                className='pr-10 h-12'
                id='password'
                onChange={handlePasswordChange}
                placeholder='Enter your password'
                required
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
              />
              <button
                aria-label='Toggle password visibility'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground w-11 h-11 flex items-center justify-center -mt-[22px]'
                onClick={togglePasswordVisibility}
                type='button'
              >
                {showPassword ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
              </button>
            </div>
          </div>

          <label className='flex items-center space-x-3 cursor-pointer'>
            <input
              checked={formData.remember}
              className='w-5 h-5 rounded cursor-pointer'
              id='remember'
              onChange={handleRememberChange}
              type='checkbox'
            />
            <span className='text-sm select-none'>Remember me for 30 days</span>
          </label>

          <Button className='w-full' disabled={isLoading} type='submit'>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Card>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='w-full' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Button
          disabled={isLoading}
          onClick={handleGoogleLogin}
          variant='outline'
        >
          <Chrome className='w-4 h-4 mr-2' />
          Google
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleTelegramLogin}
          variant='outline'
        >
          <TelegramIcon className='w-4 h-4 mr-2' />
          Telegram
        </Button>
      </div>

      <div className='text-center text-sm'>
        <span className='text-muted-foreground'>
          Don&apos;t have an account?{' '}
        </span>
        <Link
          className='text-primary hover:underline font-medium'
          href='/auth/sign-up'
        >
          Sign up for free
        </Link>
      </div>

      <div className='text-center'>
        <Link
          className='text-sm text-muted-foreground hover:text-foreground'
          href='/'
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
