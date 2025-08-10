'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Bot, Check, Clock, User } from 'lucide-react';
import { forwardRef, useCallback, useMemo } from 'react';

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

interface RetryButtonProps {
  messageId: string;
  onRetry: (messageId: string) => void;
}

// Animation configurations
const motionTransition = { duration: 0.3 };
const motionInitial = { opacity: 0, y: 20 };
const motionAnimate = { opacity: 1, y: 0 };
const avatarGradientClass = 'flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600';
const timeOptions = { hour: '2-digit' as const, minute: '2-digit' as const };

function RetryButton({ messageId, onRetry }: RetryButtonProps) {
  const handleClick = useCallback(() => {
    onRetry(messageId);
  }, [messageId, onRetry]);

  return (
    <Button
      className='h-7 px-2 text-xs'
      onClick={handleClick}
      size='sm'
      variant='outline'
    >
      Retry
    </Button>
  );
}

function getStatusIcon(status: ChatMessageType['status']) {
  switch (status) {
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
}

function getStatusText(status: ChatMessageType['status'], error?: string) {
  switch (status) {
    case 'sending':
      return 'Sending...';
    case 'sent':
      return 'Sent';
    case 'processing':
      return 'Generating video...';
    case 'completed':
      return 'Completed';
    case 'error':
      return error || 'Error occurred';
    default:
      return '';
  }
}

function MessageAvatar({ isUser }: { isUser: boolean }) {
  return (
    <Avatar className='h-8 w-8 shrink-0'>
      <div className={avatarGradientClass}>
        {isUser ? (
          <User className='h-4 w-4 text-white' />
        ) : (
          <Bot className='h-4 w-4 text-white' />
        )}
      </div>
    </Avatar>
  );
}

function MessageContent({ 
  message, 
  isUser, 
  isAssistant, 
  onRetry 
}: { 
  message: ChatMessageType;
  isUser: boolean;
  isAssistant: boolean;
  onRetry?: (messageId: string) => void;
}) {
  const cardClassName = useMemo(
    () => cn(
      'px-4 py-3',
      isUser ? 'bg-primary text-primary-foreground' : 'bg-muted',
      message.status === 'error' && 'border-red-500 bg-red-50 dark:bg-red-950'
    ),
    [isUser, message.status]
  );

  return (
    <Card className={cardClassName}>
      <div className='prose prose-sm max-w-none dark:prose-invert'>
        <p className='mb-0 whitespace-pre-wrap break-words'>
          {message.content}
        </p>
      </div>

      {message.videoUrl && (
        <div className='mt-3'>
          <VideoPreview
            status={message.status}
            videoId={message.videoId}
            videoUrl={message.videoUrl}
          />
        </div>
      )}

      {message.status === 'processing' && isAssistant && (
        <div className='mt-3'>
          <div className='mb-2 flex items-center justify-between text-xs text-muted-foreground'>
            <span>Generating your video...</span>
            <span>~2-3 minutes</span>
          </div>
          <Progress className='h-1' value={Math.random() * 100} />
        </div>
      )}

      {message.status === 'error' && (
        <div className='mt-3 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-red-600 dark:text-red-400'>
            <AlertCircle className='h-4 w-4' />
            <span>Failed to generate video</span>
          </div>
          {onRetry && (
            <RetryButton messageId={message.id} onRetry={onRetry} />
          )}
        </div>
      )}
    </Card>
  );
}

function MessageMeta({ 
  message, 
  isUser 
}: { 
  message: ChatMessageType;
  isUser: boolean;
}) {
  const metaClassName = useMemo(
    () => cn(
      'mt-1 flex items-center gap-2 text-xs text-muted-foreground',
      isUser ? 'flex-row-reverse' : 'flex-row'
    ),
    [isUser]
  );

  const badgeClassName = useMemo(
    () => cn(
      'h-5 px-1.5 text-xs',
      message.status === 'error' &&
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    ),
    [message.status]
  );

  return (
    <div className={metaClassName}>
      <time>
        {new Date(message.timestamp).toLocaleTimeString([], timeOptions)}
      </time>

      <div className='flex items-center gap-1'>
        {getStatusIcon(message.status)}
        <Badge className={badgeClassName} variant='secondary'>
          {getStatusText(message.status, message.error)}
        </Badge>
      </div>
    </div>
  );
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, onRetry, isLast: _isLast }, ref) => {
    const isUser = message.type === 'user';
    const isAssistant = message.type === 'assistant';

    const containerClassName = useMemo(
      () => cn(
        'flex w-full gap-3 px-4 py-6',
        isUser ? 'flex-row-reverse' : 'flex-row'
      ),
      [isUser]
    );

    const contentClassName = useMemo(
      () => cn(
        'flex flex-col',
        isUser ? 'items-end' : 'items-start',
        'max-w-[80%]'
      ),
      [isUser]
    );

    return (
      <motion.div
        animate={motionAnimate}
        className={containerClassName}
        initial={motionInitial}
        ref={ref}
        transition={motionTransition}
      >
        <MessageAvatar isUser={isUser} />

        <div className={contentClassName}>
          <MessageContent 
            isAssistant={isAssistant}
            isUser={isUser}
            message={message}
            onRetry={onRetry}
          />
          <MessageMeta isUser={isUser} message={message} />
        </div>
      </motion.div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';
