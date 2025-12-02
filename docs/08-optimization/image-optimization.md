---
sidebar_position: 1
---

# Image Optimization

The Next.js Image component extends the HTML `<img>` element with features for automatic image optimization.

## Features

-   **Size Optimization**: Automatically serve correctly sized images for each device, using modern image formats like WebP and AVIF.
-   **Visual Stability**: Prevent Layout Shift automatically when images are loading.
-   **Faster Page Loads**: Images are only loaded when they enter the viewport using native browser lazy loading.

## Usage

```tsx
import Image from 'next/image'
import profilePic from './me.png'
 
export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      placeholder="blur" // Optional blur-up while loading
    />
  )
}
```

## Remote Images

```tsx
<Image
  src="https://example.com/image.jpg"
  alt="Remote image"
  width={500}
  height={500}
/>
```
