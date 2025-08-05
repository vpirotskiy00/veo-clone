# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies (using Bun)
bun install

# Run development server with Turbopack
bun run dev
# or
npm run dev

# Build for production
bun run build

# Start production server
bun run start

# Run linting
bun run lint
```

## Architecture Overview

This is a Next.js 15.4.5 application using:
- **App Router** (modern Next.js 13+ routing in `/app` directory)
- **React Server Components** by default
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with OKLCH color space
- **shadcn/ui** component system (New York style)

## Key Conventions

### Import Aliases
- `@/*` - Maps to project root
- `@/components` - Component directory
- `@/lib/utils` - Utility functions
- `@/components/ui` - UI components from shadcn/ui

### Component Development
When creating new components:
1. Use Server Components by default (no "use client" unless needed)
2. Place UI components in `/components/ui/`
3. Use the `cn()` utility from `@/lib/utils` for className merging
4. Follow shadcn/ui patterns for variants using `class-variance-authority`

### Styling
- Use Tailwind CSS utility classes
- CSS custom properties are defined in `globals.css`
- Dark mode is supported via CSS variables
- Animation utilities available via `tw-animate-css`

### File Structure
```
app/
├── layout.tsx    # Root layout with font configuration
├── page.tsx      # Pages as components
└── globals.css   # Global styles and CSS variables

components/
└── ui/          # shadcn/ui components

lib/
└── utils.ts     # Utility functions including cn()
```

## Important Notes

- **Package Manager**: Project uses Bun (see bun.lock)
- **No testing framework** currently configured
- **ESLint**: Modern flat config format (ESLint v9)
- **Icons**: Use `lucide-react` for icons
- **Fonts**: Geist Sans and Geist Mono are configured