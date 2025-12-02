---
sidebar_position: 2
---

# External Libraries

For more complex state management needs, you might reach for external libraries.

## Zustand

Zustand is a small, fast, and scalable bearbones state-management solution.

```tsx
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}
```

## Redux Toolkit

Redux is a predictable state container for JavaScript apps. It's more verbose but offers powerful devtools and a strict structure.

When using Redux with Next.js App Router, you need to ensure you create a new store instance per request on the server, but share the store on the client.
