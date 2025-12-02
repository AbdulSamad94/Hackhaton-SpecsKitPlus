---
sidebar_position: 1
---

# CSS Modules

Next.js has built-in support for CSS Modules using the `.module.css` extension.

CSS Modules locally scope CSS by automatically creating a unique class name. This allows you to use the same CSS class name in different files without worrying about collisions.

```tsx
// app/dashboard/layout.tsx
import styles from './styles.module.css'
 
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.dashboard}>{children}</section>
}
```

```css
/* app/dashboard/styles.module.css */
.dashboard {
  padding: 24px;
}
```

## Benefits

- Automatic unique class names
- No naming conflicts
- Type-safe with TypeScript
- Code splitting at component level
