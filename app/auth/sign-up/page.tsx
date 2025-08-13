'use client';

import { Check, Chrome, Eye, EyeOff, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { useAuth } from '@/components/session-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TelegramIcon } from '@/components/ui/telegram-icon';

interface FormData {
  name: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
  marketingEmails: boolean;
}

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^\dA-Za-z]/.test(password)) strength++;
  return strength;
};

const getPasswordStrengthText = (strength: number): string => {
  const strengthTexts = ['', 'Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
  return strengthTexts.at(strength) ?? '';
};

const getPasswordStrengthColor = (strength: number): string => {
  const colors = [
    'text-muted-foreground',
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-blue-500',
    'text-green-500',
  ];
  return colors.at(strength) ?? 'text-muted-foreground';
};

interface PasswordStrengthIndicatorProps {
  password: string;
}

function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password);
  const strengthText = getPasswordStrengthText(strength);
  const strengthColor = getPasswordStrengthColor(strength);

  if (!password) return null;

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between text-xs'>
        <span className={strengthColor}>{strengthText}</span>
        <span className='text-muted-foreground'>
          {password.length}/8 characters
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
      <PasswordRequirements password={password} />
    </div>
  );
}

interface PasswordRequirementsProps {
  password: string;
}

function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    { text: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { text: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: 'One number', test: (pwd: string) => /\d/.test(pwd) },
  ];

  return (
    <div className='text-xs text-muted-foreground space-y-1'>
      {requirements.map((req, index) => (
        <div className='flex items-center space-x-2' key={index}>
          <Check
            className={`w-3 h-3 ${req.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}
          />
          <span>{req.text}</span>
        </div>
      ))}
    </div>
  );
}

interface FormFieldProps {
  formData: FormData;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PasswordFieldProps {
  password: string;
  showPassword: boolean;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: (e: React.MouseEvent) => void;
}

interface CheckboxFieldsProps {
  formData: FormData;
  onAgreeToTermsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMarketingEmailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SignUpFormProps {
  formData: FormData;
  showPassword: boolean;
  isLoading: boolean;
  isFormValid: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: (e: React.MouseEvent) => void;
  onAgreeToTermsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMarketingEmailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormFields({ formData, onNameChange, onEmailChange }: FormFieldProps) {
  return (
    <>
      <div className='space-y-2'>
        <Label htmlFor='name'>Full name</Label>
        <div className='relative'>
          <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
          <Input
            className='pl-10'
            id='name'
            onChange={onNameChange}
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
            onChange={onEmailChange}
            placeholder='Enter your email'
            required
            type='email'
            value={formData.email}
          />
        </div>
      </div>
    </>
  );
}

function PasswordField({
  password,
  showPassword,
  onPasswordChange,
  onTogglePassword,
}: PasswordFieldProps) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='password'>Password</Label>
      <div className='relative'>
        <Input
          className='pr-10'
          id='password'
          onChange={onPasswordChange}
          placeholder='Create a strong password'
          required
          type={showPassword ? 'text' : 'password'}
          value={password}
        />
        <button
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground'
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
      <PasswordStrengthIndicator password={password} />
    </div>
  );
}

function CheckboxFields({
  formData,
  onAgreeToTermsChange,
  onMarketingEmailsChange,
}: CheckboxFieldsProps) {
  return (
    <div className='space-y-3'>
      <div className='flex items-start space-x-2'>
        <input
          checked={formData.agreeToTerms}
          className='rounded mt-0.5'
          id='terms'
          onChange={onAgreeToTermsChange}
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
          onChange={onMarketingEmailsChange}
          type='checkbox'
        />
        <Label className='text-sm leading-relaxed' htmlFor='marketing'>
          I&apos;d like to receive product updates and marketing emails
          (optional)
        </Label>
      </div>
    </div>
  );
}

function SignUpForm({
  formData,
  showPassword,
  isLoading,
  isFormValid,
  onSubmit,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onAgreeToTermsChange,
  onMarketingEmailsChange,
}: SignUpFormProps) {
  return (
    <Card className='p-6'>
      <form className='space-y-4' onSubmit={onSubmit}>
        <FormFields
          formData={formData}
          onEmailChange={onEmailChange}
          onNameChange={onNameChange}
        />
        <PasswordField
          onPasswordChange={onPasswordChange}
          onTogglePassword={onTogglePassword}
          password={formData.password}
          showPassword={showPassword}
        />
        <CheckboxFields
          formData={formData}
          onAgreeToTermsChange={onAgreeToTermsChange}
          onMarketingEmailsChange={onMarketingEmailsChange}
        />
        <Button
          className='w-full'
          disabled={isLoading || !isFormValid}
          type='submit'
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </Card>
  );
}

interface SocialSignUpProps {
  isLoading: boolean;
  onGoogleSignUp: () => void;
  onTelegramSignUp: () => void;
}

function SocialSignUp({
  isLoading,
  onGoogleSignUp,
  onTelegramSignUp,
}: SocialSignUpProps) {
  return (
    <>
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
        <Button disabled={isLoading} onClick={onGoogleSignUp} variant='outline'>
          <Chrome className='w-4 h-4 mr-2' />
          Google
        </Button>
        <Button
          disabled={isLoading}
          onClick={onTelegramSignUp}
          variant='outline'
        >
          <TelegramIcon className='w-4 h-4 mr-2' />
          Telegram
        </Button>
      </div>
    </>
  );
}

function SignUpFooter() {
  return (
    <>
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
    </>
  );
}

function useSignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
    marketingEmails: true,
  });
  const router = useRouter();
  const { startTelegramAuth } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        router.push('/chat');
      }, 2000);
    },
    [router]
  );

  const handleGoogleSignUp = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/chat');
    }, 1500);
  }, [router]);

  const handleTelegramSignUp = useCallback(async () => {
    setIsLoading(true);
    try {
      await startTelegramAuth();
      router.push('/chat');
    } finally {
      setIsLoading(false);
    }
  }, [router, startTelegramAuth]);

  const handleFieldChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const togglePasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(prev => !prev);
  }, []);

  const isFormValid = useMemo(() => {
    const strength = calculatePasswordStrength(formData.password);
    return Boolean(
      formData.name &&
        formData.email &&
        formData.password &&
        formData.agreeToTerms &&
        strength >= 3
    );
  }, [formData]);

  return {
    showPassword,
    isLoading,
    formData,
    isFormValid,
    handleSubmit,
    handleGoogleSignUp,
    handleTelegramSignUp,
    handleFieldChange,
    togglePasswordVisibility,
  };
}

export default function SignUpPage() {
  const {
    showPassword,
    isLoading,
    formData,
    isFormValid,
    handleSubmit,
    handleGoogleSignUp,
    handleTelegramSignUp,
    handleFieldChange,
    togglePasswordVisibility,
  } = useSignUpForm();

  return (
    <div className='space-y-6'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Create your account</h1>
        <p className='text-muted-foreground'>
          Get started with Veo 3 and create your first AI video today
        </p>
      </div>

      <SignUpForm
        formData={formData}
        isFormValid={isFormValid}
        isLoading={isLoading}
        onAgreeToTermsChange={handleFieldChange('agreeToTerms')}
        onEmailChange={handleFieldChange('email')}
        onMarketingEmailsChange={handleFieldChange('marketingEmails')}
        onNameChange={handleFieldChange('name')}
        onPasswordChange={handleFieldChange('password')}
        onSubmit={handleSubmit}
        onTogglePassword={togglePasswordVisibility}
        showPassword={showPassword}
      />

      <SocialSignUp
        isLoading={isLoading}
        onGoogleSignUp={handleGoogleSignUp}
        onTelegramSignUp={handleTelegramSignUp}
      />

      <SignUpFooter />
    </div>
  );
}
