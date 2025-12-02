---
sidebar_position: 2
---

# Parallel & Intercepting Routes

## Parallel Routes

Parallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout.

```
app/
├── @team/
│   └── page.tsx
├── @analytics/
│   └── page.tsx
└── layout.tsx
```

```tsx
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```

## Intercepting Routes

Intercepting routes allows you to load a route from another part of your application within the current layout.

```
app/
├── feed/
│   └── page.tsx
├── (..)photo/
│   └── [id]/
│       └── page.tsx
└── photo/
    └── [id]/
        └── page.tsx
```

This is useful for modals and overlays.
