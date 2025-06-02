
# Dutch Card Game - Unified Design System

## Core Principles
- **Consistent Glass Morphism**: All UI elements use backdrop-blur and transparency
- **Dutch Color Palette**: Blue (#0A84FF), Purple (#8B5CF6), Orange (#FF9F0A)
- **Rounded Corners**: 16px (components), 24px (cards), 48px (buttons)
- **Smooth Animations**: 300ms transitions with easeOut timing

## Components

### UnifiedCard
- **Variants**: light (70% opacity), medium (60%), heavy (50%), solid
- **Interactive**: Optional hover lift and pointer cursor
- **Padding**: sm (16px), md (24px), lg (32px), none

### UnifiedButton
- **Primary Variants**: primary (gradient), secondary (purple), accent (orange)
- **Ghost Variants**: ghost (white glass), glass (light glass), outline
- **Sizes**: sm, md, lg, xl, icon variants
- **Animation**: Hover lift by default

### UnifiedTabs
- **Usage**: For all tabbed interfaces
- **Styling**: Glass background with gradient active states
- **Colors**: Matches button variants (blue, purple, orange)

### ModernTitle
- **Variants**: h1, h2, h3, h4 with responsive sizing
- **Gradient**: Dutch color palette gradients
- **Sparkles**: Optional animated sparkle effects

### UnifiedPageLayout
- **Background**: Animated background with variant intensities
- **Header**: Standardized with back button and optional settings
- **Animation**: Page transitions with consistent timing

## Usage Guidelines

1. **Always use UnifiedCard** instead of raw div containers
2. **Prefer UnifiedButton** over custom button implementations  
3. **Use ModernTitle** for all headings
4. **Wrap pages in UnifiedPageLayout** for consistency
5. **Apply glass variants** based on content importance (light > medium > heavy)

## Color Usage
- **Primary Actions**: Dutch Blue gradient
- **Secondary Actions**: Dutch Purple  
- **Accent/Highlights**: Dutch Orange
- **Backgrounds**: White with varying opacity levels
- **Text**: Gray-800 for primary, Gray-600 for secondary

## Animation Standards
- **Duration**: 300ms for normal, 200ms for fast interactions
- **Easing**: ease-out for entrances, ease-in for exits
- **Hover**: -2px translate-y lift with shadow increase
- **Active**: 0px translate-y with shadow decrease
