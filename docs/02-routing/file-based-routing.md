---
sidebar_position: 1
---

# File-Based Routing

Each folder represents a **route segment** that maps to a URL segment. To create a nested route, you can nest folders in each other.

A special `page.js` file is used to make a route segment publicly accessible.

## App Router vs. Pages Router

Next.js 13 introduced the **App Router**, built on React Server Components, which supports shared layouts, nested routing, loading states, error handling, and more.

The **Pages Router** is the original Next.js router, which is still supported but we recommend using the App Router for new applications.

## Defining Routes

### Example Structure

-   `app/page.js` -> `/`
-   `app/dashboard/page.js` -> `/dashboard`
-   `app/dashboard/settings/page.js` -> `/dashboard/settings`

## Layouts

Layouts are UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render.

```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```
