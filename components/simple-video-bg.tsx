'use client';

interface SimpleVideoBgProps {
  src: string;
  className?: string;
}

export function SimpleVideoBg({ src, className = '' }: SimpleVideoBgProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        autoPlay
        className='absolute inset-0 w-full h-full object-cover'
        loop
        muted
        onCanPlay={() => console.log('Video can play')}
        onError={e => {
          console.error('Video error:', e);
          console.error('Video src:', src);
        }}
        onLoadStart={() => console.log('Video loading started')}
        onPlay={() => console.log('Video started playing')}
        playsInline
      >
        <source src={src} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Fallback gradient */}
      <div
        className='absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900'
        style={{ zIndex: -1 }}
      />
    </div>
  );
}
