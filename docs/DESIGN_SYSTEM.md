
# Dutch Game Design System

## Overview

The Dutch game application uses a comprehensive design system built on top of Tailwind CSS and shadcn/ui components, ensuring visual consistency and maintainability across the entire application.

## Design Tokens

### Colors

Our color system is based on semantic color scales with specific meanings:

#### Primary Colors (Dutch Brand)
```typescript
primary: {
  50: '#EFF6FF',   // Ultra light blue
  100: '#DBEAFE',  // Light blue  
  500: '#0A84FF',  // Main Dutch blue
  600: '#0062CC',  // Dark blue
  900: '#002952',  // Darkest blue
}
```

#### Secondary Colors
```typescript
secondary: {
  50: '#F3EEFF',   // Ultra light purple
  100: '#E9D5FF',  // Light purple
  500: '#8B5CF6',  // Main purple
  600: '#6D28D9',  // Dark purple
  900: '#3C1A78',  // Darkest purple
}
```

#### Accent Colors
```typescript
accent: {
  50: '#FFF4E6',   // Ultra light orange
  100: '#FFE4CC',  // Light orange
  500: '#FF9F0A',  // Main orange
  600: '#E67700',  // Dark orange
  900: '#B35A00',  // Darkest orange
}
```

### Typography

#### Font Families
- **Sans-serif**: Inter, system-ui, sans-serif
- **Monospace**: Fira Code, Consolas, monospace

#### Font Sizes
```css
xs: 0.75rem    /* 12px */
sm: 0.875rem   /* 14px */
base: 1rem     /* 16px */
lg: 1.125rem   /* 18px */
xl: 1.25rem    /* 20px */
2xl: 1.5rem    /* 24px */
3xl: 1.875rem  /* 30px */
4xl: 2.25rem   /* 36px */
```

### Spacing System

Based on a 4px grid system:

```css
1: 0.25rem   /* 4px */
2: 0.5rem    /* 8px */
3: 0.75rem   /* 12px */
4: 1rem      /* 16px */
5: 1.25rem   /* 20px */
6: 1.5rem    /* 24px */
8: 2rem      /* 32px */
10: 2.5rem   /* 40px */
12: 3rem     /* 48px */
```

### Elevation System

#### Shadows
```css
sm: 0 1px 2px rgba(0, 0, 0, 0.05)
md: 0 4px 6px rgba(0, 0, 0, 0.07)
lg: 0 10px 15px rgba(0, 0, 0, 0.1)
xl: 0 20px 25px rgba(0, 0, 0, 0.1)
glass: 0 8px 32px rgba(31, 38, 135, 0.37)
```

## Component Library

### Atomic Components

#### Button
```tsx
<Button variant="primary" size="md">
  Primary Action
</Button>

// Variants: primary, secondary, accent, ghost, outline
// Sizes: sm, md, lg, xl
```

#### Card
```tsx
<Card variant="elevated" padding="md">
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Variants: default, elevated, glass, game
// Padding: sm, md, lg, none
```

#### Input
```tsx
<Input 
  variant="outline" 
  placeholder="Enter text..."
/>

// Variants: outline, filled, ghost
```

#### Badge
```tsx
<Badge variant="primary">
  Status
</Badge>

// Variants: primary, secondary, accent, success, warning, error
```

### Layout Components

#### PageShell
```tsx
<PageShell variant="default">
  <YourPageContent />
</PageShell>

// Variants: default, minimal, game
```

#### UnifiedPageLayout
```tsx
<UnifiedPageLayout 
  title="Page Title"
  showBackButton={true}
>
  <PageContent />
</UnifiedPageLayout>
```

## Usage Guidelines

### Color Usage
- **Primary**: Main actions, navigation, key UI elements
- **Secondary**: Supporting actions, secondary navigation
- **Accent**: Highlights, call-to-action elements, emphasis
- **Neutral**: Text, borders, backgrounds

### Typography Hierarchy
- **Headings**: Use `font-bold` or `font-semibold`
- **Body text**: Use `font-normal`
- **UI text**: Use `font-medium` for buttons and labels

### Spacing Rules
- Use consistent spacing multiples (4px grid)
- Maintain visual hierarchy with spacing
- Group related elements with smaller gaps
- Separate sections with larger gaps

### Component Composition
- Prefer composition over inheritance
- Use consistent prop naming across components
- Implement responsive design patterns
- Follow accessibility guidelines (WCAG 2.1)

## Responsive Design

### Breakpoints
```css
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Mobile-First Approach
- Design components mobile-first
- Use responsive utilities (`sm:`, `md:`, `lg:`)
- Test across all breakpoints
- Optimize touch interactions

## Accessibility

### Color Contrast
- Ensure WCAG AA compliance (4.5:1 ratio)
- Provide sufficient contrast for all text
- Use color plus other indicators for meaning

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order
- Skip links for navigation

### Semantic HTML
- Use proper heading hierarchy
- Include ARIA labels where needed
- Provide alternative text for images

## Implementation

### Setup
```bash
# Install required dependencies
pnpm install

# Components are available via:
import { Button, Card, Input } from '@/components/ui'
```

### Configuration
The design system is configured in:
- `tailwind.config.ts` - Tailwind customization
- `src/design/tokens/` - Design token definitions
- `src/components/ui/` - Component implementations

### Customization
To customize the design system:
1. Update tokens in `src/design/tokens/`
2. Modify Tailwind config accordingly
3. Update component variants as needed
4. Test across all breakpoints and themes
