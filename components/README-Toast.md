# Toast Component Usage

A custom toast notification component built on top of `react-hot-toast` with consistent styling.

## Features

- ✅ **Top-center positioning** (not top-right)
- ✅ **Custom styling** matching your design system
- ✅ **Different states**: success, error, loading, default
- ✅ **Auto-dismiss** with configurable duration
- ✅ **Beautiful shadows and animations**

## Usage

The Toast component is already included in your root layout, so you can use toast notifications anywhere in your app.

### Import

```tsx
import toast from 'react-hot-toast';
```

### Examples

#### Success Toast
```tsx
toast.success('Task created successfully!');
toast.success('Profile updated');
```

#### Error Toast
```tsx
toast.error('Failed to save changes');
toast.error('Something went wrong');
```

#### Default Toast
```tsx
toast('Profile management coming soon!');
toast('New notification received');
```

#### Loading Toast
```tsx
const loadingToast = toast.loading('Uploading file...');

// Later, dismiss or update it
toast.success('File uploaded!', { id: loadingToast });
// or
toast.dismiss(loadingToast);
```

#### Custom Duration
```tsx
toast.success('Quick message!', { duration: 2000 });
toast.error('Important error', { duration: 5000 });
```

#### With Custom Styling
```tsx
toast.success('Custom style', {
  style: {
    background: '#10b981',
    color: '#fff',
  },
});
```

#### Promise-based Toast
```tsx
toast.promise(
  saveData(),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save',
  }
);
```

## Configuration

Edit `components/Toast.tsx` to customize:

- **Position**: Change `position="top-center"` to `"top-left"`, `"bottom-center"`, etc.
- **Duration**: Adjust `duration` in `toastOptions`
- **Colors**: Modify `iconTheme` and `style` properties
- **Spacing**: Change `gutter` value
- **Max width**: Adjust `maxWidth` in styles

## Current Settings

- **Position**: Top center
- **Default duration**: 3 seconds
- **Success duration**: 3 seconds (green)
- **Error duration**: 4 seconds (red)
- **Max width**: 500px
- **Border radius**: 8px
- **Font size**: 14px

## Examples in Your Codebase

```tsx
// Header.tsx - Sign out
toast.success('Signed out successfully');
toast.error('Failed to sign out');

// Header.tsx - Theme toggle
toast.success('Dark mode enabled');

// Any async operation
const handleSubmit = async () => {
  const loading = toast.loading('Processing...');
  try {
    await api.submit();
    toast.success('Success!', { id: loading });
  } catch (error) {
    toast.error('Failed', { id: loading });
  }
};
```

