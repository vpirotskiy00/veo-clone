'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  Paperclip,
  Send, 
  Settings, 
  X,
  Zap 
} from 'lucide-react';
import { useRef,useState } from 'react';
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
import { type PromptFormData,promptSchema } from '@/lib/schemas/promptSchema';

interface ChatInputProps {
  onSubmit: (data: PromptFormData) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSubmit, 
  isLoading = false, 
  disabled = false,
  placeholder = "Describe the video you'd like to generate..." 
}: ChatInputProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = (data: PromptFormData) => {
    if (selectedImage) {
      data.referenceImage = selectedImage;
    }
    onSubmit(data);
    form.reset();
    setSelectedImage(null);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  const SettingsContent = () => (
    <div className='space-y-4'>
      <h4 className='font-medium text-sm'>Generation Settings</h4>
      
      {/* Duration */}
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
                onValueChange={(value) => field.onChange(value[0])}
                step={1}
                value={[field.value || 5]}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Aspect Ratio */}
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

      {/* Style */}
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

      {/* Quality */}
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

  return (
    <Card className='p-4 border-t'>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Reference Image Preview */}
          {selectedImage && (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              className='p-3 bg-muted rounded-lg'
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
            >
              <div className='flex items-center justify-between mb-2'>
                <Label className='text-sm font-medium'>Reference Image</Label>
                <Button
                  className='h-6 w-6 p-0'
                  onClick={removeImage}
                  size='sm'
                  type='button'
                  variant='ghost'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
              <div className='flex items-center gap-3'>
                <div className='h-12 w-12 rounded-lg overflow-hidden bg-background'>
                  <img
                    alt='Reference'
                    className='h-full w-full object-cover'
                    src={URL.createObjectURL(selectedImage)}
                  />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium truncate'>{selectedImage.name}</p>
                  <p className='text-xs text-muted-foreground'>
                    {(selectedImage.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Input */}
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

            {/* Input Actions */}
            <div className='absolute bottom-3 right-3 flex items-center gap-1'>
              {/* Attachment Button */}
              <Button
                className='h-8 w-8 p-0'
                disabled={disabled || isLoading}
                onClick={() => fileInputRef.current?.click()}
                size='sm'
                type='button'
                variant='ghost'
              >
                <Paperclip className='h-4 w-4' />
              </Button>

              {/* Settings Button */}
              {isMobile ? (
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
                    <SettingsContent />
                  </DrawerContent>
                </Drawer>
              ) : (
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
                    <SettingsContent />
                  </PopoverContent>
                </Popover>
              )}

              {/* Send Button */}
              <Button
                className='h-8 w-8 p-0'
                disabled={disabled || isLoading || !form.watch('prompt').trim()}
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
          </div>

          {/* Hidden File Input */}
          <Input
            accept='image/jpeg,image/png,image/webp'
            className='hidden'
            onChange={handleImageSelect}
            ref={fileInputRef}
            type='file'
          />

          {/* Character Count */}
          <div className='flex justify-between items-center text-xs text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <Zap className='h-3 w-3' />
              Powered by Veo 3
            </span>
            <span>
              {form.watch('prompt')?.length || 0} / 2000
            </span>
          </div>
        </form>
      </Form>
    </Card>
  );
}