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

# Run type checking
bun run typecheck
```

## Code Quality & Git Hooks

This project uses **Husky** for Git hooks to ensure code quality:

### Pre-commit Hooks

- **ESLint**: Automatically fixes linting issues in staged files
- **TypeScript**: Runs type checking on staged TypeScript files
- **Prettier**: Formats code according to project standards
- Only staged files are processed (via `lint-staged`)

### Pre-push Hooks

- **Full linting**: Runs ESLint on entire codebase
- **Type checking**: Validates TypeScript across the project
- **Build verification**: Ensures the project builds successfully

### Commit Message Validation

- **Commitlint**: Enforces conventional commit format
- Supported types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- Example: `feat: add user authentication system`

### Code Quality Rules

- **Fix all errors**: Never ignore ESLint/TypeScript errors with comments - always fix the root cause
- **No suppression**: Avoid `// eslint-disable`, `// @ts-ignore`, or similar suppression comments
- **Clean commits**: Do not mention AI assistance in commit messages

### Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "emergency fix"

# Skip pre-push hooks
git push --no-verify
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

## Complete File Structure

```
veo-clon/
├── .husky/                   # Git hooks directory (Husky)
│   ├── pre-commit            # Pre-commit hook (lint-staged)
│   ├── pre-push              # Pre-push hook (lint, typecheck, build)
│   └── commit-msg            # Commit message validation
├── app/                      # Next.js App Router (see app/CLAUDE.md)
│   ├── favicon.ico           # Site favicon
│   ├── globals.css           # Global styles, design system, CSS variables
│   ├── layout.tsx            # Root layout with fonts and metadata
│   └── page.tsx              # Home page component
├── lib/                      # Utility library (see lib/CLAUDE.md)
│   └── utils.ts              # cn() utility for className merging
├── public/                   # Static assets (see public/CLAUDE.md)
│   ├── file.svg              # File icon
│   ├── globe.svg             # Globe icon
│   ├── next.svg              # Next.js logo
│   ├── vercel.svg            # Vercel logo
│   └── window.svg            # Window icon
├── .env                      # Environment variables (empty)
├── .env.example              # Environment template (empty)
├── .env.local                # Local environment (empty)
├── .gitignore                # Git ignore patterns
├── .prettierrc               # Prettier configuration
├── .prettierignore           # Prettier ignore patterns
├── CLAUDE.md                 # This file
├── README.md                 # Project documentation
├── bun.lock                  # Bun lockfile
├── commitlint.config.js      # Commitlint configuration
├── components.json           # shadcn/ui configuration
├── eslint.config.mjs         # ESLint configuration (flat config)
├── next-env.d.ts             # Next.js TypeScript definitions
├── next.config.ts            # Next.js configuration
├── package.json              # Package configuration
├── postcss.config.mjs        # PostCSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Major Entry Points

### Configuration Files

- **package.json**: Project dependencies and scripts
  - Scripts: `dev`, `build`, `start`, `lint`
  - Key deps: Next.js 15.4.5, React 19.1.0, Tailwind CSS v4
- **tsconfig.json**: TypeScript compiler settings
  - Path alias: `@/*` → root directory
  - Strict mode enabled
- **components.json**: shadcn/ui component system config
  - New York style, RSC enabled
  - Component paths configured
- **next.config.ts**: Next.js configuration (currently minimal)
- **eslint.config.mjs**: ESLint v9 flat config with Next.js rules
- **postcss.config.mjs**: PostCSS with Tailwind CSS v4

### Application Entry Points

- **app/layout.tsx**: Root layout component
  - Configures Geist fonts
  - Sets up HTML structure
  - Exports metadata for SEO
- **app/page.tsx**: Home page component
  - Default Next.js starter page
  - Uses Next.js Image optimization
- **app/globals.css**: Global styles
  - Tailwind CSS imports
  - Complete design system with CSS variables
  - Light/dark theme definitions
  - OKLCH color space

### Utility Entry Points

- **lib/utils.ts**: Utility functions
  - `cn()`: Class name merging utility

## Important Notes

- **Package Manager**: Project uses Bun (see bun.lock)
- **Code Quality**: Husky pre-commit hooks with ESLint, Prettier, and TypeScript checking
- **Commit Format**: Conventional commits enforced via commitlint
- **ESLint**: Modern flat config format (ESLint v9)
- **Icons**: Use `lucide-react` for icons
- **Fonts**: Geist Sans and Geist Mono are configured
- **Testing**: Vitest configured with Storybook integration

## Working with Subdirectories

When working in specific directories, Claude should check for subdirectory CLAUDE.md files:

- `app/CLAUDE.md` - Detailed App Router documentation
- `lib/CLAUDE.md` - Utility function documentation
- `public/CLAUDE.md` - Static asset documentation

These subdirectory files contain more detailed information about their specific areas.
