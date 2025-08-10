import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant' | 'system';
  timestamp: Date;
  status: 'sending' | 'sent' | 'processing' | 'completed' | 'error';
  videoUrl?: string;
  videoId?: string;
  error?: string;
}

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  isGenerating: boolean;
  currentPrompt: string;
  
  // Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  setIsTyping: (typing: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  setCurrentPrompt: (prompt: string) => void;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isTyping: false,
      isGenerating: false,
      currentPrompt: '',

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      updateMessage: (id, updates) => {
        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === id ? { ...message, ...updates } : message
          ),
        }));
      },

      setIsTyping: (typing) => set({ isTyping: typing }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
      
      clearMessages: () => set({ messages: [] }),
      
      removeMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        }));
      },
    }),
    {
      name: 'veo-chat-storage',
      partialize: (state) => ({ 
        messages: state.messages.filter(msg => msg.status !== 'sending'),
      }),
    }
  )
);