# Design System

## Overview

This plugin uses a **shadcn/ui-inspired design** without actually installing shadcn/ui or React dependencies. It's built entirely with:

- **@wordpress/element** (WordPress's React wrapper)
- **Tailwind CSS** with shadcn's color tokens
- **Lucide React** for modern icons
- **No external component libraries**

## Why This Approach?

- ✅ **No React conflicts** - Uses WordPress's built-in React (`wp.element`)
- ✅ **Lightweight** - No heavy component libraries
- ✅ **Professional look** - Clean black & white shadcn aesthetic
- ✅ **Easy to maintain** - Simple `createElement` calls
- ✅ **WordPress compatible** - Works seamlessly with WP core

## Design Tokens

All design tokens are defined in `tailwind.config.js`:

```css
/* Colors */
--background: 0 0% 100%        /* White background */
--foreground: 0 0% 3.9%        /* Near black text */
--muted: 0 0% 96.1%            /* Light gray for muted content */
--muted-foreground: 0 0% 45.1% /* Medium gray text */
--border: 0 0% 89.8%           /* Light gray borders */

/* Components */
--card: 0 0% 100%              /* White cards */
--primary: 0 0% 9%             /* Black primary color */
--destructive: 0 84.2% 60.2%   /* Red for errors */
```

## Key Features

### 1. Scoped Styles
All Tailwind classes are scoped to `.lwpf-root` to prevent conflicts:
```javascript
div({ className: 'lwpf-root bg-background' }, ...)
```

### 2. Modern Icons
Uses Lucide React for beautiful, consistent icons:
```javascript
import { Zap, RefreshCw, Settings } from 'lucide-react';
createElement(Zap, { className: 'w-6 h-6' })
```

### 3. Clean Components
All components use `createElement` from `@wordpress/element`:
```javascript
button(
  { 
    className: 'bg-primary text-primary-foreground rounded-lg px-6 py-3'
  },
  'Click Me'
)
```

## Usage

### Admin Dashboard
Access at: `/wp-admin/admin.php?page=laravel-wp-dashboard`

### Frontend Shortcode
Add to any page/post: `[laravel_wp_frontend]`

## Building

```bash
# Install dependencies
npm install

# Development (watch mode)
npm run dev

# Production build
npm run build

# Build admin only
npm run build:admin

# Build frontend only
npm run build:frontend
```

## File Structure

```
resources/
├── admin/
│   └── js/
│       ├── index.js      # Admin React app
│       └── style.scss    # Admin styles with Tailwind
└── frontend/
    └── js/
        ├── index.js      # Frontend React app
        └── style.scss    # Frontend styles with Tailwind

build/
├── admin/
│   ├── index.js
│   ├── index.asset.php
│   └── style-index.css
└── frontend/
    ├── index.js
    ├── index.asset.php
    └── style-index.css
```

## Customization

### Adding New Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      myColor: 'hsl(var(--my-color))',
    }
  }
}
```

### Adding New Components
Create helper functions in your index.js:
```javascript
const Card = (props, ...children) => 
  div({ 
    className: 'rounded-xl border bg-card shadow p-6',
    ...props 
  }, ...children);
```

### Changing Icons
Browse icons at: https://lucide.dev/icons
```javascript
import { YourIcon } from 'lucide-react';
createElement(YourIcon, { className: 'w-5 h-5' })
```

## No Breaking Changes

This approach ensures:
- No conflicts with other WordPress plugins
- No React version mismatches
- No complex build configurations
- Clean, maintainable codebase
- Professional, modern design

---

**Powered by Laravel WP Framework** • Built with ❤️ for WordPress

