---
sidebar_position: 1
---

# Edge Functions & Runtime

Edge Functions allow you to run code closer to your users, reducing latency.

## Edge Runtime

```tsx
export const runtime = 'edge'
 
export default (request: Request) => {
  return new Response('Hello, from the Edge!')
}
```

## Use Cases

- Personalization
- A/B testing
- Geolocation-based content
- Authentication
- Bot protection

## Limitations

- No Node.js APIs
- Limited package support
- 1MB code size limit
