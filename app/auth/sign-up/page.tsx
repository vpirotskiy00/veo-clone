'use client';

import { Check, Chrome, Eye, EyeOff, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TelegramIcon } from '@/components/ui/telegram-icon';
import { signIn } from '@/lib/auth';

// Utility functions moved outside component
const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^\dA-Za-z]/.test(password)) strength++;
  return strength;
};

const getPasswordStrengthText = (strength: number) => {
  switch (strength) {
    case 0:
      return '';
    case 1:
      return 'Very weak';
    case 2:
      return 'Weak';
    case 3:
      return 'Fair';
    case 4:
      return 'Good';
    case 5:
      return 'Strong';
    default:
      return '';
  }
};

const getPasswordStrengthColor = (strength: number) => {
  switch (strength) {
    case 1:
      return 'text-red-500';
    case 2:
      return 'text-orange-500';
    case 3:
      return 'text-yellow-500';
    case 4:
      return 'text-blue-500';
    case 5:
      return 'text-green-500';
    default:
      return 'text-muted-foreground';
  }
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
    marketingEmails: true,
  });
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Simulate account creation
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 2000);
    },
    [router]
  );

  const handleGoogleSignUp = useCallback(async () => {
    setIsLoading(true);
    try {
      await signIn('google', {
        redirectTo: '/dashboard',
        redirect: true,
      });
    } catch (error) {
      console.error('Google sign-up error:', error);
      setIsLoading(false);
    }
  }, []);

  const handleTelegramSignUp = useCallback(() => {
    setIsLoading(true);
    // Temporary redirect to dashboard for Telegram
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  }, [router]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, name: e.target.value }));
    },
    []
  );

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

  const togglePasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(prev => !prev);
  }, []);

  const handleAgreeToTermsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }));
    },
    []
  );

  const handleMarketingEmailsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, marketingEmails: e.target.checked }));
    },
    []
  );

  const strength = calculatePasswordStrength(formData.password);
  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.agreeToTerms &&
    strength >= 3;

  return (
    <div className='space-y-6'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Create your account</h1>
        <p className='text-muted-foreground'>
          Get started with Veo 3 and create your first AI video today
        </p>
      </div>

      <Card className='p-6'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full name</Label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                className='pl-10'
                id='name'
                onChange={handleNameChange}
                placeholder='Enter your full name'
                required
                type='text'
                value={formData.name}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email address</Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                className='pl-10'
                id='email'
                onChange={handleEmailChange}
                placeholder='Enter your email'
                required
                type='email'
                value={formData.email}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                className='pr-10'
                id='password'
                onChange={handlePasswordChange}
                placeholder='Create a strong password'
                required
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
              />
              <button
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground'
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
            {formData.password && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-xs'>
                  <span className={getPasswordStrengthColor(strength)}>
                    {getPasswordStrengthText(strength)}
                  </span>
                  <span className='text-muted-foreground'>
                    {formData.password.length}/8 characters
                  </span>
                </div>
                <div className='flex space-x-1'>
                  {[1, 2, 3, 4, 5].map(level => (
                    <div
                      className={`flex-1 h-1 rounded-full ${
                        level <= strength
                          ? level <= 2
                            ? 'bg-red-500'
                            : level <= 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          : 'bg-muted'
                      }`}
                      key={level}
                    />
                  ))}
                </div>
                <div className='text-xs text-muted-foreground space-y-1'>
                  <div className='flex items-center space-x-2'>
                    <Check
                      className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}`}
                    />
                    <span>At least 8 characters</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Check
                      className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-muted-foreground'}`}
                    />
                    <span>One uppercase letter</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Check
                      className={`w-3 h-3 ${/\d/.test(formData.password) ? 'text-green-500' : 'text-muted-foreground'}`}
                    />
                    <span>One number</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='space-y-3'>
            <div className='flex items-start space-x-2'>
              <input
                checked={formData.agreeToTerms}
                className='rounded mt-0.5'
                id='terms'
                onChange={handleAgreeToTermsChange}
                required
                type='checkbox'
              />
              <Label className='text-sm leading-relaxed' htmlFor='terms'>
                I agree to the{' '}
                <Link className='text-primary hover:underline' href='/terms'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link className='text-primary hover:underline' href='/privacy'>
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className='flex items-start space-x-2'>
              <input
                checked={formData.marketingEmails}
                className='rounded mt-0.5'
                id='marketing'
                onChange={handleMarketingEmailsChange}
                type='checkbox'
              />
              <Label className='text-sm leading-relaxed' htmlFor='marketing'>
                I&apos;d like to receive product updates and marketing emails
                (optional)
              </Label>
            </div>
          </div>

          <Button
            className='w-full'
            disabled={isLoading || !isFormValid}
            type='submit'
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </Card>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='w-full' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or sign up with
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Button
          disabled={isLoading}
          onClick={handleGoogleSignUp}
          variant='outline'
        >
          <Chrome className='w-4 h-4 mr-2' />
          Google
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleTelegramSignUp}
          variant='outline'
        >
          <TelegramIcon className='w-4 h-4 mr-2' />
          Telegram
        </Button>
      </div>

      <div className='text-center text-sm'>
        <span className='text-muted-foreground'>Already have an account? </span>
        <Link
          className='text-primary hover:underline font-medium'
          href='/auth/sign-in'
        >
          Sign in
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
