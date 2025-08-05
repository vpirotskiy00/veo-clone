# lib/CLAUDE.md

This directory contains utility functions and shared code for the veo-clon project.

## Directory Overview

The `lib/` directory serves as a centralized location for:
- Utility functions
- Helper methods
- Shared business logic
- Type definitions (when needed)
- Custom hooks (when using client components)

## File Structure

```
lib/
└── utils.ts    # Core utility functions for className management
```

## File Details

### utils.ts
**Purpose**: Provides utility functions for the application, primarily for className management

**Location**: `/lib/utils.ts`

**Dependencies**:
- `clsx` (v2.1.1): Utility for constructing className strings conditionally
- `tailwind-merge` (v2.7.0): Intelligently merges Tailwind CSS classes

**Exported Functions**:

#### `cn(...inputs: ClassValue[]): string`
**Purpose**: Combines and deduplicates Tailwind CSS classes

**Usage**:
```typescript
import { cn } from "@/lib/utils"

// Basic usage
cn("text-red-500", "bg-blue-500")

// Conditional classes
cn("base-class", isActive && "active-class")

// Merging conflicting classes (tailwind-merge handles this)
cn("px-2", "px-4") // Result: "px-4"

// Complex example with shadcn/ui
cn(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  className,
  isDisabled && "opacity-50 cursor-not-allowed"
)
```

**How it works**:
1. `clsx` processes the inputs and handles conditionals
2. `twMerge` intelligently merges Tailwind classes, resolving conflicts
3. Returns a clean, deduplicated className string

**Why it's important**:
- Essential for shadcn/ui component variants
- Prevents className conflicts in Tailwind CSS
- Provides clean API for conditional styling
- Type-safe with TypeScript

## Usage Guidelines

### When to Add New Utilities

Add functions to `lib/utils.ts` when:
1. The function is used across multiple components
2. It's a pure utility function (no side effects)
3. It enhances code reusability
4. It abstracts complex logic

### Common Utility Patterns

1. **Date Formatting**:
```typescript
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US").format(date)
}
```

2. **Number Formatting**:
```typescript
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
```

3. **String Manipulation**:
```typescript
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str
}
```

### Best Practices

1. **Keep Functions Pure**: No side effects, same input = same output
2. **Type Everything**: Use TypeScript for all parameters and return types
3. **Document Complex Logic**: Add JSDoc comments for non-obvious functions
4. **Test Utilities**: Although no test framework is set up, utilities should be testable
5. **Avoid Over-Engineering**: Only abstract when there's clear reuse

### Integration with shadcn/ui

The `cn()` utility is fundamental to shadcn/ui components:

```typescript
// Example shadcn/ui component pattern
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
```

### Import Pattern

Always use the path alias when importing:
```typescript
// ✅ Correct
import { cn } from "@/lib/utils"

// ❌ Avoid
import { cn } from "../lib/utils"
import { cn } from "./utils"
```

## Future Considerations

As the project grows, consider organizing utilities:
```
lib/
├── utils.ts           # General utilities
├── formatting.ts      # Date, number, string formatting
├── validation.ts      # Form validation helpers
├── api.ts            # API helper functions
└── constants.ts      # Shared constants
```

## Important Notes

- The `cn()` function is used extensively throughout the codebase
- Always use `cn()` when combining dynamic classes with Tailwind
- This directory uses the `@/lib` import alias
- All utilities should be framework-agnostic when possible
- Consider performance implications for frequently-called utilities