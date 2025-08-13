'use client';

import { Chrome, Eye, EyeOff, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { useAuth } from '@/components/session-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TelegramIcon } from '@/components/ui/telegram-icon';

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

interface SignInFormProps {
  formData: FormData;
  showPassword: boolean;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: (e: React.MouseEvent) => void;
}

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='email'>Email address</Label>
      <div className='relative'>
        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <Input
          autoComplete='email'
          className='pl-10 h-12'
          id='email'
          inputMode='email'
          onChange={onChange}
          placeholder='Enter your email'
          required
          type='email'
          value={value}
        />
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  value: string;
  showPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: (e: React.MouseEvent) => void;
}

function PasswordField({
  value,
  showPassword,
  onChange,
  onTogglePassword,
}: PasswordFieldProps) {
  return (
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
          onChange={onChange}
          placeholder='Enter your password'
          required
          type={showPassword ? 'text' : 'password'}
          value={value}
        />
        <button
          aria-label='Toggle password visibility'
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground w-11 h-11 flex items-center justify-center -mt-[22px]'
          onClick={onTogglePassword}
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
  );
}

interface RememberCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RememberCheckbox({ checked, onChange }: RememberCheckboxProps) {
  return (
    <label className='flex items-center space-x-3 cursor-pointer'>
      <input
        checked={checked}
        className='w-5 h-5 rounded cursor-pointer'
        id='remember'
        onChange={onChange}
        type='checkbox'
      />
      <span className='text-sm select-none'>Remember me for 30 days</span>
    </label>
  );
}

function SignInForm({
  formData,
  showPassword,
  isLoading,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onTogglePassword,
}: SignInFormProps) {
  return (
    <Card className='p-6'>
      <form className='space-y-4' onSubmit={onSubmit}>
        <EmailField onChange={onEmailChange} value={formData.email} />
        <PasswordField
          onChange={onPasswordChange}
          onTogglePassword={onTogglePassword}
          showPassword={showPassword}
          value={formData.password}
        />
        <RememberCheckbox
          checked={formData.remember}
          onChange={onRememberChange}
        />
        <Button className='w-full' disabled={isLoading} type='submit'>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Card>
  );
}

interface SocialLoginProps {
  isLoading: boolean;
  onGoogleLogin: () => void;
  onTelegramLogin: () => void;
}

function SocialLogin({
  isLoading,
  onGoogleLogin,
  onTelegramLogin,
}: SocialLoginProps) {
  return (
    <>
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
        <Button disabled={isLoading} onClick={onGoogleLogin} variant='outline'>
          <Chrome className='w-4 h-4 mr-2' />
          Google
        </Button>
        <Button
          disabled={isLoading}
          onClick={onTelegramLogin}
          variant='outline'
        >
          <TelegramIcon className='w-4 h-4 mr-2' />
          Telegram
        </Button>
      </div>
    </>
  );
}

function AuthFooter() {
  return (
    <>
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
    </>
  );
}

function useSignInHandlers() {
  const router = useRouter();
  const { startTelegramAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        router.push('/chat');
      }, 1500);
    },
    [router]
  );

  const handleGoogleLogin = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/chat');
    }, 1500);
  }, [router]);

  const handleTelegramLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      await startTelegramAuth();
      router.push('/chat');
    } finally {
      setIsLoading(false);
    }
  }, [router, startTelegramAuth]);

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

  return {
    showPassword,
    isLoading,
    formData,
    handleSubmit,
    handleGoogleLogin,
    handleTelegramLogin,
    handleEmailChange,
    handlePasswordChange,
    handleRememberChange,
    togglePasswordVisibility,
  };
}

function PageHeader() {
  return (
    <div className='text-center space-y-2'>
      <h1 className='text-3xl font-bold'>Welcome back</h1>
      <p className='text-muted-foreground'>
        Sign in to your account to continue creating amazing videos
      </p>
    </div>
  );
}

export default function SignInPage() {
  const {
    showPassword,
    isLoading,
    formData,
    handleSubmit,
    handleGoogleLogin,
    handleTelegramLogin,
    handleEmailChange,
    handlePasswordChange,
    handleRememberChange,
    togglePasswordVisibility,
  } = useSignInHandlers();

  return (
    <div className='space-y-6'>
      <PageHeader />
      <SignInForm
        formData={formData}
        isLoading={isLoading}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onRememberChange={handleRememberChange}
        onSubmit={handleSubmit}
        onTogglePassword={togglePasswordVisibility}
        showPassword={showPassword}
      />
      <SocialLogin
        isLoading={isLoading}
        onGoogleLogin={handleGoogleLogin}
        onTelegramLogin={handleTelegramLogin}
      />
      <AuthFooter />
    </div>
  );
}
