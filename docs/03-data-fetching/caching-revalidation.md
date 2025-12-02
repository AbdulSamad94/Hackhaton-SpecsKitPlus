---
sidebar_position: 2
---

# Caching and Revalidation

Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information.

## Time-based Revalidation

This automatically revalidates data after a certain amount of time has passed. This is useful for data that changes infrequently and freshness is not as critical.

```tsx
fetch('https://...', { next: { revalidate: 3600 } })
```

## On-demand Revalidation

You can manually revalidate data based on an event (e.g. form submission). On-demand revalidation can use a tag-based or path-based approach to revalidate groups of data at once.

```tsx
// app/actions.ts
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
```

## Incremental Static Regeneration (ISR)

ISR allows you to update static content after you've built your site. You can create or update pages without needing to rebuild the entire site.

```tsx
export const revalidate = 10 // revalidate every 10 seconds
```
