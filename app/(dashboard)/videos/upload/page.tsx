'use client';

import { AlertCircle, CheckCircle, File, Play, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizeIndex = Math.min(Math.max(i, 0), sizes.length - 1);
  const sizeUnit = sizes.at(sizeIndex) ?? 'Bytes';
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizeUnit}`;
};

const getFileTypeIcon = (file: File): string => {
  if (file.type.startsWith('video/')) return '🎥';
  if (file.type.startsWith('audio/')) return '🎵';
  if (file.type.startsWith('image/')) return '🖼️';
  return '📄';
};

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

interface UploadAreaProps {
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadArea({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: UploadAreaProps) {
  return (
    <Card className='p-8'>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-12 text-center transition-colors',
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25',
          'hover:border-primary hover:bg-primary/5'
        )}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Upload className='w-12 h-12 mx-auto mb-4 text-muted-foreground' />
        <h3 className='text-lg font-semibold mb-2'>Upload your files</h3>
        <p className='text-muted-foreground mb-6'>
          Drag and drop your video, audio, or image files here, or click to
          browse
        </p>
        <div className='space-y-4'>
          <div>
            <input
              accept='video/*,audio/*,image/*'
              className='hidden'
              id='file-upload'
              multiple
              onChange={onFileSelect}
              type='file'
            />
            <Button asChild>
              <label className='cursor-pointer' htmlFor='file-upload'>
                Choose Files
              </label>
            </Button>
          </div>
          <div className='text-xs text-muted-foreground space-y-1'>
            <p>Supported formats: MP4, MOV, AVI, MP3, WAV, JPG, PNG</p>
            <p>Maximum file size: 500MB per file</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface FileItemProps {
  uploadFile: UploadFile;
  onRemove: (id: string) => void;
}

function FileItem({ uploadFile, onRemove }: FileItemProps) {
  const handleRemove = useCallback(() => {
    onRemove(uploadFile.id);
  }, [onRemove, uploadFile.id]);

  return (
    <div className='border rounded-lg p-4'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          {uploadFile.preview ? (
            <Image
              alt='Preview'
              className='rounded object-cover'
              height={64}
              src={uploadFile.preview}
              width={64}
            />
          ) : (
            <div className='w-16 h-16 bg-muted rounded flex items-center justify-center text-2xl'>
              {getFileTypeIcon(uploadFile.file)}
            </div>
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between mb-2'>
            <div>
              <p className='font-medium truncate'>{uploadFile.file.name}</p>
              <p className='text-sm text-muted-foreground'>
                {formatFileSize(uploadFile.file.size)} • {uploadFile.file.type}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              {uploadFile.status === 'completed' && (
                <CheckCircle className='w-5 h-5 text-green-500' />
              )}
              {uploadFile.status === 'error' && (
                <AlertCircle className='w-5 h-5 text-red-500' />
              )}
              <Button onClick={handleRemove} size='sm' variant='ghost'>
                <X className='w-4 h-4' />
              </Button>
            </div>
          </div>

          {uploadFile.status === 'uploading' && (
            <div className='space-y-2'>
              <Progress className='h-2' value={uploadFile.progress} />
              <p className='text-xs text-muted-foreground'>
                Uploading... {Math.round(uploadFile.progress)}%
              </p>
            </div>
          )}

          {uploadFile.status === 'completed' && (
            <div className='flex items-center space-x-4 mt-2'>
              <Button size='sm' variant='outline'>
                <Play className='w-4 h-4 mr-2' />
                Preview
              </Button>
              <Button size='sm' variant='outline'>
                Enhance with AI
              </Button>
            </div>
          )}

          {uploadFile.status === 'error' && (
            <div className='mt-2'>
              <p className='text-sm text-red-600'>
                Upload failed. Please try again.
              </p>
              <Button className='mt-2' size='sm' variant='outline'>
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EnhancementOptions() {
  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <h3 className='text-lg font-semibold'>AI Enhancement Options</h3>

        <div className='grid md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <h4 className='font-medium'>Video Enhancements</h4>
            <div className='space-y-3'>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>Upscale resolution to 4K</span>
              </label>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>Stabilize shaky footage</span>
              </label>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>Enhance colors and contrast</span>
              </label>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>Remove background noise</span>
              </label>
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium'>AI Additions</h4>
            <div className='space-y-3'>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>
                  Generate realistic sound effects
                </span>
              </label>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>Add ambient audio</span>
              </label>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>Create smooth transitions</span>
              </label>
              <label className='flex items-center space-x-3'>
                <input className='rounded' type='checkbox' />
                <span className='text-sm'>Auto-generate captions</span>
              </label>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <Label htmlFor='enhancement-description'>
              Enhancement Description (Optional)
            </Label>
            <Textarea
              className='mt-1'
              id='enhancement-description'
              placeholder='Describe any specific enhancements you want...'
            />
          </div>
        </div>

        <div className='flex justify-end space-x-2'>
          <Button variant='outline'>Save as Draft</Button>
          <Button>Start Enhancement</Button>
        </div>
      </div>
    </Card>
  );
}

function useFileUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const addFiles = useCallback((newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      progress: 0,
      status: 'uploading' as const,
      preview: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setFiles(prev => [...prev, ...uploadFiles]);

    uploadFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id, setFiles);
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  return {
    files,
    isDragOver,
    handleDragOver,
    handleDragLeave,
    addFiles,
    removeFile,
  };
}

function simulateUpload(
  uploadFileId: string,
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
) {
  const interval = setInterval(() => {
    setFiles(prev =>
      prev.map(f => {
        if (f.id === uploadFileId) {
          const newProgress = f.progress + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...f, progress: 100, status: 'completed' };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      })
    );
  }, 200);
}

export default function UploadPage() {
  const {
    files,
    isDragOver,
    handleDragOver,
    handleDragLeave,
    addFiles,
    removeFile,
  } = useFileUpload();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleDragLeave(e);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const mediaFiles = droppedFiles.filter(
        file =>
          file.type.startsWith('video/') ||
          file.type.startsWith('audio/') ||
          file.type.startsWith('image/')
      );

      addFiles(mediaFiles);
    },
    [addFiles, handleDragLeave]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      addFiles(selectedFiles);
    },
    [addFiles]
  );

  const hasCompletedFiles = files.some(f => f.status === 'completed');

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Upload Content</h1>
        <p className='text-muted-foreground'>
          Upload your video files, images, or audio to enhance with AI
        </p>
      </div>

      <div className='max-w-4xl mx-auto space-y-8'>
        <UploadArea
          isDragOver={isDragOver}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
        />

        {files.length > 0 && (
          <Card className='p-6'>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>
                Uploaded Files ({files.length})
              </h3>
              <div className='space-y-4'>
                {files.map(uploadFile => (
                  <FileItem
                    key={uploadFile.id}
                    onRemove={removeFile}
                    uploadFile={uploadFile}
                  />
                ))}
              </div>
            </div>
          </Card>
        )}

        {hasCompletedFiles && <EnhancementOptions />}
      </div>
    </div>
  );
}
