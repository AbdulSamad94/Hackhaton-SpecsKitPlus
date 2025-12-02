---
sidebar_position: 2
---

# Dynamic Routes

When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.

## Creating Dynamic Segments

A Dynamic Segment can be created by wrapping a folder's name in square brackets: `[folderName]`. For example, `[id]` or `[slug]`.

```tsx
// app/blog/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
```

## Catch-All Segments

Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets `[...folderName]`.

```tsx
// app/shop/[...slug]/page.tsx
// Matches /shop/clothes, /shop/clothes/tops, /shop/clothes/tops/t-shirts, etc.
export default function Page({ params }: { params: { slug: string[] } }) {
  return <div>Category: {params.slug.join('/')}</div>
}
```
