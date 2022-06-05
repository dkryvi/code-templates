---
title: 'Get error message'
excerpt: 'Utility function to get error message from any error'
collection: 'javascript'
tags: ['utils', 'error']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1654328080/ferran-feixas-ubflzcoxst8-unsplash_zkjorx.jpg'
---

```tsx
type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === 'object' && error !== null && 'message' in error
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message
}
```
