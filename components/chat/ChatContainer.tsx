'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageSquare } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { PromptFormData } from '@/lib/schemas/promptSchema';
import {
  type ChatMessage as ChatMessageType,
  useChatStore,
} from '@/lib/stores/chatStore';
import { cn } from '@/lib/utils';

import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

// Constants
const EMPTY_STATE_ANIMATION = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 20 },
  transition: { duration: 0.6 },
};

const TYPING_INDICATOR_ANIMATION = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  initial: { opacity: 0, y: 20 },
  transition: { duration: 0.2 },
};

const SCROLL_OPTIONS = {
  behavior: 'smooth' as const,
  block: 'end' as const,
};

interface ChatContainerProps {
  onSendMessage: (data: PromptFormData) => void;
  className?: string;
}

// Chat header component
function ChatHeader() {
  return (
    <div className='flex-shrink-0 px-4 md:px-6 py-3 md:py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex items-center gap-3'>
        <div className='flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600'>
          <Bot className='h-4 w-4 md:h-5 md:w-5 text-white' />
        </div>
        <div>
          <h2 className='text-base md:text-lg font-semibold'>Veo 3 Chat</h2>
          <p className='text-xs md:text-sm text-muted-foreground hidden sm:block'>
            Generate videos with AI
          </p>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  const EXAMPLE_PROMPTS = [
    {
      icon: '💡',
      text: 'Try: "A majestic eagle soaring over snow-capped mountains"',
    },
    {
      icon: '🎬',
      text: 'Try: "Time-lapse of a blooming flower in a sunlit garden"',
    },
    {
      icon: '🌊',
      text: 'Try: "Ocean waves crashing against rocky cliffs at sunset"',
    },
  ];

  return (
    <div className='flex flex-col items-center justify-center h-full min-h-[400px] px-4 md:px-6'>
      <motion.div
        {...EMPTY_STATE_ANIMATION}
        className='text-center max-w-md w-full'
      >
        <div className='mx-auto mb-4 md:mb-6 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10'>
          <MessageSquare className='h-8 w-8 md:h-10 md:w-10 text-primary' />
        </div>
        <h3 className='text-lg md:text-xl font-semibold mb-2 md:mb-3'>
          Start Creating Amazing Videos
        </h3>
        <p className='text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base'>
          Describe your vision and watch as Veo 3 brings it to life. Create
          cinematic scenes, product showcases, or anything you can imagine.
        </p>
        <div className='grid gap-2 text-xs md:text-sm text-left'>
          {EXAMPLE_PROMPTS.map((prompt, index) => (
            <div
              className='flex items-start gap-2 p-2 md:p-3 rounded-lg bg-muted/50'
              key={index}
            >
              <span className='text-primary font-semibold shrink-0'>
                {prompt.icon}
              </span>
              <span>{prompt.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Messages list component
function MessagesList({
  messages,
  handleRetry,
  isTyping,
}: {
  messages: ChatMessageType[];
  handleRetry: (messageId: string) => void;
  isTyping: boolean;
}) {
  return (
    <div className='pb-6'>
      <AnimatePresence mode='popLayout'>
        {messages.map((message, index) => (
          <ChatMessage
            isLast={index === messages.length - 1}
            key={message.id}
            message={message}
            onRetry={handleRetry}
          />
        ))}
      </AnimatePresence>

      {isTyping && (
        <motion.div {...TYPING_INDICATOR_ANIMATION}>
          <TypingIndicator />
        </motion.div>
      )}
    </div>
  );
}

export function ChatContainer({
  onSendMessage,
  className,
}: ChatContainerProps) {
  const { messages, isTyping, isGenerating } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(SCROLL_OPTIONS);
  }, [messages, isTyping]);

  const handleRetry = useCallback(
    (messageId: string) => {
      const message = messages.find(msg => msg.id === messageId);
      if (message && message.type === 'user') {
        // Recreate the form data from the message
        const retryData: PromptFormData = {
          prompt: message.content,
          duration: 5,
          aspectRatio: '16:9',
          style: 'realistic',
          quality: 'standard',
        };
        onSendMessage(retryData);
      }
    },
    [messages, onSendMessage]
  );

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      <ChatHeader />

      <ScrollArea
        className='flex-1 px-0 pb-[env(safe-area-inset-bottom)]'
        ref={scrollAreaRef}
      >
        <div className='min-h-full'>
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <MessagesList
              handleRetry={handleRetry}
              isTyping={isTyping}
              messages={messages}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className='flex-shrink-0'>
        <ChatInput
          disabled={isGenerating}
          isLoading={isGenerating}
          onSubmit={onSendMessage}
        />
      </div>
    </div>
  );
}
