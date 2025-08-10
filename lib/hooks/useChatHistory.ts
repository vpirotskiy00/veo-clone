import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useChatStore } from '@/lib/stores/chatStore';
import type { ChatMessage } from '@/lib/stores/chatStore';

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  preview?: string;
}

interface UseChatHistoryOptions {
  enablePersistence?: boolean;
  maxHistoryItems?: number;
}

export function useChatHistory(options: UseChatHistoryOptions = {}) {
  const { enablePersistence = true, maxHistoryItems = 50 } = options;
  const queryClient = useQueryClient();
  const { messages, clearMessages } = useChatStore();

  // Generate chat title from first user message
  const generateChatTitle = useCallback((messages: ChatMessage[]): string => {
    const firstUserMessage = messages.find(msg => msg.type === 'user');
    if (!firstUserMessage) return 'New Chat';
    
    const content = firstUserMessage.content.trim();
    if (content.length <= 50) return content;
    
    return content.substring(0, 47) + '...';
  }, []);

  // Get current chat summary
  const getCurrentChatSummary = useCallback((): ChatHistoryItem | null => {
    if (messages.length === 0) return null;

    const lastMessage = messages[messages.length - 1];
    const title = generateChatTitle(messages);
    
    return {
      id: 'current',
      title,
      lastMessage: lastMessage.content.substring(0, 100),
      timestamp: lastMessage.timestamp,
      messageCount: messages.length,
      preview: messages.find(msg => msg.videoUrl)?.videoUrl,
    };
  }, [messages, generateChatTitle]);

  // Mock chat history query (in real app, this would fetch from API/database)
  const chatHistoryQuery = useQuery({
    queryKey: ['chatHistory'],
    queryFn: async (): Promise<ChatHistoryItem[]> => {
      if (!enablePersistence) return [];
      
      // In a real implementation, this would fetch from your backend
      // For now, we'll return mock data
      const mockHistory: ChatHistoryItem[] = [
        {
          id: '1',
          title: 'Mountain landscape video',
          lastMessage: 'Here\'s your generated video! 🎬',
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          messageCount: 4,
          preview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        },
        {
          id: '2',
          title: 'Ocean waves at sunset',
          lastMessage: 'I\'m generating your video now...',
          timestamp: new Date(Date.now() - 172800000), // 2 days ago
          messageCount: 6,
        },
        {
          id: '3',
          title: 'City timelapse scene',
          lastMessage: 'Perfect! Your video is ready.',
          timestamp: new Date(Date.now() - 259200000), // 3 days ago
          messageCount: 8,
          preview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        },
      ];

      return mockHistory;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Save current chat mutation
  const saveChatMutation = useMutation({
    mutationFn: async (chatData: {
      title?: string;
      messages: ChatMessage[];
    }) => {
      if (!enablePersistence) return null;
      
      // In a real implementation, this would save to your backend
      const chatItem: ChatHistoryItem = {
        id: crypto.randomUUID(),
        title: chatData.title || generateChatTitle(chatData.messages),
        lastMessage: chatData.messages[chatData.messages.length - 1]?.content || '',
        timestamp: new Date(),
        messageCount: chatData.messages.length,
        preview: chatData.messages.find(msg => msg.videoUrl)?.videoUrl,
      };

      // Update local query cache
      queryClient.setQueryData<ChatHistoryItem[]>(['chatHistory'], (old = []) => [
        chatItem,
        ...old.slice(0, maxHistoryItems - 1)
      ]);

      return chatItem;
    },
  });

  // Delete chat mutation
  const deleteChatMutation = useMutation({
    mutationFn: async (chatId: string) => {
      if (!enablePersistence) return;
      
      // In a real implementation, this would delete from your backend
      queryClient.setQueryData<ChatHistoryItem[]>(['chatHistory'], (old = []) =>
        old.filter(chat => chat.id !== chatId)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
  });

  // Load chat mutation
  const loadChatMutation = useMutation({
    mutationFn: async (chatId: string): Promise<ChatMessage[]> => {
      if (!enablePersistence) return [];
      
      // In a real implementation, this would load from your backend
      // For now, return empty array as we don't have persistence
      return [];
    },
  });

  // Actions
  const saveCurrentChat = useCallback(async (title?: string) => {
    if (messages.length === 0) return null;
    
    return saveChatMutation.mutateAsync({
      title,
      messages,
    });
  }, [messages, saveChatMutation]);

  const loadChat = useCallback(async (chatId: string) => {
    const messages = await loadChatMutation.mutateAsync(chatId);
    // In a real implementation, you'd load these messages into the chat store
    // For now, we'll just clear current messages
    clearMessages();
    return messages;
  }, [loadChatMutation, clearMessages]);

  const deleteChat = useCallback(async (chatId: string) => {
    return deleteChatMutation.mutateAsync(chatId);
  }, [deleteChatMutation]);

  const startNewChat = useCallback(() => {
    clearMessages();
    queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
  }, [clearMessages, queryClient]);

  return {
    // Data
    chatHistory: chatHistoryQuery.data || [],
    currentChatSummary: getCurrentChatSummary(),
    
    // State
    isLoading: chatHistoryQuery.isLoading,
    isSaving: saveChatMutation.isPending,
    isDeleting: deleteChatMutation.isPending,
    isLoadingChat: loadChatMutation.isPending,
    
    // Actions
    saveCurrentChat,
    loadChat,
    deleteChat,
    startNewChat,
    
    // Queries
    chatHistoryQuery,
    saveChatMutation,
    deleteChatMutation,
    loadChatMutation,
  };
}