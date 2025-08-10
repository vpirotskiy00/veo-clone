'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Bot, Check, Clock, User } from 'lucide-react';
import { forwardRef } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { ChatMessage as ChatMessageType } from '@/lib/stores/chatStore';
import { cn } from '@/lib/utils';

import { VideoPreview } from './VideoPreview';

interface ChatMessageProps {
  message: ChatMessageType;
  onRetry?: (messageId: string) => void;
  isLast?: boolean;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, onRetry, isLast }, ref) => {
    const isUser = message.type === 'user';
    const isAssistant = message.type === 'assistant';

    const getStatusIcon = () => {
      switch (message.status) {
        case 'sending':
          return <Clock className='h-3 w-3 animate-pulse' />;
        case 'sent':
          return <Check className='h-3 w-3' />;
        case 'processing':
          return <Clock className='h-3 w-3 animate-spin' />;
        case 'completed':
          return <Check className='h-3 w-3' />;
        case 'error':
          return <AlertCircle className='h-3 w-3 text-red-500' />;
        default:
          return null;
      }
    };

    const getStatusText = () => {
      switch (message.status) {
        case 'sending':
          return 'Sending...';
        case 'sent':
          return 'Sent';
        case 'processing':
          return 'Generating video...';
        case 'completed':
          return 'Completed';
        case 'error':
          return message.error || 'Error occurred';
        default:
          return '';
      }
    };

    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'flex w-full gap-3 px-4 py-6',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}
        initial={{ opacity: 0, y: 20 }}
        ref={ref}
        transition={{ duration: 0.3 }}
      >
        {/* Avatar */}
        <Avatar className='h-8 w-8 shrink-0'>
          <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
            {isUser ? (
              <User className='h-4 w-4 text-white' />
            ) : (
              <Bot className='h-4 w-4 text-white' />
            )}
          </div>
        </Avatar>

        {/* Message Content */}
        <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start', 'max-w-[80%]')}>
          {/* Message Card */}
          <Card
            className={cn(
              'px-4 py-3',
              isUser
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted',
              message.status === 'error' && 'border-red-500 bg-red-50 dark:bg-red-950'
            )}
          >
            {/* Text Content */}
            <div className='prose prose-sm max-w-none dark:prose-invert'>
              <p className='mb-0 whitespace-pre-wrap break-words'>{message.content}</p>
            </div>

            {/* Video Content */}
            {message.videoUrl && (
              <div className='mt-3'>
                <VideoPreview 
                  status={message.status} 
                  videoId={message.videoId}
                  videoUrl={message.videoUrl}
                />
              </div>
            )}

            {/* Processing Progress */}
            {message.status === 'processing' && isAssistant && (
              <div className='mt-3'>
                <div className='mb-2 flex items-center justify-between text-xs text-muted-foreground'>
                  <span>Generating your video...</span>
                  <span>~2-3 minutes</span>
                </div>
                <Progress className='h-1' value={Math.random() * 100} />
              </div>
            )}

            {/* Error State */}
            {message.status === 'error' && (
              <div className='mt-3 flex items-center justify-between'>
                <div className='flex items-center gap-2 text-sm text-red-600 dark:text-red-400'>
                  <AlertCircle className='h-4 w-4' />
                  <span>Failed to generate video</span>
                </div>
                {onRetry && (
                  <Button
                    className='h-7 px-2 text-xs'
                    onClick={() => onRetry(message.id)}
                    size='sm'
                    variant='outline'
                  >
                    Retry
                  </Button>
                )}
              </div>
            )}
          </Card>

          {/* Message Meta */}
          <div
            className={cn(
              'mt-1 flex items-center gap-2 text-xs text-muted-foreground',
              isUser ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <time>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
            
            {/* Status */}
            <div className='flex items-center gap-1'>
              {getStatusIcon()}
              <Badge 
                className={cn(
                  'h-5 px-1.5 text-xs',
                  message.status === 'error' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                )} 
                variant='secondary'
              >
                {getStatusText()}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';