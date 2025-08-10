import { z } from 'zod';

export const promptSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters long')
    .max(2000, 'Prompt cannot exceed 2000 characters')
    .regex(
      /^[\d\s!"'(),.:;?A-Za-z\-]+$/,
      'Prompt contains invalid characters'
    ),
  
  // Optional reference image
  referenceImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB max
      'Image must be smaller than 10MB'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WebP images are supported'
    )
    .optional(),
    
  // Video generation parameters
  duration: z
    .number()
    .min(2)
    .max(60)
    .default(5),
    
  aspectRatio: z
    .enum(['16:9', '9:16', '1:1'])
    .default('16:9'),
    
  style: z
    .enum(['realistic', 'artistic', 'cinematic', 'abstract'])
    .default('realistic'),
    
  quality: z
    .enum(['draft', 'standard', 'high'])
    .default('standard'),
});

export const chatMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  type: z.enum(['user', 'assistant', 'system']),
});

export const videoGenerationRequestSchema = z.object({
  prompt: z.string().min(10).max(2000),
  settings: z.object({
    duration: z.number().min(2).max(60),
    aspectRatio: z.enum(['16:9', '9:16', '1:1']),
    style: z.enum(['realistic', 'artistic', 'cinematic', 'abstract']),
    quality: z.enum(['draft', 'standard', 'high']),
  }),
  referenceImageUrl: z.string().url().optional(),
});

export const videoGenerationResponseSchema = z.object({
  id: z.string(),
  status: z.enum(['processing', 'completed', 'failed']),
  videoUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  progress: z.number().min(0).max(100).optional(),
  estimatedTime: z.number().optional(),
  error: z.string().optional(),
});

// Type exports
export type PromptFormData = z.infer<typeof promptSchema>;
export type ChatMessageData = z.infer<typeof chatMessageSchema>;
export type VideoGenerationRequest = z.infer<typeof videoGenerationRequestSchema>;
export type VideoGenerationResponse = z.infer<typeof videoGenerationResponseSchema>;