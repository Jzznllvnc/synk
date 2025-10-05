# Tooltip Component Usage

A reusable tooltip component that can be used throughout the application.

## Import

```tsx
import Tooltip from '@/components/Tooltip';
```

## Props

- `content` (required): The text to display in the tooltip
- `children` (required): The element that triggers the tooltip on hover
- `position` (optional): Position of the tooltip - 'top' | 'bottom' | 'left' | 'right' (default: 'right')
- `delay` (optional): Delay in milliseconds before showing tooltip (default: 200)

## Examples

### Basic Usage (Right Position)
```tsx
<Tooltip content="Click to open settings">
  <button>Settings</button>
</Tooltip>
```

### Different Positions
```tsx
// Top
<Tooltip content="Dashboard" position="top">
  <HomeIcon className="w-5 h-5" />
</Tooltip>

// Bottom
<Tooltip content="Profile Menu" position="bottom">
  <UserIcon className="w-5 h-5" />
</Tooltip>

// Left
<Tooltip content="Go Back" position="left">
  <ArrowLeftIcon className="w-5 h-5" />
</Tooltip>

// Right (default)
<Tooltip content="Next Page">
  <ArrowRightIcon className="w-5 h-5" />
</Tooltip>
```

### Custom Delay
```tsx
<Tooltip content="Quick tip!" delay={100}>
  <span>Hover me</span>
</Tooltip>

<Tooltip content="Wait for it..." delay={500}>
  <span>Slow tooltip</span>
</Tooltip>
```

### With Icons
```tsx
<Tooltip content="Notifications" position="bottom">
  <button className="p-2 rounded-full bg-gray-100">
    <Bell className="w-5 h-5" />
  </button>
</Tooltip>
```

### With Complex Elements
```tsx
<Tooltip content="Click to edit your profile">
  <div className="flex items-center space-x-2 cursor-pointer">
    <img src="/avatar.jpg" className="w-8 h-8 rounded-full" />
    <span>John Doe</span>
  </div>
</Tooltip>
```

## Features

- ✅ Smooth fade-in animation with configurable delay
- ✅ Auto-positioning with arrow pointer
- ✅ Dark theme styling (gray-900 background)
- ✅ Responsive to viewport edges
- ✅ No layout shift (uses fixed positioning)
- ✅ Accessible with proper z-index layering
- ✅ Memory-safe cleanup on unmount

