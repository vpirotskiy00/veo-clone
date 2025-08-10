'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, Paperclip, Send, Settings, X, Zap } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { type PromptFormData, promptSchema } from '@/lib/schemas/promptSchema';

interface ChatInputProps {
  onSubmit: (data: PromptFormData) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const motionProps = {
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  initial: { opacity: 0, height: 0 },
};

interface SettingsContentProps {
  form: ReturnType<typeof useForm<PromptFormData>>;
}

function SettingsContent({ form }: SettingsContentProps) {
  const handleDurationChange = useCallback(
    (value: number[]) => {
      form.setValue('duration', value.at(0) ?? 5);
    },
    [form]
  );

  return (
    <div className='space-y-4'>
      <h4 className='font-medium text-sm'>Generation Settings</h4>

      <FormField
        control={form.control}
        name='duration'
        render={({ field }) => (
          <FormItem>
            <div className='flex items-center justify-between'>
              <Label className='text-sm'>Duration</Label>
              <span className='text-sm text-muted-foreground'>
                {field.value}s
              </span>
            </div>
            <FormControl>
              <Slider
                className='w-full'
                max={60}
                min={2}
                onValueChange={handleDurationChange}
                step={1}
                value={[field.value ?? 5]}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='aspectRatio'
        render={({ field }) => (
          <FormItem>
            <Label className='text-sm'>Aspect Ratio</Label>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value='16:9'>16:9 (Landscape)</SelectItem>
                <SelectItem value='9:16'>9:16 (Portrait)</SelectItem>
                <SelectItem value='1:1'>1:1 (Square)</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='style'
        render={({ field }) => (
          <FormItem>
            <Label className='text-sm'>Style</Label>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value='realistic'>Realistic</SelectItem>
                <SelectItem value='artistic'>Artistic</SelectItem>
                <SelectItem value='cinematic'>Cinematic</SelectItem>
                <SelectItem value='abstract'>Abstract</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='quality'
        render={({ field }) => (
          <FormItem>
            <Label className='text-sm'>Quality</Label>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value='draft'>Draft (Fast)</SelectItem>
                <SelectItem value='standard'>Standard</SelectItem>
                <SelectItem value='high'>High (Slow)</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}

interface ImagePreviewProps {
  selectedImage: File;
  onRemove: () => void;
}

function ImagePreview({ selectedImage, onRemove }: ImagePreviewProps) {
  const imageUrl = useMemo(
    () => URL.createObjectURL(selectedImage),
    [selectedImage]
  );
  const fileSize = useMemo(
    () => (selectedImage.size / 1024 / 1024).toFixed(1),
    [selectedImage.size]
  );

  return (
    <motion.div className='p-3 bg-muted rounded-lg' {...motionProps}>
      <div className='flex items-center justify-between mb-2'>
        <Label className='text-sm font-medium'>Reference Image</Label>
        <Button
          className='h-6 w-6 p-0'
          onClick={onRemove}
          size='sm'
          type='button'
          variant='ghost'
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex items-center gap-3'>
        <div className='h-12 w-12 rounded-lg overflow-hidden bg-background'>
          <Image
            alt='Reference'
            className='h-full w-full object-cover'
            height={48}
            src={imageUrl}
            width={48}
          />
        </div>
        <div className='flex-1'>
          <p className='text-sm font-medium truncate'>{selectedImage.name}</p>
          <p className='text-xs text-muted-foreground'>{fileSize} MB</p>
        </div>
      </div>
    </motion.div>
  );
}

function useImageHandling() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImage(file);
      }
    },
    []
  );

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    selectedImage,
    fileInputRef,
    handleImageSelect,
    removeImage,
    handleFileClick,
  };
}

function SettingsButton({ 
  showSettings, 
  setShowSettings, 
  disabled, 
  isLoading, 
  form,
  isMobile 
}: {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  disabled: boolean;
  isLoading: boolean;
  form: ReturnType<typeof useForm<PromptFormData>>;
  isMobile: boolean;
}) {
  if (isMobile) {
    return (
      <Drawer onOpenChange={setShowSettings} open={showSettings}>
        <DrawerTrigger asChild>
          <Button
            className='h-8 w-8 p-0'
            disabled={disabled || isLoading}
            size='sm'
            type='button'
            variant='ghost'
          >
            <Settings className='h-4 w-4' />
          </Button>
        </DrawerTrigger>
        <DrawerContent className='p-4 pb-8'>
          <DrawerHeader className='px-0'>
            <DrawerTitle>Generation Settings</DrawerTitle>
            <DrawerDescription>
              Customize your video generation parameters
            </DrawerDescription>
          </DrawerHeader>
          <SettingsContent form={form} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover onOpenChange={setShowSettings} open={showSettings}>
      <PopoverTrigger asChild>
        <Button
          className='h-8 w-8 p-0'
          disabled={disabled || isLoading}
          size='sm'
          type='button'
          variant='ghost'
        >
          <Settings className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80 p-4'>
        <SettingsContent form={form} />
      </PopoverContent>
    </Popover>
  );
}

function InputControls({ 
  disabled, 
  isLoading, 
  isSubmitDisabled,
  onFileClick, 
  showSettings,
  setShowSettings,
  form,
  isMobile
}: {
  disabled: boolean;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  onFileClick: () => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  form: ReturnType<typeof useForm<PromptFormData>>;
  isMobile: boolean;
}) {
  return (
    <div className='absolute bottom-3 right-3 flex items-center gap-1'>
      <Button
        className='h-8 w-8 p-0'
        disabled={disabled || isLoading}
        onClick={onFileClick}
        size='sm'
        type='button'
        variant='ghost'
      >
        <Paperclip className='h-4 w-4' />
      </Button>

      <SettingsButton
        disabled={disabled}
        form={form}
        isLoading={isLoading}
        isMobile={isMobile}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
      />

      <Button
        className='h-8 w-8 p-0'
        disabled={isSubmitDisabled}
        size='sm'
        type='submit'
      >
        {isLoading ? (
          <Loader2 className='h-4 w-4 animate-spin' />
        ) : (
          <Send className='h-4 w-4' />
        )}
      </Button>
    </div>
  );
}

interface MainFormProps {
  form: ReturnType<typeof useForm<PromptFormData>>;
  onSubmit: (data: PromptFormData) => void;
  disabled: boolean;
  isLoading: boolean;
  placeholder: string;
  selectedImage: File | null;
  removeImage: () => void;
  handleFileClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  isMobile: boolean;
}

function MainForm({ 
  form, 
  onSubmit, 
  disabled, 
  isLoading, 
  placeholder, 
  selectedImage, 
  removeImage,
  handleFileClick,
  fileInputRef,
  handleImageSelect,
  showSettings,
  setShowSettings,
  isMobile
}: MainFormProps) {
  const handleSubmit = useCallback(
    (data: PromptFormData) => {
      if (selectedImage) {
        data.referenceImage = selectedImage;
      }
      onSubmit(data);
      form.reset();
      removeImage();
    },
    [selectedImage, onSubmit, form, removeImage]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.handleSubmit(handleSubmit)();
      }
    },
    [form, handleSubmit]
  );

  const isSubmitDisabled = useMemo(
    () => disabled || isLoading || !form.watch('prompt').trim(),
    [disabled, isLoading, form]
  );

  const promptLength = form.watch('prompt')?.length ?? 0;

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
        {selectedImage && (
          <ImagePreview onRemove={removeImage} selectedImage={selectedImage} />
        )}

        <div className='relative'>
          <FormField
            control={form.control}
            name='prompt'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className='min-h-[80px] pr-24 resize-none'
                    disabled={disabled || isLoading}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InputControls
            disabled={disabled}
            form={form}
            isLoading={isLoading}
            isMobile={isMobile}
            isSubmitDisabled={isSubmitDisabled}
            onFileClick={handleFileClick}
            setShowSettings={setShowSettings}
            showSettings={showSettings}
          />
        </div>

        <Input
          accept='image/jpeg,image/png,image/webp'
          className='hidden'
          onChange={handleImageSelect}
          ref={fileInputRef}
          type='file'
        />

        <div className='flex justify-between items-center text-xs text-muted-foreground'>
          <span className='flex items-center gap-1'>
            <Zap className='h-3 w-3' />
            Powered by Veo 3
          </span>
          <span>{promptLength} / 2000</span>
        </div>
      </form>
    </Form>
  );
}

export function ChatInput({
  onSubmit,
  isLoading = false,
  disabled = false,
  placeholder = "Describe the video you'd like to generate...",
}: ChatInputProps) {
  const [showSettings, setShowSettings] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: '',
      duration: 5,
      aspectRatio: '16:9' as const,
      style: 'realistic' as const,
      quality: 'standard' as const,
    },
  });

  const imageHandling = useImageHandling();

  return (
    <Card className='p-4 border-t'>
      <MainForm
        disabled={disabled}
        fileInputRef={imageHandling.fileInputRef}
        form={form}
        handleFileClick={imageHandling.handleFileClick}
        handleImageSelect={imageHandling.handleImageSelect}
        isLoading={isLoading}
        isMobile={isMobile}
        onSubmit={onSubmit}
        placeholder={placeholder}
        removeImage={imageHandling.removeImage}
        selectedImage={imageHandling.selectedImage}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
      />
    </Card>
  );
}