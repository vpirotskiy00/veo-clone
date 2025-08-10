'use client';

import { useCallback } from 'react';

import { ChatContainer } from '@/components/chat/ChatContainer';
import type { PromptFormData } from '@/lib/schemas/promptSchema';
import { useChatStore } from '@/lib/stores/chatStore';

// export const metadata: Metadata = {
//   title: 'Chat - Veo 3',
//   description: 'Generate videos with AI using natural language prompts',
// };

export default function ChatPage() {
  const { addMessage, setIsTyping, setIsGenerating } = useChatStore();

  const handleSendMessage = useCallback(async (data: PromptFormData) => {
    try {
      // Add user message
      addMessage({
        content: data.prompt,
        type: 'user',
        status: 'sent',
      });

      // Show typing indicator
      setIsTyping(true);
      setIsGenerating(true);

      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsTyping(false);

      // Add assistant response
      addMessage({
        content: 'I\'m generating your video now. This may take a few minutes...',
        type: 'assistant',
        status: 'processing',
        videoUrl: '', // Will be populated when video is ready
      });

      // Simulate video generation
      // In real implementation, this would call the API
      setTimeout(() => {
        // Mock successful video generation
        const mockVideoId = crypto.randomUUID();
        const assistantMessages = useChatStore.getState().messages.filter(msg => msg.type === 'assistant');
        const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];
        
        if (lastAssistantMessage) {
          useChatStore.getState().updateMessage(lastAssistantMessage.id, {
            content: 'Here\'s your generated video! 🎬',
            status: 'completed',
            videoId: mockVideoId,
            videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          });
        }

        setIsGenerating(false);
      }, 5000);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      addMessage({
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        type: 'assistant',
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      setIsTyping(false);
      setIsGenerating(false);
    }
  }, [addMessage, setIsTyping, setIsGenerating]);

  return (
    <div className='h-[calc(100vh-4rem)]'>
      <ChatContainer onSendMessage={handleSendMessage} />
    </div>
  );
}