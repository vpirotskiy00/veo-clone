# public/CLAUDE.md

This directory contains static assets that are served directly by Next.js.

## Directory Overview

The `public/` directory is Next.js's static file serving directory. Files placed here are:

- Served from the root URL path (`/`)
- Not processed by webpack
- Publicly accessible
- Cached by browsers and CDNs

## File Structure

```
public/
├── file.svg       # File/document icon
├── globe.svg      # Globe/world icon
├── next.svg       # Next.js logo (black)
├── vercel.svg     # Vercel logo (black)
└── window.svg     # Window/browser icon
```

## File Details

### SVG Assets

All current assets are SVG icons used in the default Next.js starter template:

1. **file.svg**: Document/file icon
   - Used for: File-related features
   - Dimensions: Scalable vector

2. **globe.svg**: Globe/world icon
   - Used for: Deployment/hosting references
   - Dimensions: Scalable vector

3. **next.svg**: Next.js framework logo
   - Used for: Branding in the starter template
   - Color: Black (inverts in dark mode with CSS)
   - Dimensions: Scalable vector

4. **vercel.svg**: Vercel platform logo
   - Used for: "Deployed by Vercel" attribution
   - Color: Black (inverts in dark mode with CSS)
   - Dimensions: Scalable vector

5. **window.svg**: Browser window icon
   - Used for: UI/interface references
   - Dimensions: Scalable vector

## Usage Guidelines

### Accessing Static Files

Files in `public/` are accessible from the root path:

```typescript
// In React components
import Image from "next/image";

<Image src="/next.svg" alt="Next.js Logo" width={180} height={37} />

// Direct URL access
// File: public/logo.png
// URL: https://yoursite.com/logo.png
```

### Best Practices

1. **File Organization**:

   ```
   public/
   ├── images/          # Image assets
   ├── fonts/           # Custom fonts (if not using next/font)
   ├── icons/           # Icon files
   └── downloads/       # Downloadable files
   ```

2. **Naming Conventions**:
   - Use lowercase
   - Use hyphens for spaces (not underscores)
   - Include dimensions for raster images: `hero-image-1920x1080.jpg`
   - Be descriptive: `product-hero.jpg` not `img1.jpg`

3. **Image Optimization**:
   - Prefer SVG for icons and logos
   - Use WebP or AVIF for photos when possible
   - Optimize file sizes before adding
   - Consider using next/image for automatic optimization

4. **Security Considerations**:
   - Never place sensitive files here
   - All files are publicly accessible
   - No authentication is applied
   - Avoid storing user-uploaded content

### When to Use public/ vs next/image

**Use public/ for**:

- Favicons
- Robots.txt, sitemap.xml
- Static downloads (PDFs, etc.)
- Third-party verification files
- Assets referenced in meta tags

**Use next/image imports for**:

- Component images
- Hero images
- Product photos
- Any image that benefits from optimization

### Common Files to Add

1. **favicon.ico**: Already present in app/
2. **robots.txt**: SEO crawler instructions
3. **sitemap.xml**: Site structure for SEO
4. **manifest.json**: PWA configuration
5. **apple-touch-icon.png**: iOS home screen icon

### File Size Considerations

- Next.js serves these files directly
- Large files impact initial load time
- Consider CDN for very large assets
- Use appropriate compression

## SVG Best Practices

Since all current assets are SVGs:

1. **Optimization**: Run through SVGO for smaller file sizes
2. **Accessibility**: Include proper titles and descriptions
3. **Styling**: Can be styled with CSS when inlined
4. **Dark Mode**: Current SVGs use `dark:invert` class for theme support

Example inline SVG usage:

```tsx
// For dynamic styling
import { ReactComponent as Logo } from '@/public/next.svg';

<Logo className="text-primary h-32 w-32 fill-current" />;
```

## Important Notes

- Files are served as-is without processing
- URLs are case-sensitive
- No webpack transformations applied
- Hot reload works for new files
- Browser caching applies by default
- Use versioning or cache busting for updates
