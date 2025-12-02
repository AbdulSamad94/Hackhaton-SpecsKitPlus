---
sidebar_position: 1
---

# React Context API

For global client state that needs to be accessed by many components, the React Context API is a great built-in solution.

```tsx
// app/providers.tsx
'use client'

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

Wrap your root layout with the provider:

```tsx
// app/layout.tsx
import { ThemeProvider } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```
